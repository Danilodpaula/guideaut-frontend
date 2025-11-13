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
  // O token é injetado automaticamente pelo interceptor do client
  return api.post("/recomendacoes", data);
};
