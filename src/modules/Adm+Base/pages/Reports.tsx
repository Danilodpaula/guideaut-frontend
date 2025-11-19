import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Report, ReportStatus } from "../types/reportTypes";
import { ReportsFilter } from "../components/reports/ReportsFilter";
import { ReportsTable } from "../components/reports/ReportsTable";
import { ReportDetailsDialog } from "../components/reports/ReportDetailsDialog";
import { getReportsApi, updateReportStatusApi } from "@/api/reportService";

export default function Reports() {
  const { t } = useI18n();

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const { data } = await getReportsApi();
      setReports(data);
    } catch (error) {
      console.error("Erro ao carregar denúncias:", error);
      toast.error(t("common.error") || "Erro ao carregar denúncias");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const targetName = report.targetName || "";
      const description = report.description || "";
      const reporterName = report.reporterName || "";

      const matchesSearch =
        targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporterName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, searchTerm, statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: ReportStatus) => {
    try {
      await updateReportStatusApi(id, newStatus);

      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
      );

      toast.success(t("reports.actionSuccess"));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error(t("common.error") || "Erro ao atualizar status");
    }
  };

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {t("reports.title")}
          </h1>
          <p className="text-muted-foreground mt-2">{t("reports.subtitle")}</p>
        </div>

        {/* Botão de Recarregar Manual */}
        <button
          onClick={loadReports}
          className="text-sm text-primary hover:underline"
          disabled={isLoading}
        >
          Atualizar lista
        </button>
      </div>

      {/* Componente de Filtros */}
      <ReportsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Tabela de Resultados */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>{t("common.loading")}</p>
            </div>
          ) : (
            <ReportsTable
              reports={filteredReports}
              onViewDetails={handleViewDetails}
            />
          )}
        </CardContent>
      </Card>

      {/* Diálogo de Detalhes */}
      <ReportDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        report={selectedReport}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
