// Forbidden.tsx
// Página de erro 403 (Acesso Negado)
// Exibida quando o usuário tenta acessar uma rota ou recurso sem as permissões adequadas.

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";

/**
 * 🚫 Componente de página "403 - Forbidden"
 * Mostra uma mensagem de acesso negado e um botão para retornar à página inicial.
 */
export default function Forbidden() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          {/* Ícone de alerta */}
          <div className="mx-auto mb-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>

          {/* Título e descrição */}
          <CardTitle className="text-2xl">
            403 - {t("pages.forbidden")}
          </CardTitle>
          <CardDescription>{t("pages.forbiddenMessage")}</CardDescription>
        </CardHeader>

        {/* Botão para retornar */}
        <CardContent>
          <Button onClick={() => navigate("/")} className="w-full">
            {t("common.back")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
