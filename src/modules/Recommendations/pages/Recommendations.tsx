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
import { RecommendationFormDialog } from "../components/RecommendationFormDialog";
import { RecommendationCard } from "../components/RecommendationCard";

const getCategoryIcon = (category: string) =>
  ({
    NAVIGATION: "🧭",
    INTERACTION: "👆",
    VISUAL: "👁️",
    CONTENT: "📝",
    FEEDBACK: "💬",
    GENERAL: "⚙️",
  })[category] || "📌";

const getCategoryLabel = (category: string) =>
  ({
    NAVIGATION: "Navegação",
    INTERACTION: "Interação",
    VISUAL: "Visual",
    CONTENT: "Conteúdo",
    FEEDBACK: "Feedback",
    GENERAL: "Geral",
  })[category] || category;

export default function Recommendations() {
  const { t } = useI18n();
  const { isAuthenticated, can } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const {
    isLoading,
    filteredRecommendations,
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

        {isAuthenticated ? (
          <RecommendationFormDialog
            isOpen={isFormOpen}
            onOpenChange={handleFormOpenChange}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            editingRec={editingRec}
          />
        ) : (
          <Button onClick={() => navigate("/login")} variant="outline">
            Fazer Login
          </Button>
        )}
      </div>

      {/* Filtros */}
      <RecommendationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

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

      {/* Diálogo de Confirmação de Exclusão */}
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
