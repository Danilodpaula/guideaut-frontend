import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  listarRecomendacoesApi,
  criarRecomendacaoApi,
  atualizarRecomendacaoApi, 
  deletarRecomendacaoApi,
} from "@/api/recomendacaoService";
import {
  RecomendacaoRequest,
  Recomendacao,
} from "@/api/types/recomendacaoTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Plus, Filter, Trash2, Pencil } from "lucide-react";

/**
 * 📘 Tipagem ADAPTADA para o backend Spring
 */
interface RecommendationUi extends Recomendacao {
  user_vote?: string;
  is_favorited?: boolean;
}

export default function Recommendations() {
  const { t } = useI18n();
  const { isAuthenticated, can } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<RecommendationUi[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingRecId, setDeletingRecId] = useState<string | null>(null); 

  const [editingRec, setEditingRec] = useState<Recomendacao | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    justificativa: "",
    category: "",
    referencia: "",
  });

  const emptyFormData = {
    title: "",
    description: "",
    justificativa: "",
    category: "",
    referencia: "",
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const { data: recs } = await listarRecomendacoesApi();
      setRecommendations(
        recs.map((rec: Recomendacao) => ({
          ...rec,
          agree_count: 0,
          disagree_count: 0,
          user_vote: undefined,
          is_favorited: false,
        })),
      );
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error);
      toast.error("Erro ao carregar recomendações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado");
      return;
    }
    if (!formData.justificativa.trim()) {
      toast.error("Por favor, preencha a justificativa.");
      return;
    }

    try {
      const requestData: RecomendacaoRequest = {
        titulo: formData.title,
        descricao: formData.description,
        justificativa: formData.justificativa,
        categoria: formData.category,
        referencia: formData.referencia || null,
      };

      if (editingRec) {
        await atualizarRecomendacaoApi(editingRec.id, requestData);
        toast.success("Recomendação atualizada com sucesso!");
      } else {
        await criarRecomendacaoApi(requestData);
        toast.success(
          can("ADMIN")
            ? "Recomendação publicada (Admin)!"
            : "Recomendação publicada!",
        );
      }

      setEditingRec(null); 
      setFormData(emptyFormData); 
      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao salvar recomendação:", error);
      toast.error(
        editingRec
          ? "Erro ao atualizar recomendação"
          : "Erro ao criar recomendação",
      );
    }
  };

  const openEditDialog = (rec: Recomendacao) => {
    setEditingRec(rec);
    setFormData({
      title: rec.titulo,
      description: rec.descricao,
      justificativa: rec.justificativa,
      category: rec.categoria,
      referencia: rec.referencia || "",
    });
    setIsFormOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setEditingRec(null); 
      setFormData(emptyFormData); 
    }
    setIsFormOpen(open);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingRecId(id);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecId) return;

    try {
      await deletarRecomendacaoApi(deletingRecId);
      toast.success("Recomendação deletada com sucesso!");
      setDeletingRecId(null);
      setIsDeleteAlertOpen(false);
      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao deletar recomendação:", error);
      toast.error("Erro ao deletar recomendação.");
      setIsDeleteAlertOpen(false);
    }
  };

  const getCategoryIcon = (category: string) =>
    ({
      NAVIGATION: "🧭",
      INTERACTION: "👆",
      VISUAL: "👁️",
      CONTENT: "📝",
      FEEDBACK: "💬",
      GENERAL: "⚙️",
    }[category] || "📌");

  const getCategoryLabel = (category: string) =>
    ({
      NAVIGATION: "Navegação",
      INTERACTION: "Interação",
      VISUAL: "Visual",
      CONTENT: "Conteúdo",
      FEEDBACK: "Feedback",
      GENERAL: "Geral",
    }[category] || category);

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      rec.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.justificativa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || rec.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("nav.recommendations")}
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore e compartilhe recomendações de design acessível
          </p>
        </div>

        {/* Botão de nova recomendação */}
        {isAuthenticated ? (
          <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Recomendação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                {/* 8. TÍTULO DINÂMICO (CRIAR/EDITAR) */}
                <DialogTitle>
                  {editingRec ? "Editar Recomendação" : "Nova Recomendação"}
                </DialogTitle>
                <DialogDescription>
                  {editingRec
                    ? "Atualize os detalhes desta recomendação."
                    : "Compartilhe sua recomendação com a comunidade."}
                </DialogDescription>
              </DialogHeader>

              {/* Formulário de criação/edição */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="justificativa">Justificativa</Label>
                  <Textarea
                    id="justificativa"
                    value={formData.justificativa}
                    onChange={(e) =>
                      setFormData({ ...formData, justificativa: e.target.value })
                    }
                    rows={3}
                    required
                    placeholder="Por que esta recomendação é importante?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NAVIGATION">Navegação</SelectItem>
                      <SelectItem value="INTERACTION">Interação</SelectItem>
                      <SelectItem value="VISUAL">Visual</SelectItem>
                      <SelectItem value="CONTENT">Conteúdo</SelectItem>
                      <SelectItem value="FEEDBACK">Feedback</SelectItem>
                      <SelectItem value="GENERAL">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Referência (opcional)</Label>
                  <Input
                    value={formData.referencia}
                    onChange={(e) =>
                      setFormData({ ...formData, referencia: e.target.value })
                    }
                    placeholder="Ex: Artigo científico, especialista..."
                  />
                </div>
                {/* --- Fim dos campos --- */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleFormOpenChange(false)} 
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingRec ? "Salvar Alterações" : "Publicar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Button onClick={() => navigate("/login")} variant="outline">
            Fazer Login
          </Button>
        )}
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar recomendações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas as categorias</SelectItem>
                <SelectItem value="NAVIGATION">Navegação</SelectItem>
                <SelectItem value="INTERACTION">Interação</SelectItem>
                <SelectItem value="VISUAL">Visual</SelectItem>
                <SelectItem value="CONTENT">Conteúdo</SelectItem>
                <SelectItem value="FEEDBACK">Feedback</SelectItem>
                <SelectItem value="GENERAL">Geral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recomendações */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      ) : filteredRecommendations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma recomendação encontrada.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="hover-scale">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* ... (Badges, Título, Descrição, etc.) ... */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-2xl">
                        {getCategoryIcon(rec.categoria)}
                      </span>
                      <Badge variant="secondary">
                        {getCategoryLabel(rec.categoria)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{rec.titulo}</CardTitle>
                    <CardDescription className="text-base">
                      {rec.descricao}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground pt-2">
                      <strong>Justificativa:</strong> {rec.justificativa}
                    </p>
                    {rec.referencia && (
                      <p className="text-sm text-muted-foreground pt-2">
                        <strong>Referência:</strong> {rec.referencia}
                      </p>
                    )}
                  </div>

                  {/* 9. BOTÕES DE ADMIN (EDITAR E DELETAR) */}
                  
                    <div className="flex flex-col sm:flex-row">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => openEditDialog(rec)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => openDeleteDialog(rec.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Deletar</span>
                      </Button>
                    </div>
                  
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Diálogo de Confirmação de Exclusão */}
      <AlertDialog
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá deletar permanentemente a
              recomendação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingRecId(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Sim, deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}