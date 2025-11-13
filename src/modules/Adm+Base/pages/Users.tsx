/* eslint-disable @typescript-eslint/no-explicit-any */
// Users.tsx
// Página de gerenciamento de usuários (GuideAut Admin)
// Integra com GET /admin/users (paginado). Requer ADMIN (garanta o guard na rota).

import { useEffect, useMemo, useState } from "react";
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
import {
  UserPlus,
  CheckCircle,
  XCircle,
  Archive,
  KeyRound,
  Loader2,
} from "lucide-react";
import api from "@/api/client";

// -----------------------------
// Tipos da API e da view
// -----------------------------
type Status = "PENDING" | "ACTIVE" | "BLOCKED" | "ARCHIVED";

interface ApiUser {
  id: string;
  nome: string;
  email: string;
  status: Status;
  roles: string[];
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página atual (0-based)
  size: number; // tamanho da página
  first: boolean;
  last: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: Status;
  roles: string[];
}

export default function Users() {
  const { t } = useI18n();

  // Filtros e busca (locais, aplicados sobre a página carregada)
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Paginação do servidor
  const [page, setPage] = useState(0); // 0-based
  const [size, setSize] = useState(10); // pode expor num Select se quiser
  const [sort] = useState("nome,asc"); // exemplo de ordenação por nome ASC

  // Dados da API
  const [rows, setRows] = useState<User[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Carrega a página do backend
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await api.get<Page<ApiUser>>("/admin/users", {
          params: { page, size, sort },
        });
        const data = res.data;

        setRows(
          data.content.map((u) => ({
            id: u.id,
            name: u.nome,
            email: u.email,
            status: u.status,
            roles: u.roles ?? [],
          })),
        );
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        toast.error(
          err?.response?.status === 403
            ? t("errors.forbidden") || "Acesso negado."
            : t("errors.generic") || "Erro ao carregar usuários.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page, size, sort, t]);

  // Filtros locais (aplicados nos itens da página atual)
  const filteredUsers = useMemo(() => {
    return rows.filter((user) => {
      const matchesStatus =
        statusFilter === "all" || user.status === (statusFilter as Status);
      const matchesRole =
        roleFilter === "all" || user.roles.includes(roleFilter);
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);
      return matchesStatus && matchesRole && matchesSearch;
    });
  }, [rows, statusFilter, roleFilter, searchTerm]);

  // Ações (mock visual por enquanto)
  const handleAction = (action: string, user: User) => {
    toast.success(`${action}: ${user.name}`);
  };

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

  // Controles simples de paginação
  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("users.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("users.subtitle") || "Gerencie usuários, status e permissões"}
          </p>
        </div>
        <Button onClick={() => toast.info(t("users.createUser"))}>
          <UserPlus className="mr-2 h-4 w-4" />
          {t("users.createUser")}
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>{t("common.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder={t("common.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

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

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>{t("common.loading")}</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("auth.name")}</TableHead>
                  <TableHead>{t("auth.email")}</TableHead>
                  <TableHead>{t("users.status")}</TableHead>
                  <TableHead>{t("users.roles")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user) => (
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
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleAction(t("users.activate"), user)
                            }
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

                {filteredUsers.length === 0 && (
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

      {/* Paginação simples */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalElements > 0
            ? `Página ${page + 1} de ${totalPages} • ${totalElements} usuários`
            : t("common.noData") || "Nenhum registro"}
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={String(size)}
            onValueChange={(v) => {
              setPage(0);
              setSize(Number(v));
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 / página</SelectItem>
              <SelectItem value="10">10 / página</SelectItem>
              <SelectItem value="20">20 / página</SelectItem>
              <SelectItem value="50">50 / página</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            disabled={!canPrev || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            disabled={!canNext || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
