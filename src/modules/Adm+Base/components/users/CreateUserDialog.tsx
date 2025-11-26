import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/core/i18n/I18nContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  onCreate: (params: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => Promise<void>;
}

export function CreateUserDialog({
  open,
  onOpenChange,
  loading,
  onCreate,
}: CreateUserDialogProps) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userChecked, setUserChecked] = useState(true);
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setPassword("");
      setUserChecked(true);
      setAdminChecked(false);
    }
  }, [open]);

  const canSave =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    (userChecked || adminChecked);

  const handleConfirm = async () => {
    if (!canSave) {
      toast.error(
        t("users.fillAllFieldsAndRoles") ||
          "Preencha todos os campos e selecione pelo menos um papel.",
      );
      return;
    }

    const roles: string[] = [
      ...(userChecked ? ["USER"] : []),
      ...(adminChecked ? ["ADMIN"] : []),
    ];

    await onCreate({
      name: name.trim(),
      email: email.trim(),
      password,
      roles,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("users.createUserTitle") || "Criar novo usuário"}
          </DialogTitle>
          <DialogDescription>
            {t("users.createUserDescription") ||
              "Preencha os dados do usuário e selecione os papéis."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="new-user-name">
              {t("users.nameLabel") || "Nome"}
            </Label>
            <Input
              id="new-user-name"
              placeholder={t("users.namePlaceholder") || "Nome completo"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-user-email">
              {t("users.emailLabel") || "E-mail"}
            </Label>
            <Input
              id="new-user-email"
              type="email"
              placeholder={t("users.emailPlaceholder") || "email@exemplo.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-user-password">
              {t("users.passwordLabel") || "Senha"}
            </Label>
            <Input
              id="new-user-password"
              type="password"
              placeholder={
                t("users.passwordPlaceholder") || "Defina uma senha temporária"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              {t("users.rolesLabel") || "Papéis"}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-role-user"
                  checked={userChecked}
                  onCheckedChange={(v) => setUserChecked(v === true)}
                />
                <label
                  htmlFor="new-role-user"
                  className="text-sm font-medium leading-none"
                >
                  USER
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-role-admin"
                  checked={adminChecked}
                  onCheckedChange={(v) => setAdminChecked(v === true)}
                />
                <label
                  htmlFor="new-role-admin"
                  className="text-sm font-medium leading-none"
                >
                  ADMIN
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t("common.cancel") || "Cancelar"}
          </Button>
          <Button onClick={handleConfirm} disabled={loading || !canSave}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>{t("common.save") || "Salvar"}</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
