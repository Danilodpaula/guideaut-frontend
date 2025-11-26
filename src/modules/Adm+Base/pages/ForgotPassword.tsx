/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { forgotPasswordApi, resetPasswordWithCodeApi } from "@/api/authService";

type Step = "request" | "reset";

export default function ForgotPassword() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("request");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------------------------
  // Passo 1 — solicitar envio do código por e-mail
  // --------------------------------------------------
  const handleRequestCode = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error(t("auth.invalidCredentials") || "Informe um e-mail válido.");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi({ email });
      toast.success(
        t("auth.forgotPasswordEmailSent") ||
          "Se o e-mail existir, enviamos um código de verificação.",
      );
      setStep("reset");
    } catch (err: any) {
      console.error(err);
      toast.error(
        t("auth.forgotPasswordError") ||
          "Erro ao solicitar redefinição de senha. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // Passo 2 — enviar código + nova senha
  // --------------------------------------------------
  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!code) {
      toast.error(
        t("auth.resetCodeRequired") || "Informe o código recebido por e-mail.",
      );
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t("auth.passwordTooShort"));
      return;
    }

    if (newPassword !== confirm) {
      toast.error(t("auth.passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordWithCodeApi({
        email,
        code,
        newPassword,
      });

      toast.success(
        t("auth.resetPasswordSuccess") ||
          "Senha redefinida com sucesso! Você já pode fazer login.",
      );
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message;

      if (message && message.toLowerCase().includes("código inválido")) {
        toast.error(
          t("auth.resetPasswordInvalidCode") ||
            "Código inválido ou expirado. Solicite um novo código.",
        );
      } else {
        toast.error(
          t("auth.resetPasswordError") ||
            "Erro ao redefinir senha. Tente novamente.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            {step === "request"
              ? t("auth.forgotPasswordTitle") || "Esqueci minha senha"
              : t("auth.resetPasswordTitle") || "Redefinir senha"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "request"
              ? t("auth.forgotPasswordSubtitle") ||
                "Informe seu e-mail e enviaremos um código para redefinir sua senha."
              : t("auth.resetPasswordSubtitle") ||
                "Digite o código recebido por e-mail e escolha uma nova senha."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "request" && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email") || "E-mail"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading
                  ? t("common.loading") || "Carregando..."
                  : t("auth.sendResetCode") || "Enviar código"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={goBackToLogin}
                disabled={isLoading}
              >
                {t("auth.backToLogin") || "Voltar para o login"}
              </Button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email") || "E-mail"}</Label>
                <Input id="email" type="email" value={email} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">
                  {t("auth.resetCodeLabel") || "Código de verificação"}
                </Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t("auth.resetCodePlaceholder") || "Ex: 123456"}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  {t("auth.password") || "Nova senha"}
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">
                  {t("auth.confirmPassword") || "Confirmar senha"}
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? t("common.loading") || "Carregando..."
                  : t("auth.resetPasswordAction") || "Redefinir senha"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={goBackToLogin}
                disabled={isLoading}
              >
                {t("auth.backToLogin") || "Voltar para o login"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
