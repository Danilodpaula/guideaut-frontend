import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import {
  Loader2,
  FileText,
  User,
  MessageSquare,
  LayoutList,
} from "lucide-react";

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
  const [typeFilter, setTypeFilter] = useState<string>("ALL"); // Novo estado para abas
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
      // 1. Filtro de Busca (Texto)
      const targetName = report.targetName || "";
      const description = report.description || "";
      const reporterName = report.reporterName || "";

      const matchesSearch =
        targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporterName.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Filtro de Status
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      // 3. Filtro de Tipo (Abas)
      const matchesType = typeFilter === "ALL" || report.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [reports, searchTerm, statusFilter, typeFilter]);

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

        <button
          onClick={loadReports}
          className="text-sm text-primary hover:underline"
          disabled={isLoading}
        >
          Atualizar lista
        </button>
      </div>

      {/* Abas de Navegação por Tipo */}
      <Tabs defaultValue="ALL" className="w-full" onValueChange={setTypeFilter}>
        <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
          <TabsTrigger value="ALL" className="flex items-center gap-2">
            <LayoutList className="h-4 w-4" />
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="RECOMMENDATION"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Recomendações
          </TabsTrigger>
          <TabsTrigger value="USER" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="COMMENT" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comentários
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
          {/* Filtros de Texto e Status */}
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
        </div>

        <TabsContent value="ALL" />
        <TabsContent value="RECOMMENDATION" />
        <TabsContent value="USER" />
        <TabsContent value="COMMENT" />
      </Tabs>

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
