import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Recomendacao } from "@/api/types/recomendacaoTypes";
import { StarRatingDisplay } from "./StarRatingDisplay";
import { StarRatingInput } from "./StarRatingInput";
import { RecommendationUi } from "../hooks/useRecommendations";
import { CommentSection } from "./CommentSection";
import { CreateReportDialog } from "@/components/reports/CreateReportDialog";

interface RecommendationCardProps {
  rec: RecommendationUi;
  isAuthenticated: boolean;
  ratingLoadingId: string | null;
  onEdit: (rec: Recomendacao) => void;
  onDelete: (id: string) => void;
  onRate: (id: string, nota: number) => void;
  getCategoryIcon: (category: string) => string;
  getCategoryLabel: (category: string) => string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  rec,
  isAuthenticated,
  ratingLoadingId,
  onEdit,
  onDelete,
  onRate,
  getCategoryIcon,
  getCategoryLabel,
}) => {
  const media =
    rec.totalAvaliacoes > 0 ? rec.somaNotas / rec.totalAvaliacoes : 0;

  return (
    <Card key={rec.id} className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {getCategoryIcon(rec.categoria)}
                </span>
                <div className="flex gap-6">
                  <Badge variant="secondary">
                    {getCategoryLabel(rec.categoria)}
                  </Badge>
                  <StarRatingDisplay
                    media={media}
                    total={rec.totalAvaliacoes}
                  />
                </div>
              </div>
            </div>
            <CardTitle className="text-xl pt-2">{rec.titulo}</CardTitle>
          </div>

          {/* Botões de Admin/Edição/Denúncia (apenas se autenticado) */}
          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-1">
              {/* Botão de Denúncia */}
              <CreateReportDialog
                targetId={rec.id}
                targetType="RECOMMENDATION"
              />

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => onEdit(rec)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(rec.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Deletar</span>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <CardDescription className="text-base">{rec.descricao}</CardDescription>
        <p className="text-sm text-muted-foreground pt-2">
          <strong>Justificativa:</strong> {rec.justificativa}
        </p>
        {rec.referencia && (
          <p className="text-sm text-muted-foreground pt-2">
            <strong>Referência:</strong> {rec.referencia}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 w-full border-t pt-4">
        {/* Área de Avaliação (só aparece se logado) */}
        {isAuthenticated && (
          <div className="w-full flex justify-between items-center">
            <StarRatingInput
              onAvaliar={(nota) => onRate(rec.id, nota)}
              disabled={ratingLoadingId === rec.id}
            />
          </div>
        )}

        {/* Seção de Comentários Integrada */}
        <CommentSection
          recomendacaoId={rec.id}
          isAuthenticated={isAuthenticated}
        />
      </CardFooter>
    </Card>
  );
};
