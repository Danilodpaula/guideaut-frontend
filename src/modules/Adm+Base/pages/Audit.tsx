/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
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

import { useAuditLogs } from "../hooks/useAuditLogs";
import { getEventLabel } from "../utils/getEventLabel";
import { EVENT_OPTIONS } from "../constants/auditEvents";

/**
 * Página de auditoria (Audit)
 * Exibe registros de ações do sistema com filtros e exportação CSV/JSON.
 */
export default function Audit() {
  const { t, language } = useI18n();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userFilter, setUserFilter] = useState("all"); // filtro local (texto)
  const [eventFilter, setEventFilter] = useState("all");

  const { logs, isLoading, error } = useAuditLogs({
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    event: eventFilter === "all" ? undefined : eventFilter,
    // se quiser mandar usuário pro backend:
    // userEmail: userFilter !== "all" ? userFilter : undefined,
  });

  // Toast de erro
  useEffect(() => {
    if (error) {
      toast.error(
        language === "pt-BR"
          ? "Erro ao carregar logs de auditoria"
          : "Failed to load audit logs",
      );
    }
  }, [error, language]);

  /**
   * 🔍 Filtros aplicados aos logs (lado do front).
   */
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesUser =
        userFilter === "all" ||
        (log.user && log.user.toLowerCase().includes(userFilter.toLowerCase()));

      const matchesEvent = eventFilter === "all" || log.event === eventFilter;

      const logDate = new Date(log.timestamp);

      const matchesStart =
        !startDate || logDate >= new Date(startDate + "T00:00:00");

      const matchesEnd = !endDate || logDate <= new Date(endDate + "T23:59:59");

      return matchesUser && matchesEvent && matchesStart && matchesEnd;
    });
  }, [logs, userFilter, eventFilter, startDate, endDate]);

  /**
   * 📤 Exporta os logs filtrados em formato CSV.
   */
  const exportCSV = () => {
    if (filteredLogs.length === 0) return;

    const headers = ["Event", "User", "Timestamp", "Severity"];
    const rows = filteredLogs.map((log) => [
      getEventLabel(log.event, language),
      log.user ?? "",
      new Date(log.timestamp).toLocaleString(language),
      log.severity,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

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
    if (filteredLogs.length === 0) return;

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
    } as const;

    const variant =
      variants[severity as keyof typeof variants] ?? variants.info;

    return <Badge variant={variant as any}>{severity}</Badge>;
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
          <Button
            variant="outline"
            onClick={exportCSV}
            disabled={isLoading || filteredLogs.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            {t("audit.exportCSV")}
          </Button>
          <Button
            variant="outline"
            onClick={exportJSON}
            disabled={isLoading || filteredLogs.length === 0}
          >
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

            {/* Filtro por usuário (texto livre) */}
            <div className="space-y-2">
              <Label htmlFor="user-filter">{t("audit.filterByUser")}</Label>
              <Input
                id="user-filter"
                placeholder={
                  language === "pt-BR" ? "E-mail ou nome" : "E-mail or name"
                }
                value={userFilter === "all" ? "" : userFilter}
                onChange={(e) =>
                  setUserFilter(
                    e.target.value.trim() === "" ? "all" : e.target.value,
                  )
                }
              />
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

                  {EVENT_OPTIONS.map((event) => (
                    <SelectItem key={event} value={event}>
                      {getEventLabel(event, language)}
                    </SelectItem>
                  ))}
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
                <TableHead>{t("audit.timestamp")}</TableHead>
                <TableHead>
                  {language === "pt-BR" ? "Gravidade" : "Severity"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    {language === "pt-BR"
                      ? "Carregando logs..."
                      : "Loading logs..."}
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover-scale">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{getEventLabel(log.event, language)}</span>
                        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
                          {log.event}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{log.user ?? "-"}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString(language)}
                    </TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  </TableRow>
                ))}

              {!isLoading && filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    <FileText className="h-6 w-6 mx-auto mb-2" />
                    {language === "pt-BR"
                      ? "Nenhum log encontrado com os filtros aplicados"
                      : "No logs found with applied filters"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
