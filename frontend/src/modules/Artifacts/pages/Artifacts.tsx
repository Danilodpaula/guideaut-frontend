// Artifacts.tsx
// Página de listagem e download de artefatos do ProAut (GuideAut Base/Admin)
// Exibe templates categorizados carregados do banco Supabase, permitindo download em PDF ou DOCX.

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useI18n } from "@/core/i18n/I18nContext";
import { Download, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Tipos de dados obtidos do banco (Supabase)
 */
interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Artifact {
  id: string;
  category_id: string | null;
  name: string;
  description: string;
  fields: any;
  phase: string;
  pdf_url: string | null;
  docx_url: string | null;
}

/**
 * 📁 Componente principal da página de artefatos.
 * Carrega templates de artefatos categorizados (como documentos, planilhas, modelos)
 * e permite download individual ou completo.
 */
export default function Artifacts() {
  const { language } = useI18n();
  const [categories, setCategories] = useState<Category[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Carrega os dados assim que o componente for montado.
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * 🔄 Função responsável por buscar categorias e artefatos no Supabase.
   */
  const loadData = async () => {
    try {
      setIsLoading(true);

      // Carrega categorias do tipo "ARTIFACT"
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "ARTIFACT")
        .eq("status", "ACTIVE")
        .order("created_at", { ascending: true });

      if (categoriesError) throw categoriesError;

      // Carrega lista de artefatos
      const { data: artifactsData, error: artifactsError } = await supabase
        .from("artifacts")
        .select("*")
        .order("created_at", { ascending: true });

      if (artifactsError) throw artifactsError;

      setCategories(categoriesData || []);
      setArtifacts(artifactsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error(
        language === "pt-BR"
          ? "Erro ao carregar artefatos"
          : "Error loading artifacts"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Filtra artefatos pertencentes a uma categoria específica.
   */
  const getArtifactsByCategory = (categoryId: string) => {
    return artifacts.filter((a) => a.category_id === categoryId);
  };

  /**
   * Executa o download de um artefato específico (PDF ou DOCX).
   */
  const handleDownload = (url: string | null, type: string) => {
    if (!url) {
      toast.error(
        language === "pt-BR"
          ? "Arquivo não disponível"
          : "File not available"
      );
      return;
    }
    window.open(url, "_blank");
  };

  /**
   * 💫 Estado de carregamento
   */
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">
            {language === "pt-BR"
              ? "Carregando artefatos..."
              : "Loading artifacts..."}
          </p>
        </div>
      </div>
    );
  }

  /**
   * ⚠️ Caso não existam categorias cadastradas
   */
  if (categories.length === 0) {
    return (
      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR"
              ? "Artefatos do ProAut"
              : "ProAut Artifacts"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "pt-BR"
              ? "Templates e modelos para conduzir o processo de prototipação"
              : "Templates and models to conduct the prototyping process"}
          </p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "pt-BR"
                ? "Nenhuma categoria de artefato cadastrada ainda"
                : "No artifact categories registered yet"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /**
   * 🧭 Renderização principal da página de artefatos
   */
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR"
            ? "Artefatos do ProAut"
            : "ProAut Artifacts"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Templates e modelos para conduzir o processo de prototipação"
            : "Templates and models to conduct the prototyping process"}
        </p>
      </div>

      {/* Tabs dinâmicas baseadas em categorias */}
      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <TabsList
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
          }}
        >
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Conteúdo de cada categoria */}
        {categories.map((category) => {
          const categoryArtifacts = getArtifactsByCategory(category.id);

          return (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-6 space-y-4"
            >
              {/* Cabeçalho da categoria */}
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>

              {/* Artefatos listados dentro da categoria */}
              {categoryArtifacts.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      {language === "pt-BR"
                        ? "Nenhum artefato cadastrado nesta categoria"
                        : "No artifacts registered in this category"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                categoryArtifacts.map((artifact) => (
                  <Card key={artifact.id} className="hover-scale">
                    <CardHeader>
                      <CardTitle>{artifact.name}</CardTitle>
                      <CardDescription>{artifact.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Campos descritivos do artefato */}
                      {artifact.fields &&
                        Array.isArray(artifact.fields) &&
                        artifact.fields.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">
                              {language === "pt-BR"
                                ? "Campos inclusos:"
                                : "Included fields:"}
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {artifact.fields.map(
                                (field: string, idx: number) => (
                                  <li key={idx}>{field}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      {/* Botões de download */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() =>
                            handleDownload(artifact.pdf_url, "PDF")
                          }
                          disabled={!artifact.pdf_url}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {language === "pt-BR"
                            ? "Baixar PDF"
                            : "Download PDF"}
                        </Button>

                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            handleDownload(artifact.docx_url, "DOCX")
                          }
                          disabled={!artifact.docx_url}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {language === "pt-BR"
                            ? "Baixar DOCX"
                            : "Download DOCX"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Seção de download completo (ZIP) */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>
            {language === "pt-BR" ? "Pacote Completo" : "Complete Package"}
          </CardTitle>
          <CardDescription>
            {language === "pt-BR"
              ? "Baixe todos os artefatos em um único arquivo"
              : "Download all artifacts in a single file"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" size="lg">
            <Download className="mr-2 h-5 w-5" />
            {language === "pt-BR"
              ? "Baixar Todos os Artefatos (ZIP)"
              : "Download All Artifacts (ZIP)"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}