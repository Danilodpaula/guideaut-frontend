import { useI18n } from "@/core/i18n/I18nContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersFiltersProps {
  statusFilter: string;
  roleFilter: string;
  searchTerm: string;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function UsersFilters({
  statusFilter,
  roleFilter,
  searchTerm,
  onStatusChange,
  onRoleChange,
  onSearchChange,
}: UsersFiltersProps) {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("common.filter") || "Filtrar"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder={t("common.search") || "Buscar"}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={t("users.filterByStatus") || "Filtrar por status"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all") || "Todos"}</SelectItem>
              <SelectItem value="ACTIVE">
                {t("users.active") || "Ativo"}
              </SelectItem>
              {/* <SelectItem value="PENDING">
                {t("users.pending") || "Pendente"}
              </SelectItem> */}
              <SelectItem value="BLOCKED">
                {t("users.blocked") || "Bloqueado"}
              </SelectItem>
              <SelectItem value="ARCHIVED">
                {t("users.archived") || "Arquivado"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={onRoleChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={t("users.filterByRole") || "Filtrar por papel"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all") || "Todos"}</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
