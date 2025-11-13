import api from "./client";
import { AvaliacaoRequest, RecomendacaoRequest } from "./types/recomendacaoTypes"; // 1. Importar

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
 * Atualiza uma recomendação (PUT /recomendacoes/{id}).
 */
export const atualizarRecomendacaoApi = (
  id: string,
  data: RecomendacaoRequest,
) => {
  return api.put(`/recomendacoes/${id}`, data);
};

/**
 * Deleta uma recomendação (DELETE /recomendacoes/{id}).
 */
export const deletarRecomendacaoApi = (id: string) => {
  return api.delete(`/recomendacoes/${id}`);
};

/**
 * -------------------------------------------------------------------
 * ⭐ NOVO: Envia uma avaliação (1-5 estrelas).
 * -------------------------------------------------------------------
 */
export const avaliarRecomendacaoApi = (
  id: string,
  data: AvaliacaoRequest,
) => {
  // O token de usuário logado é injetado automaticamente pelo interceptor
  return api.post(`/recomendacoes/${id}/avaliar`, data);
};