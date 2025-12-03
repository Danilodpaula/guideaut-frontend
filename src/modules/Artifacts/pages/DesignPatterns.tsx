// DesignPatterns.tsx
// Página de listagem e filtragem de Padrões de Design do DPAut (GuideAut Base/Admin)
// Exibe padrões armazenados no Supabase com suporte a busca, filtragem e categorização.

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/core/i18n/I18nContext";
import { Search, Palette, Eye, Volume2, Gauge, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/core/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../hooks/useAuthGuard";

/**
 * Estrutura de categoria e padrão de design.
 */
interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Pattern {
  id: string;
  code: string;
  category_id: string | null;
  name: string;
  problem: string;
  solution: string;
  example: string;
  quality_attribute: string;
}

/**
 * 🎨 Componente principal — Padrões de Design DPAut
 * Mostra padrões de interface categorizados e relacionados a atributos de qualidade,
 * com suporte a filtros por texto, categoria e tipo de qualidade.
 */
const DesignPatterns = () => {
  useAuthGuard();
  const { language } = useI18n();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Deu erro!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  // Filtros de busca
  const [searchTerm, setSearchTerm] = useState("");
  const [qualityFilter, setQualityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dados carregados
  const [categories, setCategories] = useState<Category[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Carrega os dados do Supabase assim que o componente é montado.
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * 🔄 Busca categorias e padrões de design.
   */
  const loadData = async () => {
    try {
      setIsLoading(true);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "PATTERN")
        .eq("status", "ACTIVE")
        .order("created_at", { ascending: true });

      if (categoriesError) throw categoriesError;

      const { data: patternsData, error: patternsError } = await supabase
        .from("design_patterns")
        .select("*")
        .order("code", { ascending: true });

      if (patternsError) throw patternsError;

      setCategories(categoriesData || []);
      setPatterns(patternsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error(
        language === "pt-BR"
          ? "Erro ao carregar padrões"
          : "Error loading patterns",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Determina o ícone adequado conforme o atributo de qualidade.
   */
  const getQualityIcon = (quality: string) => {
    const normalized = quality.toLowerCase();
    if (normalized.includes("visual")) return Palette;
    if (normalized.includes("sensor")) return Volume2;
    if (normalized.includes("cogni")) return Eye;
    if (normalized.includes("intera")) return Gauge;
    return Palette;
  };

  /**
   * Aplica os filtros definidos na interface (texto, qualidade, categoria).
   */
  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch =
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesQuality =
      qualityFilter === "all" ||
      pattern.quality_attribute
        .toLowerCase()
        .includes(qualityFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || pattern.category_id === categoryFilter;

    return matchesSearch && matchesQuality && matchesCategory;
  });

  /**
   * Extrai todos os atributos de qualidade únicos para popular o filtro.
   */
  const qualityAttributes = Array.from(
    new Set(patterns.map((p) => p.quality_attribute)),
  ).sort();

  /**
   * Estado de carregamento
   */
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">
            {language === "pt-BR"
              ? "Carregando padrões..."
              : "Loading patterns..."}
          </p>
        </div>
      </div>
    );
  }

  /**
   * 🧭 Renderização principal da página
   */
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR"
            ? "Padrões de Design DPAut"
            : "DPAut Design Patterns"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Soluções comprovadas para problemas comuns em interfaces para autistas"
            : "Proven solutions for common problems in interfaces for autistics"}
        </p>
      </div>

      {/* Área de filtros */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "pt-BR" ? "Buscar Padrões" : "Search Patterns"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Campo de busca */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "pt-BR"
                    ? "Buscar por nome, código..."
                    : "Search by name, code..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro de categoria */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={language === "pt-BR" ? "Categoria" : "Category"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === "pt-BR" ? "Todas" : "All"}
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro de atributo de qualidade */}
            <Select value={qualityFilter} onValueChange={setQualityFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === "pt-BR"
                      ? "Atributo de Qualidade"
                      : "Quality Attribute"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === "pt-BR" ? "Todos" : "All"}
                </SelectItem>
                {qualityAttributes.map((qa) => (
                  <SelectItem key={qa} value={qa}>
                    {qa}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listagem dos padrões filtrados */}
      <div className="space-y-4">
        {filteredPatterns.map((pattern) => {
          const Icon = getQualityIcon(pattern.quality_attribute);
          const category = categories.find((c) => c.id === pattern.category_id);

          return (
            <Card key={pattern.id} className="hover-scale">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon className="h-6 w-6 text-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle>{pattern.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          {pattern.quality_attribute}
                        </Badge>
                        {category && (
                          <Badge variant="secondary">{category.name}</Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      {language === "pt-BR" ? "Código" : "Code"}: {pattern.code}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="problem" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="problem">
                      {language === "pt-BR" ? "Problema" : "Problem"}
                    </TabsTrigger>
                    <TabsTrigger value="solution">
                      {language === "pt-BR" ? "Solução" : "Solution"}
                    </TabsTrigger>
                    <TabsTrigger value="example">
                      {language === "pt-BR" ? "Exemplo" : "Example"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="problem" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {pattern.problem}
                    </p>
                  </TabsContent>

                  <TabsContent value="solution" className="mt-4">
                    <p className="text-sm">{pattern.solution}</p>
                  </TabsContent>

                  <TabsContent value="example" className="mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm font-mono">{pattern.example}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mensagem caso não haja resultados */}
      {filteredPatterns.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "pt-BR"
                ? "Nenhum padrão encontrado com os filtros aplicados"
                : "No patterns found with applied filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DesignPatterns;
