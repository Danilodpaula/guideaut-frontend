import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";

import { useRecommendationCategories } from "../hooks/useRecommendationCategories";
import { CategoriesTable } from "../components/categories/CategoriesTable";
import { CategoryDialog } from "../components/categories/CategoryDialog";

/**
 * 📁 Página de Categorias de Recomendação
 */
export default function Categories() {
  const { language } = useI18n();
  const { categories, isLoading, saveCategory, removeCategory } =
    useRecommendationCategories();

  // Estados locais da página
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoriaRecomendacaoDTO | null>(null);

  // Abrir diálogo para criação
  const handleCreate = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  // Abrir diálogo para edição
  const handleEdit = (category: CategoriaRecomendacaoDTO) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  // Confirmar exclusão
  const handleDelete = (id: number) => {
    const confirmMessage =
      language === "pt-BR"
        ? "Tem certeza que deseja excluir esta categoria?"
        : "Are you sure you want to delete this category?";

    if (confirm(confirmMessage)) {
      removeCategory(id);
    }
  };

  // Salvar (chamado pelo Dialog)
  const handleSave = async (data: CategoriaRecomendacaoDTO) => {
    return await saveCategory(data, !!editingCategory);
  };

  // Filtragem local
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR"
              ? "Categorias de Recomendação"
              : "Recommendation Categories"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "pt-BR"
              ? "Gerencie as categorias usadas para classificar as recomendações"
              : "Manage categories used to classify recommendations"}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          {language === "pt-BR" ? "Nova Categoria" : "New Category"}
        </Button>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "pt-BR" ? "Filtrar" : "Filter"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder={
              language === "pt-BR"
                ? "Buscar categorias..."
                : "Search categories..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <CategoriesTable
            categories={filteredCategories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Diálogo */}
      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}
