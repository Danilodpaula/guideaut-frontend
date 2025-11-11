import api from "./client";
import { RecomendacaoRequest } from "./types/recomendacaoTypes";

/**
 * Busca a lista de recomendações (GET /recomendacoes/list-all).
 */
export const listarRecomendacoesApi = () => {
  return api.get("/recomendacoes/list-all");
};

/**
 * Cria uma nova recomendação (POST /recomendacoes).
 */
export const criarRecomendacaoApi = (data: RecomendacaoRequest) => {
  return api.post("/recomendacoes", data);
};

/**
 * -------------------------------------------------------------------
 * ✏️ NOVO: Atualiza uma recomendação (requer token de admin no backend).
 * -------------------------------------------------------------------
 */
export const atualizarRecomendacaoApi = (
  id: string,
  data: RecomendacaoRequest,
) => {
  return api.put(`/recomendacoes/${id}`, data);
};

/**
 * Deleta uma recomendação (requer token de admin no backend).
 */
export const deletarRecomendacaoApi = (id: string) => {
  return api.delete(`/recomendacoes/${id}`);
};