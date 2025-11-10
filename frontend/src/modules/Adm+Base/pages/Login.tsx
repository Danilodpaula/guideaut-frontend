// Login.tsx
// Página de autenticação do GuideAut
// Permite ao usuário acessar a plataforma com e-mail e senha.
// Inclui redirecionamento automático para a Home se já estiver autenticado.

import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";

/**
 * 🔐 Componente de Login
 * Responsável por autenticar o usuário e redirecioná-lo para a Home.
 * Exibe mensagens de erro e sucesso utilizando o sistema de toasts.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  // Caso o usuário já esteja autenticado, redireciona para a Home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /**
   * 🎯 Lida com o envio do formulário de login.
   * - Chama a função `login()` do AuthContext
   * - Exibe feedback via toast
   * - Redireciona para Home em caso de sucesso
   */
  // Em Login.tsx
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ==========================================================
    // 👇 ADICIONE ESTA VALIDAÇÃO AQUI 👇
    // ==========================================================
    if (!email || !password) {
      toast.error(t("auth.invalidCredentials")); // Mostra o erro
      return; // Para a execução da função aqui
    }
    // ==========================================================

    setIsLoading(true);

    try {
      await login({ email, password });
      toast.success(t("auth.loginSuccess"));
      navigate("/");
    } catch (error) {
      toast.error(t("auth.invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            GuideAut
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.login")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Formulário principal */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("auth.login")}
            </Button>
          </form>

          {/* Credenciais de demonstração */}
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Demo: <strong>admin@guideaut.com</strong> / 123456
            </p>
            <p className="text-muted-foreground mt-1">
              ou <strong>user@guideaut.com</strong> / 123456
            </p>
          </div>

          {/* Links adicionais */}
          <div className="mt-4 space-y-2 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-primary hover:underline"
            >
              {t("auth.signup")}
            </button>
            <br />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-muted-foreground hover:underline"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
