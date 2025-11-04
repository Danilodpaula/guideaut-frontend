// Search.tsx
// Página de busca interna do GuideAut.
// Permite pesquisar páginas, categorias, usuários e seções de ajuda, com base em uma lista mockada de resultados.
// A busca respeita o idioma atual e as permissões do usuário logado.

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";
import {
  Search as SearchIcon,
  FileText,
  Users,
  FolderTree,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/** 
 * Interface para estruturar cada resultado da busca.
 * Contém metadados de acesso (requiresAuth e requiresRole) para ocultar itens restritos.
 */
interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "user" | "category" | "help" | "page";
  url: string;
  requiresAuth?: boolean;
  requiresRole?: string;
}

export default function Search() {
  const { t, language } = useI18n(); // Hook de tradução e detecção de idioma
  const { can } = useAuth(); // Hook para verificar permissões de usuário
  const navigate = useNavigate(); // Hook de navegação
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca digitado
  const [isSearching, setIsSearching] = useState(false); // Estado de "buscando" (simulado)

  /** 
   * Lista mockada com resultados fixos de exemplo.
   * Idealmente, em versões futuras, isso seria buscado dinamicamente no banco (ex: Supabase).
   */
  const allResults: SearchResult[] = [
    {
      id: "1",
      title: language === "pt-BR" ? "Gerenciar Usuários" : "Manage Users",
      description:
        language === "pt-BR"
          ? "Visualize, edite e gerencie todos os usuários do sistema"
          : "View, edit, and manage all system users",
      type: "page",
      url: "/admin/users",
      requiresAuth: true,
      requiresRole: "ADMIN",
    },
    {
      id: "2",
      title:
        language === "pt-BR"
          ? "Configurações de Acessibilidade"
          : "Accessibility Settings",
      description:
        language === "pt-BR"
          ? "Personalize tema, tamanho de fonte e animações"
          : "Customize theme, font size, and animations",
      type: "page",
      url: "/settings/accessibility",
      requiresAuth: true,
    },
    {
      id: "3",
      title: language === "pt-BR" ? "Ajuda e FAQ" : "Help & FAQ",
      description:
        language === "pt-BR"
          ? "Encontre respostas para perguntas frequentes"
          : "Find answers to frequently asked questions",
      type: "help",
      url: "/help",
    },
    {
      id: "4",
      title: language === "pt-BR" ? "Categorias" : "Categories",
      description:
        language === "pt-BR"
          ? "Gerencie categorias do sistema"
          : "Manage system categories",
      type: "category",
      url: "/admin/categories",
      requiresAuth: true,
      requiresRole: "ADMIN",
    },
    {
      id: "5",
      title: language === "pt-BR" ? "Log de Auditoria" : "Audit Log",
      description:
        language === "pt-BR"
          ? "Visualize todas as ações realizadas no sistema"
          : "View all actions performed in the system",
      type: "page",
      url: "/admin/audit",
      requiresAuth: true,
      requiresRole: "ADMIN",
    },
    {
      id: "6",
      title: language === "pt-BR" ? "Importar Dados" : "Import Data",
      description:
        language === "pt-BR"
          ? "Importe dados em lote via CSV ou XLSX"
          : "Import bulk data via CSV or XLSX",
      type: "page",
      url: "/admin/import",
      requiresAuth: true,
      requiresRole: "ADMIN",
    },
    {
      id: "7",
      title:
        language === "pt-BR" ? "Papéis e Permissões" : "Roles & Permissions",
      description:
        language === "pt-BR"
          ? "Configure papéis e permissões de usuários"
          : "Configure user roles and permissions",
      type: "page",
      url: "/admin/roles",
      requiresAuth: true,
      requiresRole: "ADMIN",
    },
  ];

  /** 
   * Simula o início e fim da busca, apenas para efeitos visuais.
   * Poderia futuramente exibir um spinner durante buscas assíncronas.
   */
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  /** 
   * Filtra resultados com base no termo digitado e permissões do usuário.
   */
  const filteredResults = allResults.filter((result) => {
    // Filtro textual
    const matchesSearch =
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Verificação de permissão
    const hasPermission = !result.requiresRole || can(result.requiresRole);

    // Só retorna se o termo tiver sido digitado e o usuário tiver acesso
    return matchesSearch && hasPermission && searchTerm.length > 0;
  });

  /** 
   * Associa ícones a cada tipo de resultado.
   */
  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return Users;
      case "category":
        return FolderTree;
      case "help":
        return HelpCircle;
      default:
        return FileText;
    }
  };

  /** 
   * Retorna o rótulo traduzido do tipo de item (para o badge lateral).
   */
  const getTypeBadge = (type: string) => {
    const labels = {
      "pt-BR": {
        user: "Usuário",
        category: "Categoria",
        help: "Ajuda",
        page: "Página",
      },
      "en-US": {
        user: "User",
        category: "Category",
        help: "Help",
        page: "Page",
      },
    };
    return labels[language][type as keyof typeof labels["pt-BR"]] || type;
  };

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("nav.search")}</h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Busque páginas, usuários, categorias e mais"
            : "Search pages, users, categories, and more"}
        </p>
      </div>

      {/* Campo de busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={
                language === "pt-BR"
                  ? "Digite para buscar..."
                  : "Type to search..."
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch();
              }}
              className="pl-10 h-12 text-lg"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>

      {/* Resultados filtrados */}
      {searchTerm.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {filteredResults.length}{" "}
            {language === "pt-BR"
              ? "resultado(s) encontrado(s)"
              : "result(s) found"}
          </p>

          {/* Lista de cards com resultados */}
          {filteredResults.map((result) => {
            const Icon = getIcon(result.type);
            return (
              <Card
                key={result.id}
                className="hover:bg-accent cursor-pointer transition-all hover-scale animate-scale-in"
                onClick={() => navigate(result.url)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {result.title}
                        </CardTitle>
                        <CardDescription>
                          {result.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {getTypeBadge(result.type)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            );
          })}

          {/* Caso nenhum resultado tenha sido encontrado */}
          {filteredResults.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === "pt-BR"
                    ? "Nenhum resultado encontrado. Tente outros termos."
                    : "No results found. Try different terms."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Estado inicial — sem texto no campo */}
      {searchTerm.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "pt-BR"
                ? "Digite algo para começar a buscar"
                : "Type something to start searching"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
