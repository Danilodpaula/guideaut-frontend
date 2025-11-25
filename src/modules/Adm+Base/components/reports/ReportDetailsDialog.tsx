import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { Report, ReportStatus } from "../../types/reportTypes";
import { ReportStatusBadge } from "./ReportStatusBadge";
import {
  formatReportReason,
  formatReportType,
} from "../../utils/reportFormatters";

interface ReportDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report | null;
  onUpdateStatus: (id: string, status: ReportStatus) => void;
}

export function ReportDetailsDialog({
  isOpen,
  onOpenChange,
  report,
  onUpdateStatus,
}: ReportDetailsDialogProps) {
  const { t, language } = useI18n();

  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {t("reports.details")}
          </DialogTitle>
          <DialogDescription>
            {t("reports.date")}:{" "}
            {new Date(report.createdAt).toLocaleString(language)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("reports.target")}:
              </span>
              <p className="font-semibold">{report.targetName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("reports.type")}:
              </span>
              <p>{formatReportType(report.type, t)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("reports.reporter")}:
              </span>
              <p>{report.reporterName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("reports.reason")}:
              </span>
              <p>{formatReportReason(report.reason, t)}</p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-md border">
            <span className="text-sm font-medium text-muted-foreground block mb-2">
              Descrição da Denúncia:
            </span>
            <p className="text-sm italic">"{report.description}"</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-medium">Status Atual:</span>
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.close")}
          </Button>

          {report.status === "PENDING" && (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => onUpdateStatus(report.id, "DISMISSED")}
                className="w-full sm:w-auto"
              >
                <XCircle className="mr-2 h-4 w-4" />
                {t("reports.dismiss")}
              </Button>
              <Button
                onClick={() => onUpdateStatus(report.id, "RESOLVED")}
                className="w-full sm:w-auto"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {t("reports.resolve")}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
