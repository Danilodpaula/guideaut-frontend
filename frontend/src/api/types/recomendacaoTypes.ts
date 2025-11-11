export interface RecomendacaoRequest {
  titulo: string;
  descricao: string;
  justificativa: string; 
  categoria: string;
  referencia: string | null;
}

export interface Recomendacao {
  id: string;
  titulo: string;
  descricao: string;
  justificativa: string; 
  referencia: string | null;
  categoria: string;
  criadoEm: string;
}