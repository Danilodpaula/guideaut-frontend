// userAdminService.ts
import api from "@/api/client";

export type Status = "PENDING" | "ACTIVE" | "BLOCKED" | "ARCHIVED";

export interface ApiUser {
  id: string;
  nome: string;
  email: string;
  status: Status;
  roles: string[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página atual (0-based)
  size: number; // tamanho da página
  first: boolean;
  last: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: Status;
  roles: string[];
}

export type UserAction = "ACTIVATE" | "BLOCK" | "ARCHIVE" | "RESET_PASSWORD";

export interface FetchUsersParams {
  page: number;
  size: number;
  sort: string;
}

export interface CreateUserPayload {
  nome: string;
  email: string;
  password: string;
}

export async function fetchUsersPage(
  params: FetchUsersParams,
): Promise<Page<ApiUser>> {
  const { page, size, sort } = params;
  const res = await api.get<Page<ApiUser>>("/admin/users", {
    params: { page, size, sort },
  });
  return res.data;
}

export async function patchUserStatus(
  id: string,
  status: Status,
): Promise<void> {
  await api.patch(`/admin/users/${id}/status`, { status });
}

export async function postResetPassword(id: string): Promise<void> {
  await api.post(`/admin/users/${id}/reset-password`);
}

export async function patchUserRoles(
  id: string,
  roles: string[],
): Promise<void> {
  await api.patch(`/admin/users/${id}/roles`, { roles });
}

export async function createUser(payload: CreateUserPayload): Promise<ApiUser> {
  // POST /users (público, mas aqui usado pelo ADMIN)
  const res = await api.post<ApiUser>("/users", payload);
  return res.data;
}
