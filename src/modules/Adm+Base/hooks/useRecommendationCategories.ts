import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  listarCategoriasRecomendacaoApi,
  criarCategoriaRecomendacaoApi,
  atualizarCategoriaRecomendacaoApi,
  deletarCategoriaRecomendacaoApi,
} from "@/api/categoriaRecomendacaoService";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";

export function useRecommendationCategories() {
  const { language } = useI18n();
  const [categories, setCategories] = useState<CategoriaRecomendacaoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await listarCategoriasRecomendacaoApi();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error(
        language === "pt-BR"
          ? "Erro ao carregar categorias"
          : "Error loading categories",
      );
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const saveCategory = async (
    category: CategoriaRecomendacaoDTO,
    isEditing: boolean,
  ) => {
    try {
      if (isEditing && category.id) {
        await atualizarCategoriaRecomendacaoApi(category.id, category);
        toast.success(
          language === "pt-BR" ? "Categoria atualizada!" : "Category updated!",
        );
      } else {
        await criarCategoriaRecomendacaoApi(category);
        toast.success(
          language === "pt-BR" ? "Categoria criada!" : "Category created!",
        );
      }
      await loadCategories();
      return true;
    } catch (error) {
      console.error(error);
      toast.error(
        language === "pt-BR"
          ? "Erro ao salvar categoria"
          : "Error saving category",
      );
      return false;
    }
  };

  const removeCategory = async (id: number) => {
    try {
      await deletarCategoriaRecomendacaoApi(id);
      toast.success(
        language === "pt-BR" ? "Categoria excluída" : "Category deleted",
      );
      await loadCategories();
    } catch (error) {
      console.error(error);
      toast.error(
        language === "pt-BR"
          ? "Erro ao excluir (verifique se está em uso)"
          : "Error deleting (check if in use)",
      );
    }
  };

  return {
    categories,
    isLoading,
    loadCategories,
    saveCategory,
    removeCategory,
  };
}
