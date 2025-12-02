import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { Report } from "../../types/reportTypes";
import { ReportStatusBadge } from "./ReportStatusBadge";
import {
  formatReportReason,
  formatReportType,
} from "../../utils/reportFormatters";

interface ReportsTableProps {
  reports: Report[];
  onViewDetails: (report: Report) => void;
}

export function ReportsTable({ reports, onViewDetails }: ReportsTableProps) {
  const { t, language } = useI18n();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("reports.target")}</TableHead>
            <TableHead>{t("reports.type")}</TableHead>
            <TableHead>{t("reports.reason")}</TableHead>
            <TableHead>{t("reports.reporter")}</TableHead>
            <TableHead>{t("reports.date")}</TableHead>
            <TableHead>{t("reports.status")}</TableHead>
            <TableHead className="text-right">{t("common.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                {t("common.noData") || "Nenhuma denúncia encontrada."}
              </TableCell>
            </TableRow>
          ) : (
            reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {report.targetName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {formatReportType(report.type, t)}
                  </Badge>
                </TableCell>
                <TableCell>{formatReportReason(report.reason, t)}</TableCell>
                <TableCell>{report.reporterName}</TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleDateString(language)}
                </TableCell>
                <TableCell>
                  <ReportStatusBadge status={report.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(report)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t("common.details")}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
