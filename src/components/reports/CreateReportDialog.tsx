import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flag, Loader2 } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import { createReportApi } from "@/api/reportService";
import { ReportReason, ReportType } from "@/modules/Adm+Base/types/reportTypes";

interface CreateReportDialogProps {
  targetId: string;
  targetType: ReportType;
  trigger?: React.ReactNode; // Botão customizado opcional
}

export function CreateReportDialog({
  targetId,
  targetType,
  trigger,
}: CreateReportDialogProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [reason, setReason] = useState<ReportReason | "">("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!reason) {
      toast.error(t("reports.selectReason"));
      return;
    }
    if (!description.trim()) {
      toast.error(t("reports.descriptionPlaceholder"));
      return;
    }

    setIsLoading(true);
    try {
      await createReportApi({
        targetId,
        type: targetType,
        reason: reason as ReportReason,
        description,
      });

      toast.success(t("reports.success"));
      setIsOpen(false);
      setReason("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error(t("reports.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const reasons: ReportReason[] = [
    "SPAM",
    "INAPPROPRIATE",
    "HARASSMENT",
    "OTHER",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
          >
            <Flag className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("reports.createTitle")}</DialogTitle>
          <DialogDescription>
            {t("reports.createDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t("reports.reason")}</Label>
            <Select
              value={reason}
              onValueChange={(v) => setReason(v as ReportReason)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("reports.selectReason")} />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {t(`reports.${r.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("audit.details")}</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("reports.descriptionPlaceholder")}
              className="resize-none"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !reason || !description}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("reports.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
