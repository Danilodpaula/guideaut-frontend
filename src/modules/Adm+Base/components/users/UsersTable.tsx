// components/UsersTable.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Archive,
  KeyRound,
  Loader2,
  Pencil,
} from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { Status, User } from "../../services/userAdminService";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  actionLoadingId: string | null | undefined;
  onActivate: (user: User) => void;
  onBlock: (user: User) => void;
  onArchive: (user: User) => void;
  onEditRoles: (user: User) => void;
  onResetPassword: (user: User) => void;
}

export function UsersTable({
  users,
  loading,
  actionLoadingId,
  onActivate,
  onBlock,
  onArchive,
  onEditRoles,
  onResetPassword,
}: UsersTableProps) {
  const { t } = useI18n();

  const getStatusBadge = (status: Status) => {
    const variants: Record<
      Status,
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

  return (
    <TooltipProvider>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>{t("common.loading") || "Carregando..."}</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("auth.name") || "Nome"}</TableHead>
                  <TableHead>{t("auth.email") || "E-mail"}</TableHead>
                  <TableHead>{t("users.status") || "Status"}</TableHead>
                  <TableHead>{t("users.roles") || "Papéis"}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions") || "Ações"}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {user.roles.map((role) => (
                        <Badge key={role} variant="outline" className="mr-1">
                          {role}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.status !== "ACTIVE" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={!!actionLoadingId}
                                onClick={() => onActivate(user)}
                              >
                                {actionLoadingId === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t("users.activate") || "Ativar usuário"}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {user.status === "ACTIVE" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={!!actionLoadingId}
                                onClick={() => onBlock(user)}
                              >
                                {actionLoadingId === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <XCircle className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t("users.block") || "Bloquear usuário"}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={!!actionLoadingId}
                              onClick={() => onArchive(user)}
                            >
                              {actionLoadingId === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Archive className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("users.archive") || "Arquivar usuário"}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={!!actionLoadingId}
                              onClick={() => onEditRoles(user)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("users.editRoles") || "Editar papéis"}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={!!actionLoadingId}
                              onClick={() => onResetPassword(user)}
                            >
                              {actionLoadingId === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <KeyRound className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("users.resetPassword") || "Resetar senha"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {users.length === 0 && !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {t("common.noData") || "Nenhum usuário encontrado."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
