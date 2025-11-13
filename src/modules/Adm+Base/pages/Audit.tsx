// Audit.tsx
// Página de auditoria — exibe logs, filtros e exportações (mock local)

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FileText, Download, FileJson } from "lucide-react";

/**
 * Estrutura de um log de auditoria.
 */
interface AuditLog {
  id: string;
  event: string;
  user: string;
  userId: string;
  ip: string;
  userAgent: string;
  details: string;
  timestamp: string;
  severity: "info" | "warning" | "error";
}

/**
 * Página de auditoria (Audit)
 * Exibe registros de ações do sistema com filtros e exportação CSV/JSON.
 */
export default function Audit() {
  const { t, language } = useI18n();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  // 🔹 Mock de dados de auditoria (substituir futuramente por dados do backend)
  const auditLogs: AuditLog[] = [
    {
      id: "1",
      event: "LOGIN_SUCCESS",
      user: "Admin User",
      userId: "1",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0",
      details: "Successful login",
      timestamp: "2024-11-01T10:30:00",
      severity: "info",
    },
    {
      id: "2",
      event: "USER_CREATED",
      user: "Admin User",
      userId: "1",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0",
      details: "Created user: João Silva",
      timestamp: "2024-11-01T11:15:00",
      severity: "info",
    },
    {
      id: "3",
      event: "USER_BLOCKED",
      user: "Admin User",
      userId: "1",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0",
      details: "Blocked user: Maria Santos",
      timestamp: "2024-11-01T14:20:00",
      severity: "warning",
    },
    {
      id: "4",
      event: "LOGIN_FAILED",
      user: "Unknown",
      userId: "0",
      ip: "192.168.1.200",
      userAgent: "Mozilla/5.0",
      details: "Failed login attempt: invalid credentials",
      timestamp: "2024-11-01T15:45:00",
      severity: "error",
    },
    {
      id: "5",
      event: "ROLE_UPDATED",
      user: "Admin User",
      userId: "1",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0",
      details: "Updated role: MODERATOR",
      timestamp: "2024-11-01T16:30:00",
      severity: "info",
    },
    {
      id: "6",
      event: "DATA_IMPORTED",
      user: "Admin User",
      userId: "1",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0",
      details: "Imported 150 records from CSV",
      timestamp: "2024-11-01T17:00:00",
      severity: "info",
    },
  ];

  /**
   * 🔍 Filtros aplicados aos logs.
   */
  const filteredLogs = auditLogs.filter((log) => {
    const matchesUser = userFilter === "all" || log.userId === userFilter;
    const matchesEvent = eventFilter === "all" || log.event === eventFilter;
    const matchesDateRange =
      (!startDate || log.timestamp >= startDate) &&
      (!endDate || log.timestamp <= endDate);
    return matchesUser && matchesEvent && matchesDateRange;
  });

  /**
   * 📤 Exporta os logs filtrados em formato CSV.
   */
  const exportCSV = () => {
    const headers = ["Event", "User", "IP", "Details", "Timestamp"];
    const rows = filteredLogs.map((log) => [
      log.event,
      log.user,
      log.ip,
      log.details,
      new Date(log.timestamp).toLocaleString(language),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${Date.now()}.csv`;
    a.click();

    toast.success(
      language === "pt-BR"
        ? "CSV exportado com sucesso"
        : "CSV exported successfully",
    );
  };

  /**
   * 📦 Exporta os logs filtrados em formato JSON.
   */
  const exportJSON = () => {
    const json = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${Date.now()}.json`;
    a.click();

    toast.success(
      language === "pt-BR"
        ? "JSON exportado com sucesso"
        : "JSON exported successfully",
    );
  };

  /**
   * 🏷️ Define a cor da badge conforme a gravidade do log.
   */
  const getSeverityBadge = (severity: string) => {
    const variants = {
      info: "default",
      warning: "secondary",
      error: "destructive",
    };
    return (
      <Badge variant={variants[severity as keyof typeof variants] as any}>
        {severity}
      </Badge>
    );
  };

  /**
   * 🧭 Renderização principal da página de auditoria.
   */
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho e botões de exportação */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("audit.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === "pt-BR"
              ? "Registros de todas as ações do sistema"
              : "Records of all system actions"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" />
            {t("audit.exportCSV")}
          </Button>
          <Button variant="outline" onClick={exportJSON}>
            <FileJson className="mr-2 h-4 w-4" />
            {t("audit.exportJSON")}
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>{t("common.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Filtro por data inicial */}
            <div className="space-y-2">
              <Label htmlFor="start-date">{t("audit.startDate")}</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Filtro por data final */}
            <div className="space-y-2">
              <Label htmlFor="end-date">{t("audit.endDate")}</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Filtro por usuário */}
            <div className="space-y-2">
              <Label htmlFor="user-filter">{t("audit.filterByUser")}</Label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger id="user-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "pt-BR" ? "Todos" : "All"}
                  </SelectItem>
                  <SelectItem value="1">Admin User</SelectItem>
                  <SelectItem value="2">Regular User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por tipo de evento */}
            <div className="space-y-2">
              <Label htmlFor="event-filter">{t("audit.filterByEvent")}</Label>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger id="event-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "pt-BR" ? "Todos" : "All"}
                  </SelectItem>
                  <SelectItem value="LOGIN_SUCCESS">Login Success</SelectItem>
                  <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                  <SelectItem value="USER_CREATED">User Created</SelectItem>
                  <SelectItem value="USER_BLOCKED">User Blocked</SelectItem>
                  <SelectItem value="ROLE_UPDATED">Role Updated</SelectItem>
                  <SelectItem value="DATA_IMPORTED">Data Imported</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de resultados */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("audit.event")}</TableHead>
                <TableHead>{t("audit.user")}</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>{t("audit.details")}</TableHead>
                <TableHead>{t("audit.timestamp")}</TableHead>
                <TableHead>
                  {language === "pt-BR" ? "Gravidade" : "Severity"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover-scale">
                  <TableCell className="font-medium">{log.event}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {log.details}
                  </TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString(language)}
                  </TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estado vazio */}
      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "pt-BR"
                ? "Nenhum log encontrado com os filtros aplicados"
                : "No logs found with applied filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
