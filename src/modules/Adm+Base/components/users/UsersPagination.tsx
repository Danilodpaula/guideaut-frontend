// components/UsersPagination.tsx
import { useI18n } from "@/core/i18n/I18nContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersPaginationProps {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  loading: boolean;
  onChangeSize: (size: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function UsersPagination({
  page,
  size,
  totalElements,
  totalPages,
  canPrev,
  canNext,
  loading,
  onChangeSize,
  onPrev,
  onNext,
}: UsersPaginationProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {/* 
        Mantendo o comportamento original (comentado):
        {totalElements > 0
          ? t("users.paginationInfo", {
              page: page + 1,
              totalPages,
              totalElements,
            }) ||
            `Página ${page + 1} de ${totalPages} • ${totalElements} usuários`
          : t("common.noData") || "Nenhum registro"} 
        */}
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={String(size)}
          onValueChange={(v) => onChangeSize(Number(v))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t("users.pageSize") || "Tamanho"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">
              {t("users.pageSize5") || "5 / página"}
            </SelectItem>
            <SelectItem value="10">
              {t("users.pageSize10") || "10 / página"}
            </SelectItem>
            <SelectItem value="20">
              {t("users.pageSize20") || "20 / página"}
            </SelectItem>
            <SelectItem value="50">
              {t("users.pageSize50") || "50 / página"}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          disabled={!canPrev || loading}
          onClick={onPrev}
        >
          {t("common.previous") || "Anterior"}
        </Button>
        <Button
          variant="outline"
          disabled={!canNext || loading}
          onClick={onNext}
        >
          {t("common.next") || "Próxima"}
        </Button>
      </div>
    </div>
  );
}
