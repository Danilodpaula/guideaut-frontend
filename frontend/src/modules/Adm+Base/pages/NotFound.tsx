// NotFound.tsx
// Página de erro 404 – exibida quando o usuário tenta acessar uma rota inexistente.
// Registra o erro no console e fornece um link para retornar à página inicial.

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * 🚫 Componente de Página Não Encontrada (404)
 * Exibe uma mensagem amigável e um link para retornar à Home.
 */
const NotFound = () => {
  const location = useLocation();

  // Loga no console a rota inexistente acessada (útil para debug ou monitoramento)
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">
          Oops! Página não encontrada
        </p>
        <a
          href="/"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
