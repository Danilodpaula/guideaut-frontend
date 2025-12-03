import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { toast } from "sonner";
import {
  listarRecomendacoesApi,
  criarRecomendacaoApi,
  atualizarRecomendacaoApi,
  deletarRecomendacaoApi,
  avaliarRecomendacaoApi,
} from "@/api/recomendacaoService";
import {
  Recomendacao,
  RecomendacaoRequest,
} from "@/api/types/recomendacaoTypes";
import { listarCategoriasRecomendacaoApi } from "@/api/categoriaRecomendacaoService";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";

export interface RecommendationUi extends Recomendacao {
  user_vote?: string;
  is_favorited?: boolean;
}

const emptyFormData = {
  title: "",
  description: "",
  justificativa: "",
  category: "",
  referencia: "",
};

export const useRecommendations = (
  searchTerm: string,
  categoryFilter: string,
) => {
  const { isAuthenticated, can } = useAuth();
  const navigate = useNavigate();

  const [allRecommendations, setAllRecommendations] = useState<
    RecommendationUi[]
  >([]);
  const [categories, setCategories] = useState<CategoriaRecomendacaoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingRecId, setDeletingRecId] = useState<string | null>(null);
  const [editingRec, setEditingRec] = useState<Recomendacao | null>(null);
  const [ratingLoadingId, setRatingLoadingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Carrega recomendações e categorias em paralelo
      const [recsResponse, catsResponse] = await Promise.all([
        listarRecomendacoesApi(),
        listarCategoriasRecomendacaoApi(),
      ]);

      setAllRecommendations(
        recsResponse.data.map((rec: Recomendacao) => ({
          ...rec,
          user_vote: undefined,
          is_favorited: false,
        })),
      );

      // Filtra apenas categorias ativas para uso no sistema
      const activeCats = catsResponse.data.filter((c) => c.ativo !== false);
      setCategories(activeCats);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar recomendações e categorias");
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

      handleFormOpenChange(false);
      // Recarrega apenas as recomendações para atualizar a lista
      const { data } = await listarRecomendacoesApi();
      setAllRecommendations(
        data.map((rec: Recomendacao) => ({
          ...rec,
          user_vote: undefined,
          is_favorited: false,
        })),
      );
    } catch (error) {
      console.error("Erro ao salvar recomendação:", error);
      toast.error(
        editingRec
          ? "Erro ao atualizar recomendação"
          : "Erro ao criar recomendação",
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecId) return;
    try {
      await deletarRecomendacaoApi(deletingRecId);
      toast.success("Recomendação deletada com sucesso!");
      setDeletingRecId(null);
      setIsDeleteAlertOpen(false);

      const { data } = await listarRecomendacoesApi();
      setAllRecommendations(
        data.map((rec: Recomendacao) => ({
          ...rec,
          user_vote: undefined,
          is_favorited: false,
        })),
      );
    } catch (error) {
      console.error("Erro ao deletar recomendação:", error);
      toast.error("Erro ao deletar recomendação.");
      setIsDeleteAlertOpen(false);
    }
  };

  const handleAvaliar = async (id: string, nota: number) => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para avaliar.");
      navigate("/login");
      return;
    }
    setRatingLoadingId(id);
    try {
      const { data: recAtualizada } = await avaliarRecomendacaoApi(id, {
        nota,
      });
      toast.success("Sua avaliação foi atualizada!");

      setAllRecommendations((prevRecs) =>
        prevRecs.map((rec) =>
          rec.id === id
            ? {
                ...rec,
                somaNotas: recAtualizada.somaNotas,
                totalAvaliacoes: recAtualizada.totalAvaliacoes,
              }
            : rec,
        ),
      );
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast.error("Erro ao enviar avaliação.");
    } finally {
      setRatingLoadingId(null);
    }
  };

  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setEditingRec(null);
      setFormData(emptyFormData);
    }
    setIsFormOpen(open);
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

  const openDeleteDialog = (id: string) => {
    setDeletingRecId(id);
    setIsDeleteAlertOpen(true);
  };

  const filteredRecommendations = useMemo(() => {
    return allRecommendations.filter((rec) => {
      const matchesSearch =
        rec.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.justificativa.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "ALL" || rec.categoria === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [allRecommendations, searchTerm, categoryFilter]);

  return {
    isLoading,
    filteredRecommendations,
    categories, // Retorna as categorias carregadas
    isFormOpen,
    editingRec,
    formData,
    setFormData,
    handleFormOpenChange,
    handleSubmit,
    openEditDialog,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    openDeleteDialog,
    handleDeleteConfirm,
    setDeletingRecId,
    ratingLoadingId,
    handleAvaliar,
  };
};
