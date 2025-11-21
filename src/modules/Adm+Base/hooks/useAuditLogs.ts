/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";
import {
  AuditLog,
  AuditQueryParams,
  fetchAuditLogs,
} from "../services/auditService";

interface UseAuditLogsParams extends AuditQueryParams {}

export function useAuditLogs(filters: UseAuditLogsParams) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchAuditLogs(filters);
      setLogs(data);
    } catch (err) {
      console.error("Erro ao buscar logs de auditoria:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters.startDate, filters.endDate, filters.event, filters.userEmail]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    logs,
    isLoading,
    error,
    refetch: load,
  };
}
