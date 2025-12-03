import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Recomendacao } from "@/api/types/recomendacaoTypes";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";
import { Plus } from "lucide-react";

// Constante com as categorias padrão (Enum)
export const DEFAULT_CATEGORIES = [
  { value: "NAVIGATION", label: "Navegação" },
  { value: "INTERACTION", label: "Interação" },
  { value: "VISUAL", label: "Visual" },
  { value: "CONTENT", label: "Conteúdo" },
  { value: "FEEDBACK", label: "Feedback" },
  { value: "GENERAL", label: "Geral" },
];

interface FormData {
  title: string;
  description: string;
  justificativa: string;
  category: string;
  referencia: string;
}

interface RecommendationFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  editingRec: Recomendacao | null;
  categories: CategoriaRecomendacaoDTO[];
}

export const RecommendationFormDialog: React.FC<
  RecommendationFormDialogProps
> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  formData,
  setFormData,
  editingRec,
  categories,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Recomendação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRec ? "Editar Recomendação" : "Nova Recomendação"}
          </DialogTitle>
          <DialogDescription>
            {editingRec
              ? "Atualize os detalhes desta recomendação."
              : "Compartilhe sua recomendação com a comunidade."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="Insira um título para essa recomendação"
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
              className="resize-none"
              placeholder="Descreva sobre essa recomendação"
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
              className="resize-none"
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
                <SelectGroup>
                  <SelectLabel>Categorias Padrão</SelectLabel>
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                {categories.length > 0 && (
                  <SelectGroup>
                    <SelectLabel>Outras Categorias</SelectLabel>
                    {categories.map(
                      (cat) =>
                        // Evita duplicidade se o nome for igual a um padrão
                        !DEFAULT_CATEGORIES.some(
                          (def) => def.value === cat.nome,
                        ) && (
                          <SelectItem key={cat.id} value={cat.nome}>
                            {cat.nome}
                          </SelectItem>
                        ),
                    )}
                  </SelectGroup>
                )}
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
              onClick={() => onOpenChange(false)}
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
  );
};
