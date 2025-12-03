import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoriaRecomendacaoDTO | null;
  onSave: (data: CategoriaRecomendacaoDTO) => Promise<boolean>;
}

export function CategoryDialog({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryDialogProps) {
  const { language } = useI18n();
  const [isSaving, setIsSaving] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (open) {
      setNome(category?.nome || "");
      setDescricao(category?.descricao || "");
      setAtivo(category?.ativo ?? true);
    }
  }, [open, category]);

  const handleSubmit = async () => {
    if (!nome.trim()) {
      toast.error(
        language === "pt-BR" ? "O nome é obrigatório" : "Name is required",
      );
      return;
    }

    setIsSaving(true);
    const payload: CategoriaRecomendacaoDTO = {
      id: category?.id,
      nome,
      descricao,
      ativo,
    };

    const success = await onSave(payload);
    setIsSaving(false);

    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category
              ? language === "pt-BR"
                ? "Editar Categoria"
                : "Edit Category"
              : language === "pt-BR"
                ? "Nova Categoria"
                : "New Category"}
          </DialogTitle>
          <DialogDescription>
            {language === "pt-BR"
              ? "Defina o nome e a descrição da categoria."
              : "Define the category name and description."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">
              {language === "pt-BR" ? "Nome" : "Name"}
            </Label>
            <Input
              id="cat-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Acessibilidade Visual"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-desc">
              {language === "pt-BR" ? "Descrição" : "Description"}
            </Label>
            <Textarea
              id="cat-desc"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="cat-active"
              checked={ativo}
              onCheckedChange={setAtivo}
            />
            <Label htmlFor="cat-active">
              {language === "pt-BR" ? "Categoria Ativa" : "Active Category"}
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            {language === "pt-BR" ? "Cancelar" : "Cancel"}
          </Button>
          <Button onClick={handleSubmit} disabled={!nome.trim() || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {language === "pt-BR" ? "Salvar" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
