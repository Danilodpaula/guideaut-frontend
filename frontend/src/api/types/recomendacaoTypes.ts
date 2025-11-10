export interface RecomendacaoRequest {
  titulo: string;
  referencia: string | null;
  descricao: string;
  categoria: string;
}

export interface Recomendacao {
  id: string;
  titulo: string;
  referencia: string | null;
  descricao: string;
  categoria: string;
  criadoEm: string;
}