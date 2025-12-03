// App.tsx — Estrutura principal do GuideAut Frontend
// ---------------------------------------------------------------------------
// Este arquivo define o layout, provedores globais e rotas principais do app.
// Inclui provedores de tema, idioma, autenticação e gerenciamento de queries.
// ---------------------------------------------------------------------------

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { I18nProvider } from "@/core/i18n/I18nContext";
import { ThemeProvider } from "@/core/theme/ThemeContext";
import { AuthProvider } from "@/core/auth/AuthContext";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";

// Páginas principais
import Index from "./modules/Adm+Base/pages/Index";
import Login from "./modules/Adm+Base/pages/Login";
import Signup from "./modules/Adm+Base/pages/Signup";
import Forbidden from "./modules/Adm+Base/pages/Forbidden";
import Help from "./modules/Tutorial/Help";
import Search from "./modules/Adm+Base/pages/Search";
import ProAutProcess from "./modules/Tutorial/pages/ProAutProcess";
import ImersionPhase from "./modules/Tutorial/pages/ImersionPhase";
import AnalysisPhase from "./modules/Tutorial/pages/AnalysisPhase";
import IdeationPhase from "./modules/Tutorial/pages/IdeationPhase";
import PrototypingPhase from "./modules/Tutorial/pages/PrototypingPhase";
import Recommendations from "./modules/Recommendations/pages/Recommendations";
import DesignPatterns from "./modules/Artifacts/pages/DesignPatterns";
import Artifacts from "./modules/Artifacts/pages/Artifacts";
import Accessibility from "./modules/Adm+Base/pages/Accessibility";
import Users from "./modules/Adm+Base/pages/Users";
import Categories from "./modules/Adm+Base/pages/Categories";
import Audit from "./modules/Adm+Base/pages/Audit";
import Profile from "./modules/Adm+Base/pages/Profile";
import NotFound from "./modules/Adm+Base/pages/NotFound";
import { Footer } from "./components/layout/Footer";
import Persona from "./modules/Artifacts/pages/Persona";
import Canvas from "./modules/Artifacts/pages/Canvas";
import Script from "./modules/Artifacts/pages/Script";
import Empathy from "./modules/Artifacts/pages/Empathy";
import ScriptCreateForm from "./modules/Artifacts/pages/ScriptCreateForm";
import ScriptsMyScripts from "./modules/Artifacts/pages/ScriptsMyScripts";
import EmpathyCreateForm from "./modules/Artifacts/pages/EmpathyCreateForm";
import EmpathyEditForm from "./modules/Artifacts/pages/EmpathyEditForm";
import PersonaCreateForm from "./modules/Artifacts/pages/PersonaCreateForm";
import PersonaEditForm from "./modules/Artifacts/pages/PersonaEditForm";
import Developers from "./modules/Adm+Base/pages/Developers";
import Reports from "./modules/Adm+Base/pages/Reports";
import ForgotPassword from "./modules/Adm+Base/pages/ForgotPassword";

const queryClient = new QueryClient();

// ---------------------------------------------------------------------------
// Layout principal (Sidebar + Header + Conteúdo)
// Contém as rotas internas protegidas por AuthGuard.
// ---------------------------------------------------------------------------
const AppLayout = () => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Rotas gerais */}
            <Route index element={<Index />} />
            <Route path="proaut-process" element={<ProAutProcess />} />
            <Route path="imersion-phase" element={<ImersionPhase />} />
            <Route path="analysis-phase" element={<AnalysisPhase />} />
            <Route path="ideation-phase" element={<IdeationPhase />} />
            <Route path="prototyping-phase" element={<PrototypingPhase />} />
            <Route path="artifacts" element={<Artifacts />} />
            <Route path="design-patterns" element={<DesignPatterns />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="developers" element={<Developers />} />
            <Route path="search" element={<Search />} />
            <Route path="help" element={<Help />} />
            <Route path="me" element={<Profile />} />
            <Route path="settings/accessibility" element={<Accessibility />} />
            <Route path="empathy">
              <Route path="create" element={<EmpathyCreateForm />} />
              <Route path=":id">
                <Route index element={<Empathy />} />
                <Route path="update" element={<EmpathyEditForm />} />
              </Route>
            </Route>
            <Route path="persona">
              <Route path="create" element={<PersonaCreateForm />} />
              <Route path=":id">
                <Route index element={<Persona />} />
                <Route path="update" element={<PersonaEditForm />} />
              </Route>
            </Route>
            <Route path="script">
              <Route path="my-scripts" element={<ScriptsMyScripts />} />
              <Route path="create" element={<ScriptCreateForm />} />
              <Route path=":id">
                <Route path="edit" element={<Script />} />
              </Route>
            </Route>
            <Route path="canvas">
              <Route path=":id">
                <Route index element={<Canvas />} />
              </Route>
            </Route>
            {/* Rotas administrativas protegidas */}
            <Route
              path="admin/users"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <Users />
                </AuthGuard>
              }
            />
            <Route
              path="admin/categories"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <Categories />
                </AuthGuard>
              }
            />
            <Route
              path="admin/audit"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <Audit />
                </AuthGuard>
              }
            />
            <Route
              path="admin/reports"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <Reports />
                </AuthGuard>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  </SidebarProvider>
);

// ---------------------------------------------------------------------------
// App root — registra todos os provedores globais e define as rotas públicas.
// ---------------------------------------------------------------------------
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              {/* Toasters de UI (feedbacks visuais) */}
              <Toaster />
              <Sonner />

              {/* Rotas públicas e layout principal */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/*" element={<AppLayout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
