// ============================================================
// 🧭 COMPONENTE: AppSidebar
// ============================================================
// Este componente define a **barra lateral de navegação (Sidebar)** 
// do sistema GuideAut. Ela organiza os links principais (públicos)
// e administrativos (restritos a usuários com papel ADMIN) usando
// os componentes de sidebar do shadcn/ui.
// ============================================================

import {
  Home,
  HelpCircle,
  Search,
  Users,
  Shield,
  FolderTree,
  FileText,
  BookOpen,
  Lightbulb,
  Palette,
  FileText as FileTextIcon,
} from "lucide-react"; // Ícones do Lucide
import { NavLink } from "react-router-dom"; // Para navegação entre rotas

// Componentes de UI da Sidebar (baseados no shadcn/ui)
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useI18n } from "@/core/i18n/I18nContext"; // Contexto de tradução (i18n)
import { useAuth } from "@/core/auth/AuthContext"; // Contexto de autenticação

// ------------------------------------------------------------
// 🧩 Componente principal
// ------------------------------------------------------------
export function AppSidebar() {
  const { state } = useSidebar(); // Estado de colapso/expansão da sidebar
  const { t } = useI18n(); // Função de tradução
  const { can, isAuthenticated } = useAuth(); // Verifica autenticação e permissões

  // ------------------------------------------------------------
  // 📂 Itens principais (visíveis a todos os usuários)
  // ------------------------------------------------------------
  const mainItems = [
    { title: t("nav.home"), url: "/", icon: Home },
    { title: t("nav.proaut"), url: "/proaut-process", icon: BookOpen },
    { title: t("nav.recommendations"), url: "/recommendations", icon: Lightbulb },
    { title: t("nav.patterns"), url: "/design-patterns", icon: Palette },
    { title: t("nav.artifacts"), url: "/artifacts", icon: FileTextIcon },
    { title: t("nav.help"), url: "/help", icon: HelpCircle },
    { title: t("nav.search"), url: "/search", icon: Search },
  ];

  // ------------------------------------------------------------
  // 🔒 Itens administrativos (visíveis apenas para ADMIN)
  // ------------------------------------------------------------
  const adminItems = [
    { title: t("nav.users"), url: "/admin/users", icon: Users },
    { title: t("nav.roles"), url: "/admin/roles", icon: Shield },
    { title: t("nav.categories"), url: "/admin/categories", icon: FolderTree },
    { title: t("nav.audit"), url: "/admin/audit", icon: FileText },
  ];

  // ------------------------------------------------------------
  // 🧱 Estrutura visual da Sidebar
  // ------------------------------------------------------------
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Grupo principal: navegação geral */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Renderiza cada item principal */}
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo administrativo: apenas para usuários autenticados e com papel ADMIN */}
        {isAuthenticated && can("ADMIN") && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("nav.administration")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}