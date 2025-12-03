import api from "./client";
import {
  CreateDenunciaComentarioDto,
  DenunciaComentarioResponse,
} from "./types/denunciaComentarioTypes";

const BASE_URL = "/denuncia-comentarios";

export const listarDenunciasComentarioApi = () => {
  return api.get<DenunciaComentarioResponse[]>(`${BASE_URL}/list-all`);
};

export const listarDenunciasPorStatusApi = (status: string) => {
  return api.get<DenunciaComentarioResponse[]>(
    `${BASE_URL}/por-status/${status}`,
  );
};

export const obterDenunciaComentarioApi = (id: string) => {
  return api.get<DenunciaComentarioResponse>(`${BASE_URL}/${id}`);
};

export const criarDenunciaComentarioApi = (
  comentarioId: string,
  data: CreateDenunciaComentarioDto,
) => {
  return api.post<DenunciaComentarioResponse>(
    `${BASE_URL}/comentario/${comentarioId}`,
    data,
  );
};

export const atualizarStatusDenunciaComentarioApi = (
  id: string,
  novoStatus: string,
) => {
  return api.patch<DenunciaComentarioResponse>(
    `${BASE_URL}/${id}/status/${novoStatus}`,
  );
};

export const deletarDenunciaComentarioApi = (id: string) => {
  return api.delete(`${BASE_URL}/${id}`);
};
