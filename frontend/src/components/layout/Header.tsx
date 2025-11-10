// ============================================================
// 🧭 COMPONENTE: Header
// ============================================================
// Este componente representa o **cabeçalho fixo** da aplicação GuideAut.
// Ele inclui:
// - O botão para abrir/fechar a Sidebar (menu lateral);
// - O logotipo/título do sistema;
// - Controles de acessibilidade e personalização (idioma e tema);
// - O menu do usuário autenticado (perfil, configurações e logout).
// ============================================================

import { Moon, Sun, Globe, User, Settings, LogOut } from "lucide-react"; // Ícones
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/core/theme/ThemeContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { useAuth } from "@/core/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

// ✅ Importa o logo SVG
import GuideAutLogo from "@/assets/base.svg";

// ------------------------------------------------------------
// 🧩 Componente principal
// ------------------------------------------------------------
export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Botão para abrir/fechar a Sidebar */}
        <SidebarTrigger />

        {/* Logo + nome do app */}
        <div className="flex items-center gap-2 flex-1">
          <img
            src={GuideAutLogo}
            alt="GuideAut logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold text-primary tracking-tight">
            GuideAut
          </h1>
        </div>

        {/* Ações do cabeçalho */}
        <div className="flex items-center gap-2">
          {/* 🌐 Seletor de idioma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("nav.settings")}>
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("pt-BR")}>
                🇧🇷 Português
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en-US")}>
                🇺🇸 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ☀️🌙 Alternar tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("accessibility.theme")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* 👤 Menu do usuário */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t("nav.profile")}>
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/me")}>
                  <User className="mr-2 h-4 w-4" />
                  {t("nav.profile")}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/settings/accessibility")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t("nav.accessibility")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/login")} variant="default">
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
