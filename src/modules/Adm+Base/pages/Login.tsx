/* eslint-disable @typescript-eslint/no-explicit-any */
// Login.tsx
// Página de autenticação do GuideAut
// Login e Cadastro (na mesma tela) com tabs

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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";

import GuideAutLogo from "@/assets/base.svg";

export default function Login() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  // estados - login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  // estados - signup
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);

  const { login, signup, isAuthenticated } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  // Redireciona se já autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /**
   * 🎯 Lida com o envio do formulário de login.
   * - Chama a função `login()` do AuthContext
   * - Exibe feedback via toast
   * - Redireciona para Home em caso de sucesso
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("auth.invalidCredentials"));
      return;
    }

    setIsLoadingLogin(true);
    try {
      await login({ email, password });
      toast.success(t("auth.loginSuccess"));
      navigate("/", { replace: true });
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 403) {
        // Usuário bloqueado / arquivado / pendente
        toast.error(
          t("auth.userNotActive") ||
            "Seu usuário está bloqueado ou inativo. Entre em contato com o administrador.",
        );
      } else if (status === 401) {
        // Credenciais inválidas
        toast.error(
          t("auth.invalidCredentials") || "E-mail ou senha inválidos.",
        );
      } else {
        // Erro genérico (rede, servidor, etc.)
        toast.error(
          t("errors.generic") ||
            "Erro ao fazer login. Tente novamente em instantes.",
        );
      }
    } finally {
      setIsLoadingLogin(false);
    }
  };

  // Submit: Signup
  const handleSubmitSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password2 !== confirm)
      return toast.error(t("auth.passwordsDoNotMatch"));
    if (password2.length < 6) return toast.error(t("auth.passwordTooShort"));

    setIsLoadingSignup(true);
    try {
      await signup({ name, email: email2, password: password2 });
      toast.success(t("auth.signupSuccess"));
      navigate("/", { replace: true });
    } catch (err: any) {
      if (err?.message === "email_exists")
        toast.error(t("auth.emailAlreadyExists"));
      else toast.error(t("auth.signupError"));
    } finally {
      setIsLoadingSignup(false);
    }
  };

  // Acesso visitante
  const handleGuestAccess = () => {
    toast.info(t("auth.continueAsGuestMessage"));
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          {/* 🔹 Logo + nome lado a lado */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={GuideAutLogo}
              alt="GuideAut logo"
              className="h-9 w-9 object-contain"
            />
            <CardTitle className="text-2xl font-bold text-center text-primary">
              GuideAut
            </CardTitle>
          </div>

          <CardDescription className="text-center mt-1">
            {tab === "login" ? t("auth.login") : t("auth.createAccount")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signup")}</TabsTrigger>
            </TabsList>

            {/* ======== LOGIN ======== */}
            <TabsContent value="login" className="mt-4">
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
                    disabled={isLoadingLogin || isLoadingSignup}
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
                    disabled={isLoadingLogin || isLoadingSignup}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoadingLogin || isLoadingSignup}
                >
                  {isLoadingLogin ? t("common.loading") : t("auth.login")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGuestAccess}
                  disabled={isLoadingLogin || isLoadingSignup}
                  aria-label="Acessar como visitante"
                >
                  {t("auth.continueAsGuest")}
                </Button>

                <div className="mt-2 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setTab("signup")}
                    className="text-primary hover:underline"
                  >
                    {t("auth.createAccount")}
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
              </form>
            </TabsContent>

            {/* ======== SIGNUP ======== */}
            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSubmitSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("auth.name")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("auth.namePlaceholder")}
                    required
                    disabled={isLoadingLogin || isLoadingSignup}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email2">{t("auth.email")}</Label>
                  <Input
                    id="email2"
                    type="email"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    required
                    disabled={isLoadingLogin || isLoadingSignup}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password2">{t("auth.password")}</Label>
                  <Input
                    id="password2"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    autoComplete="new-password"
                    required
                    disabled={isLoadingLogin || isLoadingSignup}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">{t("auth.confirmPassword")}</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                    disabled={isLoadingLogin || isLoadingSignup}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoadingLogin || isLoadingSignup}
                >
                  {isLoadingSignup ? t("common.loading") : t("auth.signup")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGuestAccess}
                  disabled={isLoadingLogin || isLoadingSignup}
                >
                  {t("auth.continueAsGuest")}
                </Button>

                <div className="mt-2 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="text-primary hover:underline"
                  >
                    {t("auth.alreadyHaveAccount")}
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
