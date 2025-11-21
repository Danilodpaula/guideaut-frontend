import api from "@/api/client";

export type AuditSeverity = "info" | "warning" | "error";

export interface AuditLog {
  id: string;
  event: string;
  user: string | null;
  ip: string | null;
  userAgent: string | null;
  details: string | null;
  timestamp: string; // ISO string
  severity: AuditSeverity;
}

export interface AuditQueryParams {
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  event?: string; // LOGIN_SUCCESS, USER_CREATED, etc.
  userEmail?: string; // se quiser aplicar no back
}

/**
 * Busca logs de auditoria no backend.
 */
export async function fetchAuditLogs(
  params: AuditQueryParams,
): Promise<AuditLog[]> {
  const res = await api.get<AuditLog[]>("/audit/logs", { params });
  return res.data;
}
