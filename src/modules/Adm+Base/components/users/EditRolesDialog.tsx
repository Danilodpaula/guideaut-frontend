import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "../../services/userAdminService";

interface EditRolesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  loading: boolean;
  onSave: (roles: string[]) => Promise<void>;
}

export function EditRolesDialog({
  open,
  onOpenChange,
  user,
  loading,
  onSave,
}: EditRolesDialogProps) {
  const { t } = useI18n();
  const [adminChecked, setAdminChecked] = useState(false);
  const [userChecked, setUserChecked] = useState(true);

  useEffect(() => {
    if (user) {
      setAdminChecked(user.roles.includes("ADMIN"));
      setUserChecked(user.roles.includes("USER"));
    } else {
      setAdminChecked(false);
      setUserChecked(true);
    }
  }, [user, open]);

  const handleConfirm = async () => {
    if (!user) return;

    const baseRoles = user.roles ?? [];
    const otherRoles = baseRoles.filter((r) => r !== "ADMIN" && r !== "USER");

    const nextRoles: string[] = [
      ...otherRoles,
      ...(userChecked ? ["USER"] : []),
      ...(adminChecked ? ["ADMIN"] : []),
    ];

    if (!nextRoles.length) {
      toast.error(
        t("users.rolesMustHaveAtLeastOne") || "Selecione pelo menos um papel.",
      );
      return;
    }

    await onSave(nextRoles);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("users.editRoles") || "Editar papéis do usuário"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? `${user.name} (${user.email})`
              : t("users.noUserSelected") || "Nenhum usuário selecionado."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="role-user"
              checked={userChecked}
              onCheckedChange={(v) => setUserChecked(v === true)}
            />
            <label
              htmlFor="role-user"
              className="text-sm font-medium leading-none"
            >
              USER
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="role-admin"
              checked={adminChecked}
              onCheckedChange={(v) => setAdminChecked(v === true)}
            />
            <label
              htmlFor="role-admin"
              className="text-sm font-medium leading-none"
            >
              ADMIN
            </label>
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
          <Button onClick={handleConfirm} disabled={loading || !user}>
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
