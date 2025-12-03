import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

import { useRecommendations } from "../hooks/useRecommendations";

import { RecommendationFilters } from "../components/RecommendationFilters";
import {
  RecommendationFormDialog,
  DEFAULT_CATEGORIES,
} from "../components/RecommendationFormDialog"; // Importa as categorias padrão
import { RecommendationCard } from "../components/RecommendationCard";

const getCategoryIcon = (category: string) => {
  const map: Record<string, string> = {
    NAVIGATION: "🧭",
    INTERACTION: "👆",
    VISUAL: "👁️",
    CONTENT: "📝",
    FEEDBACK: "💬",
    GENERAL: "⚙️",
  };
  // Tenta achar pelo nome exato ou retorna um pin padrão
  return map[category] || "📌";
};

// Função ajustada para traduzir os ENUMs
const getCategoryLabel = (category: string) => {
  const found = DEFAULT_CATEGORIES.find((c) => c.value === category);
  return found ? found.label : category;
};

export default function Recommendations() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const {
    isLoading,
    filteredRecommendations,
    categories,
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
  } = useRecommendations(searchTerm, categoryFilter);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("nav.recommendations")}
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore e compartilhe recomendações de design acessível
          </p>
        </div>

        {isAuthenticated ? (
          <RecommendationFormDialog
            isOpen={isFormOpen}
            onOpenChange={handleFormOpenChange}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            editingRec={editingRec}
            categories={categories}
          />
        ) : (
          <Button onClick={() => navigate("/login")} variant="outline">
            Fazer Login
          </Button>
        )}
      </div>

      <RecommendationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

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
            <RecommendationCard
              key={rec.id}
              rec={rec}
              isAuthenticated={isAuthenticated}
              ratingLoadingId={ratingLoadingId}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              onRate={handleAvaliar}
              getCategoryIcon={getCategoryIcon}
              getCategoryLabel={getCategoryLabel}
            />
          ))}
        </div>
      )}

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá deletar permanentemente
              a recomendação.
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
