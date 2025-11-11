// src/modules/Recommendations/pages/Recommendations.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  listarRecomendacoesApi,
  criarRecomendacaoApi,
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
import { Search, Plus, Filter } from "lucide-react";

/**
 * 📘 Tipagem ADAPTADA para o backend Spring
 */
interface RecommendationUi extends Recomendacao {
  user_vote?: string;
  is_favorited?: boolean;
}

export default function Recommendations() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth(); // Removido 'user' e 'can'
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<RecommendationUi[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 1. ATUALIZAR ESTADO DO FORMULÁRIO
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    justificativa: "", // <-- NOVO CAMPO
    category: "",
    referencia: "",
  });

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
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error);
      toast.error("Erro ao carregar recomendações");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. ATUALIZAR HANDLESUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Você precisa estar logado");
      return;
    }

    // Validação simples para o novo campo
    if (!formData.justificativa.trim()) {
      toast.error("Por favor, preencha a justificativa.");
      return;
    }

    try {
      const requestData: RecomendacaoRequest = {
        titulo: formData.title,
        descricao: formData.description,
        justificativa: formData.justificativa, // <-- ENVIAR CAMPO
        categoria: formData.category,
        referencia: formData.referencia || null,
      };

      await criarRecomendacaoApi(requestData);

      // A lógica de "ADMIN" foi removida do backend
      toast.success("Recomendação publicada com sucesso!");

      // Limpar o formulário
      setFormData({
        title: "",
        description: "",
        justificativa: "", // <-- LIMPAR CAMPO
        category: "",
        referencia: "",
      });
      setIsDialogOpen(false);
      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao criar recomendação:", error);
      toast.error("Erro ao criar recomendação");
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
      rec.justificativa.toLowerCase().includes(searchTerm.toLowerCase()); // <-- BUSCAR NO NOVO CAMPO
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Recomendação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nova Recomendação</DialogTitle>
                <DialogDescription>
                  Compartilhe sua recomendação com a comunidade.
                </DialogDescription>
              </DialogHeader>

              {/* 2. ATUALIZAR FORMULÁRIO (JSX) */}
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

                {/* --- NOVO CAMPO NO FORMULÁRIO --- */}
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
                {/* --- FIM NOVO CAMPO --- */}

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

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Publicar</Button>
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-2xl">
                        {getCategoryIcon(rec.categoria)}
                      </span>
                      <Badge variant="secondary">
                        {getCategoryLabel(rec.categoria)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{rec.titulo}</CardTitle>
                    
                    {/* 4. ATUALIZAR EXIBIÇÃO DO CARD */}
                    <CardDescription className="text-base">
                      {rec.descricao}
                    </CardDescription>
                    
                    {/* --- NOVO CAMPO NA EXIBIÇÃO --- */}
                    <p className="text-sm text-muted-foreground pt-2">
                      <strong>Justificativa:</strong> {rec.justificativa}
                    </p>
                    {/* --- FIM NOVO CAMPO --- */}

                    {rec.referencia && (
                      <p className="text-sm text-muted-foreground pt-2">
                        <strong>Referência:</strong> {rec.referencia}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}