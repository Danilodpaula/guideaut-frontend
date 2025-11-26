/* eslint-disable @typescript-eslint/no-explicit-any */
// useAdminUsers.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  fetchUsersPage,
  patchUserStatus,
  postResetPassword,
  patchUserRoles,
  createUser,
  ApiUser,
  Page,
  Status,
  User,
} from "../services/userAdminService";

function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    name: apiUser.nome,
    email: apiUser.email,
    status: apiUser.status,
    roles: apiUser.roles ?? [],
  };
}

export interface NewUserData {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export function useAdminUsers() {
  const { t } = useI18n();

  // Filtros e busca
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Paginação
  const [page, setPage] = useState(0); // 0-based
  const [size, setSize] = useState(10);
  const [sort] = useState("nome,asc");

  // Dados
  const [rows, setRows] = useState<User[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Loading
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Carrega página do backend
  const fetchPage = useCallback(async () => {
    setLoading(true);
    try {
      const data: Page<ApiUser> = await fetchUsersPage({ page, size, sort });

      setRows(data.content.map(mapApiUserToUser));
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
  }, [page, size, sort, t]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // Filtros locais (em cima da página atual)
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

  // Ações de status
  const activateUser = useCallback(
    async (user: User) => {
      setActionLoadingId(user.id);
      try {
        await patchUserStatus(user.id, "ACTIVE");
        toast.success(`${t("users.activate") ?? "Ativar"}: ${user.name}`);
        await fetchPage();
      } catch {
        toast.error(t("errors.generic") || "Erro ao ativar usuário.");
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchPage, t],
  );

  const blockUser = useCallback(
    async (user: User) => {
      setActionLoadingId(user.id);
      try {
        await patchUserStatus(user.id, "BLOCKED");
        toast.success(`${t("users.block") ?? "Bloquear"}: ${user.name}`);
        await fetchPage();
      } catch {
        toast.error(t("errors.generic") || "Erro ao bloquear usuário.");
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchPage, t],
  );

  const archiveUser = useCallback(
    async (user: User) => {
      setActionLoadingId(user.id);
      try {
        await patchUserStatus(user.id, "ARCHIVED");
        toast.success(`${t("users.archive") ?? "Arquivar"}: ${user.name}`);
        await fetchPage();
      } catch {
        toast.error(t("errors.generic") || "Erro ao arquivar usuário.");
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchPage, t],
  );

  const resetUserPassword = useCallback(
    async (user: User) => {
      setActionLoadingId(user.id);
      try {
        await postResetPassword(user.id);
        toast.success(
          `${t("users.resetPassword") ?? "Resetar senha"}: ${user.name}`,
        );
      } catch {
        toast.error(t("errors.generic") || "Erro ao resetar senha do usuário.");
      } finally {
        setActionLoadingId(null);
      }
    },
    [t],
  );

  const updateUserRoles = useCallback(
    async (userId: string, roles: string[]) => {
      setActionLoadingId(userId);
      try {
        await patchUserRoles(userId, roles);
        toast.success(
          t("users.rolesUpdated") || "Papéis atualizados com sucesso.",
        );
        await fetchPage();
      } catch {
        toast.error(
          t("errors.generic") || "Erro ao atualizar papéis do usuário.",
        );
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchPage, t],
  );

  // Criar usuário + ajustar roles (incluindo ADMIN)
  const createUserFromAdmin = useCallback(
    async (data: NewUserData) => {
      const { name, email, password, roles } = data;
      try {
        const created = await createUser({
          nome: name,
          email,
          password,
        });

        // Se definiu explicitamente roles no formulário, sobrescreve com elas
        if (roles && roles.length > 0) {
          await patchUserRoles(created.id, roles);
        }

        toast.success(t("users.created") || "Usuário criado com sucesso.");
        await fetchPage();
      } catch {
        toast.error(t("errors.generic") || "Erro ao criar usuário.");
        throw new Error("createUserFailed");
      }
    },
    [fetchPage, t],
  );

  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  return {
    // filtros
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    searchTerm,
    setSearchTerm,

    // paginação
    page,
    setPage,
    size,
    setSize,
    sort,
    totalElements,
    totalPages,
    canPrev,
    canNext,

    // dados
    rows,
    filteredUsers,

    // loading
    loading,
    actionLoadingId,

    // ações
    activateUser,
    blockUser,
    archiveUser,
    resetUserPassword,
    updateUserRoles,
    createUserFromAdmin,
    reload: fetchPage,
  };
}

export type { Status, User };
