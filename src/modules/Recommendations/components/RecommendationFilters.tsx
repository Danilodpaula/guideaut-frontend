import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { CategoriaRecomendacaoDTO } from "@/api/types/categoriaRecomendacaoTypes";
// Importamos a constante do Form para evitar duplicação, ou redefinimos aqui se preferir isolamento
import { DEFAULT_CATEGORIES } from "./RecommendationFormDialog";

interface RecommendationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: CategoriaRecomendacaoDTO[];
}

export const RecommendationFilters: React.FC<RecommendationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar recomendações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas as categorias</SelectItem>

              <SelectGroup>
                <SelectLabel>Padrão</SelectLabel>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectGroup>

              {categories.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Personalizadas</SelectLabel>
                  {categories.map(
                    (cat) =>
                      !DEFAULT_CATEGORIES.some(
                        (def) => def.value === cat.nome,
                      ) && (
                        <SelectItem key={cat.id} value={cat.nome}>
                          {cat.nome}
                        </SelectItem>
                      ),
                  )}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
