import { UserPlus } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { Button } from "@/components/ui/button";

interface UsersHeaderProps {
  onOpenCreate: () => void;
}

export function UsersHeader({ onOpenCreate }: UsersHeaderProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("users.title") || "Usuários"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("users.subtitle") || "Gerencie usuários, status e permissões"}
        </p>
      </div>
      <Button onClick={onOpenCreate}>
        <UserPlus className="mr-2 h-4 w-4" />
        {t("users.createUser") || "Criar usuário"}
      </Button>
    </div>
  );
}
