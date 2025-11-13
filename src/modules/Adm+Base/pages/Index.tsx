// Index.tsx
// Página inicial (Dashboard) do GuideAut – Módulo Base & Administração
// Exibe boas-vindas, métricas resumidas e descrição geral do projeto.

import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, FolderTree, Activity } from "lucide-react";

/**
 * 🏠 Componente principal da página inicial (Index)
 * Mostra resumo do sistema, métricas básicas e uma introdução ao GuideAut.
 */
const Index = () => {
  const { t } = useI18n();
  const { user, isAuthenticated } = useAuth();

  // Métricas exibidas no painel (dados simulados)
  const stats = [
    { title: t("nav.users"), value: "248", icon: Users, change: "+12%" },
    { title: t("nav.roles"), value: "4", icon: Shield, change: "0%" },
    {
      title: t("nav.categories"),
      value: "32",
      icon: FolderTree,
      change: "+5%",
    },
    { title: t("nav.audit"), value: "1,429", icon: Activity, change: "+18%" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho e mensagem de boas-vindas */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("nav.home")}</h1>
        <p className="text-muted-foreground mt-2">
          {isAuthenticated
            ? `Bem-vindo de volta, ${user?.name}`
            : "Bem-vindo ao GuideAut - Repositório colaborativo para design de interfaces acessíveis"}
        </p>
      </div>

      {/* Mensagem para visitantes */}
      {!isAuthenticated && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Explore a plataforma</h2>
            <p className="text-muted-foreground mb-4">
              Você está navegando como visitante. Explore livremente o conteúdo
              público da plataforma. Para postar recomendações e acessar
              recursos exclusivos, faça login ou cadastre-se.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Painel de estatísticas para usuários autenticados */}
      {isAuthenticated && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change} últimos 30 dias
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Seção sobre o GuideAut */}
      <Card>
        <CardHeader>
          <CardTitle>O GuideAut</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            GuideAut foi concebido para fornecer suporte tecnológico ao{" "}
            <strong>ProAut</strong>, um processo para apoiar o desenvolvimento
            de interfaces de aplicativos para pessoas autistas. Contém
            propriedades de sistema colaborativo, recomendações de design para
            interfaces gráficas mais acessíveis e inclusivas, bem como
            características específicas de perfis autistas para promover empatia
            entre autistas e equipes de desenvolvimento — utilizando artefatos e
            padrões definidos pelo ProAut.
          </p>

          {/* Blocos de recursos e funcionalidades */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Recursos de Acessibilidade</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tema claro e escuro</li>
                <li>Ajuste de tamanho de fonte</li>
                <li>Redução de animações</li>
                <li>Alto contraste</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Funcionalidades</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tutorial do ProAut</li>
                <li>Artefatos do ProAut</li>
                <li>Padrões de Design DPAut</li>
                <li>Busca por Recomendações</li>
                <li>Sistema colaborativo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
