// Roles.tsx
// Página de gerenciamento de papéis e permissões (GuideAut Admin)
// Permite criar, editar e remover papéis, além de definir permissões associadas.

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { Shield, Pencil, Trash2 } from "lucide-react";

/**
 * Estrutura de permissões e papéis para controle de acesso do sistema.
 */
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  userCount: number;
}

/**
 * ⚙️ Componente principal de gerenciamento de papéis (roles)
 * Inclui mock local — futuramente pode ser substituído por integração com Supabase.
 */
export default function Roles() {
  const { t, language } = useI18n();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // 🔐 Lista de permissões disponíveis (mock)
  const availablePermissions: Permission[] = [
    {
      id: "users.view",
      name: language === "pt-BR" ? "Visualizar usuários" : "View users",
      description:
        language === "pt-BR" ? "Ver lista de usuários" : "View user list",
    },
    {
      id: "users.create",
      name: language === "pt-BR" ? "Criar usuários" : "Create users",
      description:
        language === "pt-BR" ? "Adicionar novos usuários" : "Add new users",
    },
    {
      id: "users.edit",
      name: language === "pt-BR" ? "Editar usuários" : "Edit users",
      description:
        language === "pt-BR"
          ? "Modificar dados de usuários"
          : "Modify user data",
    },
    {
      id: "users.delete",
      name: language === "pt-BR" ? "Excluir usuários" : "Delete users",
      description:
        language === "pt-BR"
          ? "Remover usuários do sistema"
          : "Remove users from system",
    },
    {
      id: "roles.manage",
      name: language === "pt-BR" ? "Gerenciar papéis" : "Manage roles",
      description:
        language === "pt-BR"
          ? "Criar e editar papéis"
          : "Create and edit roles",
    },
    {
      id: "categories.manage",
      name: language === "pt-BR" ? "Gerenciar categorias" : "Manage categories",
      description:
        language === "pt-BR" ? "CRUD de categorias" : "Category CRUD",
    },
    {
      id: "audit.view",
      name: language === "pt-BR" ? "Ver auditoria" : "View audit",
      description:
        language === "pt-BR" ? "Acessar logs do sistema" : "Access system logs",
    },
    {
      id: "import.data",
      name: language === "pt-BR" ? "Importar dados" : "Import data",
      description: language === "pt-BR" ? "Upload em lote" : "Bulk upload",
    },
  ];

  // 🧩 Papéis simulados
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "ADMIN",
      permissions: availablePermissions.map((p) => p.id),
      userCount: 2,
    },
    { id: "2", name: "USER", permissions: ["users.view"], userCount: 245 },
    {
      id: "3",
      name: "MODERATOR",
      permissions: ["users.view", "users.edit", "categories.manage"],
      userCount: 8,
    },
  ]);

  /**
   * ✏️ Abre o diálogo de criação ou edição de papel.
   */
  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setRoleName(role.name);
      setSelectedPermissions(role.permissions);
    } else {
      setEditingRole(null);
      setRoleName("");
      setSelectedPermissions([]);
    }
    setIsDialogOpen(true);
  };

  /**
   * 💾 Salva ou atualiza papel no mock local (futuro: integração real).
   */
  const handleSave = () => {
    if (editingRole) {
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, name: roleName, permissions: selectedPermissions }
            : r,
        ),
      );
      toast.success(t("roles.roleUpdated"));
    } else {
      const newRole: Role = {
        id: String(roles.length + 1),
        name: roleName,
        permissions: selectedPermissions,
        userCount: 0,
      };
      setRoles([...roles, newRole]);
      toast.success(t("roles.roleCreated"));
    }
    setIsDialogOpen(false);
  };

  /**
   * 🗑️ Exclui papel, caso não haja usuários vinculados.
   */
  const handleDelete = (role: Role) => {
    if (role.userCount > 0) {
      toast.error(
        language === "pt-BR"
          ? "Não é possível excluir papel com usuários atribuídos"
          : "Cannot delete role with assigned users",
      );
      return;
    }
    setRoles(roles.filter((r) => r.id !== role.id));
    toast.success(t("roles.roleDeleted"));
  };

  /**
   * ✅ Alterna uma permissão do papel em edição.
   */
  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId],
    );
  };

  /**
   * 🧭 Renderização principal da página de papéis.
   */
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho e botão para novo papel */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("roles.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "pt-BR"
              ? "Configure papéis e suas permissões"
              : "Configure roles and their permissions"}
          </p>
        </div>

        {/* Diálogo de criação/edição */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Shield className="mr-2 h-4 w-4" />
              {t("roles.createRole")}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? t("roles.editRole") : t("roles.createRole")}
              </DialogTitle>
              <DialogDescription>
                {language === "pt-BR"
                  ? "Defina o nome e as permissões do papel"
                  : "Define the role name and permissions"}
              </DialogDescription>
            </DialogHeader>

            {/* Formulário de edição/criação */}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">{t("auth.name")}</Label>
                <Input
                  id="role-name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder={
                    language === "pt-BR" ? "Ex: MODERATOR" : "e.g. MODERATOR"
                  }
                />
              </div>

              {/* Lista de permissões */}
              <div className="space-y-3">
                <Label>{t("roles.permissions")}</Label>
                <div className="space-y-3 border rounded-lg p-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start space-x-3 hover:bg-accent p-2 rounded transition-colors"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {permission.name}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ações do diálogo */}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleSave} disabled={!roleName.trim()}>
                {t("common.save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabela de papéis */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("auth.name")}</TableHead>
                <TableHead>{t("roles.permissions")}</TableHead>
                <TableHead>
                  {language === "pt-BR" ? "Usuários" : "Users"}
                </TableHead>
                <TableHead className="text-right">
                  {t("common.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="hover-scale">
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permId) => (
                        <span
                          key={permId}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {
                            availablePermissions
                              .find((p) => p.id === permId)
                              ?.name.split(" ")[0]
                          }
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{role.permissions.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDialog(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(role)}
                        disabled={role.userCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
