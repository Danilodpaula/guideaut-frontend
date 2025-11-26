import { useState } from "react";

import { User } from "../services/userAdminService";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { UsersHeader } from "../components/users/UsersHeader";
import { UsersFilters } from "../components/users/UsersFilters";
import { UsersTable } from "../components/users/UsersTable";
import { UsersPagination } from "../components/users/UsersPagination";
import { EditRolesDialog } from "../components/users/EditRolesDialog";
import { CreateUserDialog } from "../components/users/CreateUserDialog";

export default function UsersPage() {
  const {
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    size,
    setSize,
    totalElements,
    totalPages,
    canPrev,
    canNext,
    filteredUsers,
    loading,
    actionLoadingId,
    activateUser,
    blockUser,
    archiveUser,
    resetUserPassword,
    updateUserRoles,
    createUserFromAdmin,
  } = useAdminUsers();

  const [rolesDialogOpen, setRolesDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleOpenEditRoles = (user: User) => {
    setSelectedUser(user);
    setRolesDialogOpen(true);
  };

  const handleSaveRoles = async (roles: string[]) => {
    if (!selectedUser) return;
    await updateUserRoles(selectedUser.id, roles);
    setRolesDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCreateUser = async (params: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => {
    setCreateLoading(true);
    try {
      await createUserFromAdmin(params);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Cabeçalho */}
      <UsersHeader onOpenCreate={() => setCreateDialogOpen(true)} />

      {/* Filtros */}
      <UsersFilters
        statusFilter={statusFilter}
        roleFilter={roleFilter}
        searchTerm={searchTerm}
        onStatusChange={setStatusFilter}
        onRoleChange={setRoleFilter}
        onSearchChange={setSearchTerm}
      />

      {/* Tabela */}
      <UsersTable
        users={filteredUsers}
        loading={loading}
        actionLoadingId={actionLoadingId}
        onActivate={activateUser}
        onBlock={blockUser}
        onArchive={archiveUser}
        onEditRoles={handleOpenEditRoles}
        onResetPassword={resetUserPassword}
      />

      {/* Paginação */}
      <UsersPagination
        page={page}
        size={size}
        totalElements={totalElements}
        totalPages={totalPages}
        canPrev={canPrev}
        canNext={canNext}
        loading={loading}
        onChangeSize={(newSize) => {
          setPage(0);
          setSize(newSize);
        }}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* Modal de edição de roles */}
      <EditRolesDialog
        open={rolesDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setRolesDialogOpen(false);
            setSelectedUser(null);
          } else {
            setRolesDialogOpen(true);
          }
        }}
        user={selectedUser}
        loading={!!selectedUser && actionLoadingId === selectedUser.id}
        onSave={handleSaveRoles}
      />

      {/* Modal de criação de usuário */}
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        loading={createLoading}
        onCreate={handleCreateUser}
      />
    </div>
  );
}
