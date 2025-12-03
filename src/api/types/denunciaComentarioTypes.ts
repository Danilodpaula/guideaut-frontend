export interface CreateDenunciaComentarioDto {
  motivo: string;
  descricao?: string;
}

export interface DenunciaComentarioResponse {
  id: string;
  comentarioId: string;
  comentarioTexto: string;
  autorComentario: string;
  autorComentarioAvatar: string | null;
  motivo: string;
  descricao: string;
  status: "ABERTA" | "EM_ANÁLISE" | "RESOLVIDA" | "REJEITADA";
  denunciador: string;
  criadoEm: string;
  atualizadoEm?: string;
}
