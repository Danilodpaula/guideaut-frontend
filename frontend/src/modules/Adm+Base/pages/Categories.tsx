// Categories.tsx
// Página de gerenciamento de categorias de artefatos e padrões de design (GuideAut Admin)
// Permite criar, editar, arquivar e visualizar categorias integradas ao Supabase.

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/core/i18n/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FolderTree, Pencil, Archive, Loader2 } from "lucide-react";

/**
 * Estrutura base para categorias de artefatos e padrões.
 */
interface Category {
  id: string;
  name: string;
  description: string | null;
  type: "ARTIFACT" | "PATTERN" | "GENERAL";
  status: "ACTIVE" | "ARCHIVED";
  created_at: string;
  artifact_count?: number;
  pattern_count?: number;
}

/**
 * 📁 Página de Categorias
 * Permite criar, editar e arquivar categorias. Os dados são carregados e atualizados via Supabase.
 */
export default function Categories() {
  const { t, language } = useI18n();

  // Estados de controle
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryType, setCategoryType] = useState<"ARTIFACT" | "PATTERN" | "GENERAL">("GENERAL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // 🔄 Carrega categorias ao montar o componente
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * 🔍 Carrega as categorias e conta quantos artefatos e padrões estão vinculados a cada uma.
   */
  const loadCategories = async () => {
    try {
      setIsLoading(true);
      
      const { data: categoriesData, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (categoriesData) {
        // Conta artefatos e padrões relacionados a cada categoria
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (cat) => {
            const [artifactsResult, patternsResult] = await Promise.all([
              supabase
                .from("artifacts")
                .select("id", { count: "exact", head: true })
                .eq("category_id", cat.id),
              supabase
                .from("design_patterns")
                .select("id", { count: "exact", head: true })
                .eq("category_id", cat.id),
            ]);

            return {
              ...cat,
              type: cat.type as "ARTIFACT" | "PATTERN" | "GENERAL",
              status: cat.status as "ACTIVE" | "ARCHIVED",
              artifact_count: artifactsResult.count || 0,
              pattern_count: patternsResult.count || 0,
            };
          })
        );

        setCategories(categoriesWithCounts);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ✏️ Abre o diálogo para criação ou edição de categoria.
   */
  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
      setCategoryDescription(category.description || "");
      setCategoryType(category.type);
    } else {
      setEditingCategory(null);
      setCategoryName("");
      setCategoryDescription("");
      setCategoryType("GENERAL");
    }
    setIsDialogOpen(true);
  };

  /**
   * 💾 Salva ou atualiza a categoria no banco de dados.
   */
  const handleSave = async () => {
    if (!categoryName.trim()) return;

    try {
      setIsSaving(true);

      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update({
            name: categoryName,
            description: categoryDescription || null,
            type: categoryType,
          })
          .eq("id", editingCategory.id);

        if (error) throw error;
        toast.success("Categoria atualizada com sucesso");
      } else {
        const { error } = await supabase
          .from("categories")
          .insert({
            name: categoryName,
            description: categoryDescription || null,
            type: categoryType,
          });

        if (error) throw error;
        toast.success("Categoria criada com sucesso");
      }

      setIsDialogOpen(false);
      await loadCategories();
    } catch (error: any) {
      console.error("Erro ao salvar categoria:", error);
      toast.error(error.message || "Erro ao salvar categoria");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 📦 Alterna o status da categoria (ativa/arquivada).
   */
  const handleArchive = async (category: Category) => {
    try {
      const newStatus = category.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";
      
      const { error } = await supabase
        .from("categories")
        .update({ status: newStatus })
        .eq("id", category.id);

      if (error) throw error;

      toast.success(
        newStatus === "ARCHIVED" 
          ? "Categoria arquivada" 
          : "Categoria reativada"
      );
      await loadCategories();
    } catch (error: any) {
      console.error("Erro ao arquivar categoria:", error);
      toast.error("Erro ao arquivar categoria");
    }
  };

  /**
   * 🏷️ Traduz o tipo de categoria conforme o idioma atual.
   */
  const getTypeLabel = (type: string) => {
    const labels = {
      ARTIFACT: language === "pt-BR" ? "Artefato" : "Artifact",
      PATTERN: language === "pt-BR" ? "Padrão" : "Pattern",
      GENERAL: language === "pt-BR" ? "Geral" : "General",
    };
    return labels[type as keyof typeof labels] || type;
  };

  // 🔎 Aplica filtro de busca
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Soma total de itens por categoria
  const totalItems = (cat: Category) => 
    (cat.artifact_count || 0) + (cat.pattern_count || 0);

  /**
   * 🧭 Renderização principal da página.
   */
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho e botão de nova categoria */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground mt-2">
            Organize artefatos e padrões de design em categorias
          </p>
        </div>

        {/* Diálogo de criação/edição */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <FolderTree className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </DialogTitle>
              <DialogDescription>
                As categorias ajudam a organizar artefatos e padrões de design.
              </DialogDescription>
            </DialogHeader>

            {/* Formulário da categoria */}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Nome</Label>
                <Input
                  id="category-name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ex: Comunicação Aumentativa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-description">Descrição</Label>
                <Textarea
                  id="category-description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Descreva o propósito desta categoria..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-type">Tipo</Label>
                <Select value={categoryType} onValueChange={(v) => setCategoryType(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ARTIFACT">Artefato</SelectItem>
                    <SelectItem value="PATTERN">Padrão</SelectItem>
                    <SelectItem value="GENERAL">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!categoryName.trim() || isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campo de busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de categorias */}
      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Carregando categorias...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhuma categoria encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover-scale">
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(category.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={category.status === "ACTIVE" ? "default" : "secondary"}>
                          {category.status === "ACTIVE" ? "Ativa" : "Arquivada"}
                        </Badge>
                      </TableCell>
                      <TableCell>{totalItems(category)}</TableCell>
                      <TableCell>
                        {new Date(category.created_at).toLocaleDateString(language)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenDialog(category)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleArchive(category)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
