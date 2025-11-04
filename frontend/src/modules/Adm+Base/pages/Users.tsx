// Users.tsx
// Página de gerenciamento de usuários (GuideAut Admin)
// Permite visualizar, filtrar e realizar ações básicas (ativar, bloquear, arquivar e redefinir senha).

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { UserPlus, CheckCircle, XCircle, Archive, KeyRound } from "lucide-react";

/**
 * Estrutura representando um usuário do sistema.
 */
interface User {
  id: string;
  name: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "BLOCKED" | "ARCHIVED";
  roles: string[];
}

/**
 * 👥 Componente principal da página de Usuários
 * Exibe lista de usuários com filtros e ações administrativas (mock local).
 */
export default function Users() {
  const { t } = useI18n();

  // Filtros e busca
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock de usuários (simulação local)
  const [users] = useState<User[]>([
    { id: "1", name: "Admin User", email: "admin@guideaut.com", status: "ACTIVE", roles: ["ADMIN"] },
    { id: "2", name: "Regular User", email: "user@guideaut.com", status: "ACTIVE", roles: ["USER"] },
    { id: "3", name: "João Silva", email: "joao@example.com", status: "PENDING", roles: ["USER"] },
    { id: "4", name: "Maria Santos", email: "maria@example.com", status: "BLOCKED", roles: ["USER"] },
    { id: "5", name: "Pedro Costa", email: "pedro@example.com", status: "ARCHIVED", roles: ["USER"] },
  ]);

  /**
   * ⚡ Manipula ações do administrador sobre o usuário (mock visual).
   */
  const handleAction = (action: string, user: User) => {
    toast.success(`${action}: ${user.name}`);
  };

  /**
   * 🏷️ Retorna o componente de status com cor e tradução apropriadas.
   */
  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      ACTIVE: "default",
      PENDING: "secondary",
      BLOCKED: "destructive",
      ARCHIVED: "outline",
    };
    return (
      <Badge variant={variants[status]}>
        {t(`users.${status.toLowerCase()}`)}
      </Badge>
    );
  };

  /**
   * 🔍 Aplica os filtros de status, papel e busca textual.
   */
  const filteredUsers = users.filter((user) => {
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesRole && matchesSearch;
  });

  /**
   * 🧭 Renderização principal da tela.
   */
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho e botão para novo usuário */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("users.title")}</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie usuários, status e permissões
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {t("users.createUser")}
        </Button>
      </div>

      {/* Filtros de busca e seleção */}
      <Card>
        <CardHeader>
          <CardTitle>{t("common.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Campo de busca */}
            <Input
              placeholder={t("common.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filtro de status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t("users.filterByStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ACTIVE">{t("users.active")}</SelectItem>
                <SelectItem value="PENDING">{t("users.pending")}</SelectItem>
                <SelectItem value="BLOCKED">{t("users.blocked")}</SelectItem>
                <SelectItem value="ARCHIVED">{t("users.archived")}</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro por papel */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t("users.filterByRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de usuários */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("auth.name")}</TableHead>
                <TableHead>{t("auth.email")}</TableHead>
                <TableHead>{t("users.status")}</TableHead>
                <TableHead>{t("users.roles")}</TableHead>
                <TableHead className="text-right">{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>

                  {/* Papéis do usuário */}
                  <TableCell>
                    {user.roles.map((role) => (
                      <Badge key={role} variant="outline" className="mr-1">
                        {role}
                      </Badge>
                    ))}
                  </TableCell>

                  {/* Ações administrativas */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {user.status !== "ACTIVE" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction(t("users.activate"), user)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === "ACTIVE" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction(t("users.block"), user)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction(t("users.archive"), user)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleAction(t("users.resetPassword"), user)
                        }
                      >
                        <KeyRound className="h-4 w-4" />
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
