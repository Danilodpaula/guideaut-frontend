// Signup.tsx
// Página de cadastro de novos usuários no GuideAut.
// Permite criar conta com nome, e-mail e senha, incluindo verificação de confirmação de senha.
// Integra-se com o contexto de autenticação (AuthContext) e utiliza mensagens multilíngues.

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

export default function Signup() {
  // Estados para controlar os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks de autenticação e tradução
  const { signup, isAuthenticated } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  // Se o usuário já estiver logado, redireciona para a página inicial
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /**
   * Função de envio do formulário de cadastro.
   * - Valida campos de senha
   * - Chama o método signup do contexto
   * - Exibe feedback via toast
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validação: senhas devem coincidir
    if (password !== confirmPassword) {
      toast.error(t("auth.passwordsDoNotMatch"));
      return;
    }

    // Validação: senha deve ter tamanho mínimo
    if (password.length < 6) {
      toast.error(t("auth.passwordTooShort"));
      return;
    }

    setIsLoading(true);

    try {
      // Cria a conta via contexto de autenticação
      await signup({ name, email, password });

      toast.success(t("auth.signupSuccess"));
      navigate("/"); // Redireciona para home após sucesso
    } catch (error: any) {
      // Tratamento de erros comuns
      if (error.message?.includes("already registered")) {
        toast.error(t("auth.emailAlreadyExists"));
      } else {
        toast.error(t("auth.signupError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        {/* Cabeçalho do card com título e subtítulo */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            GuideAut
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.createAccount")}
          </CardDescription>
        </CardHeader>

        {/* Corpo do formulário */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo: Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("auth.name")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t("auth.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* Campo: E-mail */}
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

            {/* Campo: Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            {/* Campo: Confirmar senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("auth.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            {/* Botão de envio */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("auth.signup")}
            </Button>
          </form>

          {/* Link para login (usuário já possui conta) */}
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
            </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              {t("auth.login")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
