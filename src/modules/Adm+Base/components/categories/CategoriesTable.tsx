import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, FolderTree, Loader2 } from "lucide-react";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";
import { useI18n } from "@/core/i18n/I18nContext";

interface CategoriesTableProps {
  categories: CategoriaRecomendacaoDTO[];
  isLoading: boolean;
  onEdit: (category: CategoriaRecomendacaoDTO) => void;
  onDelete: (id: number) => void;
}

export function CategoriesTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const { language } = useI18n();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {language === "pt-BR"
          ? "Nenhuma categoria encontrada."
          : "No categories found."}
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{language === "pt-BR" ? "Nome" : "Name"}</TableHead>
            <TableHead>
              {language === "pt-BR" ? "Descrição" : "Description"}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              {language === "pt-BR" ? "Ações" : "Actions"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="hover:bg-muted/50">
              <TableCell className="font-medium flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-muted-foreground" />
                {category.nome}
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[300px] truncate">
                {category.descricao || "-"}
              </TableCell>
              <TableCell>
                <Badge variant={category.ativo ? "default" : "secondary"}>
                  {category.ativo
                    ? language === "pt-BR"
                      ? "Ativa"
                      : "Active"
                    : language === "pt-BR"
                      ? "Inativa"
                      : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => category.id && onDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
