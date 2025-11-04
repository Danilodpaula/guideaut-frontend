// Accessibility.tsx
// Página de Configurações de Acessibilidade do sistema (GuideAut Base/Admin)
// Permite ao usuário ajustar tema, tamanho da fonte e reduzir animações visuais.

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/core/theme/ThemeContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { useEffect } from "react";

/**
 * 🎨 Componente de Acessibilidade
 * Permite personalizar preferências visuais como tema (claro/escuro),
 * tamanho da fonte e redução de movimento.
 * As preferências são persistidas pelo `ThemeContext`.
 */
export default function Accessibility() {
  const {
    theme,
    fontSize,
    reduceMotion,
    setTheme,
    setFontSize,
    setReduceMotion,
  } = useTheme();
  const { t } = useI18n();

  /**
   * Exibe notificação sempre que alguma configuração for alterada.
   */
  useEffect(() => {
    toast.success(t("accessibility.settingsSaved"));
  }, [theme, fontSize, reduceMotion]);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("accessibility.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Personalize a interface de acordo com suas necessidades
        </p>
      </div>

      {/* Configurações agrupadas em cartões */}
      <div className="grid gap-6">
        {/* Tema Claro/Escuro */}
        <Card>
          <CardHeader>
            <CardTitle>{t("accessibility.theme")}</CardTitle>
            <CardDescription>
              Escolha entre tema claro ou escuro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as "light" | "dark")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">{t("accessibility.themeLight")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">{t("accessibility.themeDark")}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Tamanho da Fonte */}
        <Card>
          <CardHeader>
            <CardTitle>{t("accessibility.fontSize")}</CardTitle>
            <CardDescription>
              Ajuste o tamanho do texto para melhor legibilidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={fontSize}
              onValueChange={(value) =>
                setFontSize(value as "sm" | "md" | "lg")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sm" id="sm" />
                <Label htmlFor="sm" className="text-sm">
                  {t("accessibility.fontSizeSmall")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="md" id="md" />
                <Label htmlFor="md">{t("accessibility.fontSizeMedium")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lg" id="lg" />
                <Label htmlFor="lg" className="text-lg">
                  {t("accessibility.fontSizeLarge")}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Reduzir Animações */}
        <Card>
          <CardHeader>
            <CardTitle>{t("accessibility.reduceMotion")}</CardTitle>
            <CardDescription>
              Minimize animações e transições para reduzir distrações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
              />
              <Label htmlFor="reduce-motion">
                {reduceMotion ? "Ativado" : "Desativado"}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
