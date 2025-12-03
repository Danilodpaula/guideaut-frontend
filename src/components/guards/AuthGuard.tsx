// ============================================================
// 🔒 COMPONENTE: AuthGuard
// ============================================================
// Este componente atua como um **guardião de rota** (route guard),
// controlando o acesso a páginas e componentes com base na autenticação
// e nas permissões do usuário (papel/role).
//
// Ele impede que usuários não autenticados ou sem o papel necessário
// acessem rotas protegidas, redirecionando-os automaticamente.
// ============================================================

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthContext"; // Hook de autenticação customizado

// ------------------------------------------------------------
// 📘 Interface de propriedades
// ------------------------------------------------------------
interface AuthGuardProps {
  /** Conteúdo (componentes/rotas) que o guard deve proteger */
  children: ReactNode;

  /** Papel necessário para acessar a rota (ex: 'ADMIN') */
  requiredRole?: string;

  /** Indica se a rota requer autenticação (default: true) */
  requireAuth?: boolean;
}

// ------------------------------------------------------------
// 🧩 Componente principal
// ------------------------------------------------------------
export const AuthGuard = ({
  children,
  requiredRole,
  requireAuth = true,
}: AuthGuardProps) => {
  // Obtém informações de autenticação do contexto
  const { isAuthenticated, isLoading, can } = useAuth();

  // ------------------------------------------------------------
  // 🕑 Estado de carregamento
  // ------------------------------------------------------------
  // Enquanto o contexto de autenticação está carregando (por exemplo,
  // verificando token ou sessão no Supabase), mostra um spinner.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          {/* Spinner animado */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // 🚫 Caso 1: Rota requer autenticação, mas o usuário não está logado
  // ------------------------------------------------------------
  // Redireciona o usuário para a página de login.
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ------------------------------------------------------------
  // 🚫 Caso 2: Rota requer papel específico (role) e o usuário não o possui
  // ------------------------------------------------------------
  // Usa o método `can()` do contexto para verificar permissões.
  if (requiredRole && !can(requiredRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  // ------------------------------------------------------------
  // ✅ Caso 3: Acesso permitido
  // ------------------------------------------------------------
  // Renderiza normalmente o conteúdo protegido.
  return <>{children}</>;
};
