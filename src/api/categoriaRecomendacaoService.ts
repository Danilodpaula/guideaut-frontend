import api from "./client";
import { CategoriaRecomendacaoDTO } from "./types/categoriaRecomendacaoTypes";

const BASE_URL = "/categorias-recomendacao";

export const listarCategoriasRecomendacaoApi = () => {
  return api.get<CategoriaRecomendacaoDTO[]>(BASE_URL);
};

export const obterCategoriaRecomendacaoApi = (id: number) => {
  return api.get<CategoriaRecomendacaoDTO>(`${BASE_URL}/${id}`);
};

export const criarCategoriaRecomendacaoApi = (
  data: CategoriaRecomendacaoDTO,
) => {
  return api.post<CategoriaRecomendacaoDTO>(BASE_URL, data);
};

export const atualizarCategoriaRecomendacaoApi = (
  id: number,
  data: CategoriaRecomendacaoDTO,
) => {
  return api.put<CategoriaRecomendacaoDTO>(`${BASE_URL}/${id}`, data);
};

export const deletarCategoriaRecomendacaoApi = (id: number) => {
  return api.delete(`${BASE_URL}/${id}`);
};
