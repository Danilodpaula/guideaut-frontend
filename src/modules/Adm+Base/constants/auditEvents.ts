// src/modules/audit/constants/auditEvents.ts

export const auditEventLabels: Record<string, { pt: string; en: string }> = {
  // Auth
  LOGIN_SUCCESS: {
    pt: "Login realizado com sucesso",
    en: "Login successful",
  },
  LOGIN_FAILED: {
    pt: "Tentativa de login falhou",
    en: "Login failed",
  },
  REFRESH_SUCCESS: {
    pt: "Token de sessão renovado",
    en: "Session token refreshed",
  },
  LOGOUT: {
    pt: "Logout realizado",
    en: "Logout performed",
  },

  // Usuário / perfil
  USER_CREATED: {
    pt: "Usuário criado",
    en: "User created",
  },
  ADMIN_LIST_USERS: {
    pt: "Listagem de usuários (admin)",
    en: "Users listing (admin)",
  },
  PROFILE_VIEW: {
    pt: "Perfil consultado",
    en: "Profile viewed",
  },
  AVATAR_UPDATED: {
    pt: "Avatar atualizado",
    en: "Avatar updated",
  },
  AVATAR_REMOVED: {
    pt: "Avatar removido",
    en: "Avatar removed",
  },

  // Recomendações
  RECOMENDACAO_LIST_ALL: {
    pt: "Listagem de recomendações",
    en: "Recommendations listed",
  },
  RECOMENDACAO_CREATED: {
    pt: "Recomendação criada",
    en: "Recommendation created",
  },
  RECOMENDACAO_UPDATED: {
    pt: "Recomendação atualizada",
    en: "Recommendation updated",
  },
  RECOMENDACAO_DELETED: {
    pt: "Recomendação deletada",
    en: "Recommendation deleted",
  },
  RECOMENDACAO_AVALIADA: {
    pt: "Recomendação avaliada",
    en: "Recommendation rated",
  },
};

export const EVENT_OPTIONS = [
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "REFRESH_SUCCESS",
  "LOGOUT",
  "USER_CREATED",
  "ADMIN_LIST_USERS",
  "PROFILE_VIEW",
  "AVATAR_UPDATED",
  "AVATAR_REMOVED",
  "RECOMENDACAO_LIST_ALL",
  "RECOMENDACAO_CREATED",
  "RECOMENDACAO_UPDATED",
  "RECOMENDACAO_DELETED",
  "RECOMENDACAO_AVALIADA",
] as const;
