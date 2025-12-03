import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useI18n } from "@/core/i18n/I18nContext";

interface ReportsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function ReportsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: ReportsFilterProps) {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {t("common.filter")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 ">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("common.search") + "..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[30vw]"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t("reports.status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("common.filter")}:{" "}
                {t("audit.filterByEvent") === "Filter by event"
                  ? "All"
                  : "Todos"}
              </SelectItem>
              <SelectItem value="PENDING">{t("reports.pending")}</SelectItem>
              <SelectItem value="RESOLVED">{t("reports.resolved")}</SelectItem>
              <SelectItem value="DISMISSED">
                {t("reports.dismissed")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
