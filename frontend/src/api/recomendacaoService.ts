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
  // Nenhuma mudança aqui, 'data' já conterá o novo campo
  return api.post("/recomendacoes", data);
};