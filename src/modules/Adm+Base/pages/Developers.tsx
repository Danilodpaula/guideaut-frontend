// src/modules/Adm+Base/pages/Developers.tsx
// Lista os desenvolvedores do GuideAut com cards e links para o GitHub.

import { Github, Mail, User, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/core/i18n/I18nContext";
import { useDevelopers } from "../hooks/useDevelopers";
import { toast } from "sonner";

const getInitials = (nameOrLogin: string) =>
  nameOrLogin
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function Developers() {
  const { language } = useI18n();
  const { developers, isLoading, isError } = useDevelopers();

  if (isError) {
    toast.error(
      language === "pt-BR"
        ? "Não foi possível carregar a lista de desenvolvedores."
        : "Failed to load developers list.",
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR" ? "Desenvolvedores" : "Developers"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Conheça as pessoas que contribuíram para o desenvolvimento do GuideAut."
            : "Meet the people who contributed to the development of GuideAut."}
        </p>
      </div>

      {/* Estados de carregamento / vazio */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : developers.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          {language === "pt-BR"
            ? "Nenhum desenvolvedor encontrado."
            : "No developers found."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {developers.map((dev) => {
            const displayName = dev.name || dev.login;
            const initials = getInitials(displayName);

            return (
              <Card key={dev.login} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={dev.avatar_url} alt={displayName} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{displayName}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <User className="h-3 w-3" />
                      {dev.role ??
                        (language === "pt-BR"
                          ? "Desenvolvedor(a)"
                          : "Developer")}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      @{dev.login}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-3">
                  {/* Bio vinda do GitHub (se existir) */}
                  {dev.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {dev.bio}
                    </p>
                  )}

                  {/* Tags/stack (metadados locais) */}
                  {dev.tags && dev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dev.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex flex-col gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full justify-center gap-2"
                    >
                      <a href={dev.html_url} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        {language === "pt-BR"
                          ? "Ver no GitHub"
                          : "View on GitHub"}
                      </a>
                    </Button>

                    {/* Se algum dia você quiser associar e-mail, pode vir do META_BY_LOGIN e ser usado aqui */}
                    {/* Exemplo (se decidir adicionar email no meta futuramente):
                    {dev.email && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center gap-2"
                      >
                        <a href={`mailto:${dev.email}`}>
                          <Mail className="h-4 w-4" />
                          {dev.email}
                        </a>
                      </Button>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
