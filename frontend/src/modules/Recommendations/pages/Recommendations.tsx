// Recommendations.tsx
// Página de Recomendações de Design Acessível do GuideAut.
// Permite explorar, filtrar e votar em recomendações validadas pela comunidade,
// além de criar novas (moderadas por administradores).

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { supabase } from "@/integrations/supabase/client";
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
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Plus,
  Filter,
} from "lucide-react";

/**
 * 📘 Tipagem para uma recomendação de design
 */
interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  phase: string;
  status: string;
  source?: string;
  agree_count: number;
  disagree_count: number;
  created_at: string;
  user_vote?: string;
  is_favorited?: boolean;
}

/**
 * 🌎 Página de Recomendações
 * Permite explorar boas práticas, votar, favoritar e enviar novas recomendações.
 */
export default function Recommendations() {
  const { t } = useI18n();
  const { isAuthenticated, user, can } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [phaseFilter, setPhaseFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Estado do formulário de criação
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    phase: "",
    source: "",
  });

  // 🔄 Carrega recomendações ao montar o componente
  useEffect(() => {
    loadRecommendations();
  }, [isAuthenticated]);

  /**
   * 🔍 Carrega recomendações do banco de dados Supabase
   */
  const loadRecommendations = async () => {
    try {
      setIsLoading(true);

      // Busca todas as recomendações aprovadas
      const { data: recs, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("status", "APPROVED")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!recs) return setRecommendations([]);

      // 🔐 Se o usuário estiver logado, busca votos e favoritos
      if (isAuthenticated && user) {
        const [votesResult, favoritesResult] = await Promise.all([
          supabase
            .from("recommendation_votes")
            .select("recommendation_id, vote_type")
            .eq("user_id", user.id),
          supabase
            .from("recommendation_favorites")
            .select("recommendation_id")
            .eq("user_id", user.id),
        ]);

        const votesMap = new Map(
          votesResult.data?.map((v) => [v.recommendation_id, v.vote_type]) || []
        );
        const favoritesSet = new Set(
          favoritesResult.data?.map((f) => f.recommendation_id) || []
        );

        setRecommendations(
          recs.map((rec) => ({
            ...rec,
            user_vote: votesMap.get(rec.id),
            is_favorited: favoritesSet.has(rec.id),
          }))
        );
      } else {
        setRecommendations(recs);
      }
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error);
      toast.error("Erro ao carregar recomendações");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 👍👎 Lida com votos de "Concordo" e "Discordo"
   */
  const handleVote = async (
    recommendationId: string,
    voteType: "AGREE" | "DISAGREE"
  ) => {
    if (!isAuthenticated) {
      toast.error("Faça login para votar");
      navigate("/login");
      return;
    }

    try {
      const rec = recommendations.find((r) => r.id === recommendationId);
      if (!rec) return;

      // Se já votou no mesmo tipo, remove o voto
      if (rec.user_vote === voteType) {
        await supabase
          .from("recommendation_votes")
          .delete()
          .eq("recommendation_id", recommendationId)
          .eq("user_id", user!.id);
      } else if (rec.user_vote) {
        // Atualiza o tipo de voto
        await supabase
          .from("recommendation_votes")
          .update({ vote_type: voteType })
          .eq("recommendation_id", recommendationId)
          .eq("user_id", user!.id);
      } else {
        // Insere novo voto
        await supabase.from("recommendation_votes").insert({
          recommendation_id: recommendationId,
          user_id: user!.id,
          vote_type: voteType,
        });
      }

      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao votar:", error);
      toast.error("Erro ao votar");
    }
  };

  /**
   * ❤️ Adiciona ou remove recomendação dos favoritos
   */
  const handleFavorite = async (recommendationId: string) => {
    if (!isAuthenticated) {
      toast.error("Faça login para favoritar");
      navigate("/login");
      return;
    }

    try {
      const rec = recommendations.find((r) => r.id === recommendationId);
      if (!rec) return;

      if (rec.is_favorited) {
        await supabase
          .from("recommendation_favorites")
          .delete()
          .eq("recommendation_id", recommendationId)
          .eq("user_id", user!.id);
      } else {
        await supabase.from("recommendation_favorites").insert({
          recommendation_id: recommendationId,
          user_id: user!.id,
        });
      }

      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      toast.error("Erro ao favoritar");
    }
  };

  /**
   * 📝 Submissão de nova recomendação
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Você precisa estar logado");
      return;
    }

    try {
      const { error } = await supabase.from("recommendations").insert({
        user_id: user!.id,
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        phase: formData.phase as any,
        source: formData.source || null,
        status: (can("ADMIN") ? "APPROVED" : "PENDING") as any,
      } as any);

      if (error) throw error;

      toast.success(
        can("ADMIN")
          ? "Recomendação publicada com sucesso!"
          : "Recomendação enviada para aprovação!"
      );

      setFormData({
        title: "",
        description: "",
        category: "",
        phase: "",
        source: "",
      });
      setIsDialogOpen(false);
      await loadRecommendations();
    } catch (error) {
      console.error("Erro ao criar recomendação:", error);
      toast.error("Erro ao criar recomendação");
    }
  };

  /** 🎨 Ícones e rótulos das categorias e fases */
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

  const getPhaseLabel = (phase: string) =>
    ({
      IMMERSION: "Imersão",
      ANALYSIS: "Análise",
      IDEATION: "Ideação",
      PROTOTYPING: "Prototipação",
    }[phase] || phase);

  /** 🔎 Aplica filtros de busca e seleção */
  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || rec.category === categoryFilter;
    const matchesPhase =
      phaseFilter === "ALL" || rec.phase === phaseFilter;
    return matchesSearch && matchesCategory && matchesPhase;
  });

  // === Renderização principal ===
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("nav.recommendations")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isAuthenticated
              ? "Explore e compartilhe recomendações de design acessível"
              : "Explore recomendações de design acessível - Faça login para contribuir"}
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
                  Compartilhe sua recomendação com a comunidade{" "}
                  {!can("ADMIN") && " (será enviada para aprovação)"}
                </DialogDescription>
              </DialogHeader>

              {/* Formulário de envio */}
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

                <div className="grid grid-cols-2 gap-4">
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
                    <Label>Fase ProAut</Label>
                    <Select
                      value={formData.phase}
                      onValueChange={(value) =>
                        setFormData({ ...formData, phase: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IMMERSION">Imersão</SelectItem>
                        <SelectItem value="ANALYSIS">Análise</SelectItem>
                        <SelectItem value="IDEATION">Ideação</SelectItem>
                        <SelectItem value="PROTOTYPING">
                          Prototipação
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Fonte (opcional)</Label>
                  <Input
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
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

      {/* Filtros de busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
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
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas as fases</SelectItem>
                <SelectItem value="IMMERSION">Imersão</SelectItem>
                <SelectItem value="ANALYSIS">Análise</SelectItem>
                <SelectItem value="IDEATION">Ideação</SelectItem>
                <SelectItem value="PROTOTYPING">Prototipação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de recomendações */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      ) : filteredRecommendations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma recomendação encontrada.
              {isAuthenticated
                ? " Seja o primeiro a compartilhar!"
                : " Faça login para contribuir com suas próprias recomendações!"}
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
                        {getCategoryIcon(rec.category)}
                      </span>
                      <Badge variant="secondary">
                        {getCategoryLabel(rec.category)}
                      </Badge>
                      <Badge variant="outline">
                        {getPhaseLabel(rec.phase)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{rec.title}</CardTitle>
                    <CardDescription className="text-base">
                      {rec.description}
                    </CardDescription>
                    {rec.source && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Fonte:</strong> {rec.source}
                      </p>
                    )}
                  </div>
                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFavorite(rec.id)}
                      className="shrink-0"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          rec.is_favorited
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={
                        rec.user_vote === "AGREE" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleVote(rec.id, "AGREE")}
                      disabled={!isAuthenticated}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {rec.agree_count}
                    </Button>
                    <Button
                      variant={
                        rec.user_vote === "DISAGREE"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleVote(rec.id, "DISAGREE")}
                      disabled={!isAuthenticated}
                    >
                      <ThumbsDown className="mr-1 h-4 w-4" />
                      {rec.disagree_count}
                    </Button>
                  </div>
                  {!isAuthenticated && (
                    <p className="text-sm text-muted-foreground">
                      Faça login para votar e favoritar
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
