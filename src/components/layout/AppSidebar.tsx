// src/components/layout/AppSidebar.tsx
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
  Code2, // 👈 novo ícone
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";

export function AppSidebar() {
  const { state } = useSidebar();
  const { t } = useI18n();
  const { can, isAuthenticated } = useAuth();

  console.log('can("ADMIN")', can("ADMIN"));

  const mainItems = [
    { title: t("nav.home"), url: "/", icon: Home },
    { title: t("nav.proaut"), url: "/proaut-process", icon: BookOpen },
    {
      title: t("nav.recommendations"),
      url: "/recommendations",
      icon: Lightbulb,
    },
    { title: t("nav.patterns"), url: "/design-patterns", icon: Palette },
    { title: t("nav.artifacts"), url: "/artifacts", icon: FileTextIcon },
    { title: t("nav.developers"), url: "/developers", icon: Code2 }, // 👈 NOVO ITEM
    { title: t("nav.help"), url: "/help", icon: HelpCircle },
    { title: t("nav.search"), url: "/search", icon: Search },
  ];

  const adminItems = [
    { title: t("nav.users"), url: "/admin/users", icon: Users },
    { title: t("nav.roles"), url: "/admin/roles", icon: Shield },
    { title: t("nav.categories"), url: "/admin/categories", icon: FolderTree },
    { title: t("nav.audit"), url: "/admin/audit", icon: FileText },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
