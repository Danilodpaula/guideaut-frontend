import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/core/i18n/I18nContext";
import { ReportStatus } from "../../types/reportTypes";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const { t } = useI18n();

  const variants: Record<
    ReportStatus,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    PENDING: "destructive",
    RESOLVED: "default",
    DISMISSED: "secondary",
  };

  return (
    <Badge variant={variants[status]}>
      {t(`reports.${status.toLowerCase()}`)}
    </Badge>
  );
}
