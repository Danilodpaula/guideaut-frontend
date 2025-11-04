// ============================================================
// 🧩 Tipos e Interfaces de Autenticação
// ============================================================
// Este arquivo define as **tipagens centrais** usadas pelo sistema
// de autenticação e gerenciamento de usuários do GuideAut.
//
// Ele padroniza o modelo de usuário, tokens, credenciais de login,
// e dados de cadastro, garantindo consistência entre frontend e backend.
// ============================================================

// ------------------------------------------------------------
// ⚙️ Status possíveis de um usuário
// ------------------------------------------------------------
// - "PENDING": usuário criado, mas ainda não confirmado.
// - "ACTIVE": usuário ativo e autorizado a acessar o sistema.
// - "BLOCKED": conta temporariamente bloqueada por motivos de segurança.
// - "ARCHIVED": conta desativada permanentemente (não pode fazer login).
export type UserStatus = "PENDING" | "ACTIVE" | "BLOCKED" | "ARCHIVED";

// ------------------------------------------------------------
// 🛡️ Papéis (roles) de usuário
// ------------------------------------------------------------
// - "ADMIN": possui acesso a áreas administrativas e de gerenciamento.
// - "USER": acesso limitado às áreas públicas e pessoais.
export type UserRole = "ADMIN" | "USER";

// ------------------------------------------------------------
// 👤 Modelo principal do usuário
// ------------------------------------------------------------
export interface User {
  id: string; // Identificador único do usuário (UUID)
  email: string; // Endereço de e-mail usado para login
  name: string; // Nome de exibição (display name)
  status: UserStatus; // Estado atual da conta
  roles: UserRole[]; // Lista de papéis associados (pode ter mais de um)

  // 🔧 Preferências de acessibilidade (opcional)
  a11y?: {
    theme: "light" | "dark"; // Tema claro ou escuro
    fontSize: "sm" | "md" | "lg"; // Tamanho da fonte
    reduceMotion: boolean; // Reduzir animações (true = acessibilidade ativada)
  };
}

// ------------------------------------------------------------
// 🔑 Estrutura dos tokens de autenticação
// ------------------------------------------------------------
// São usados para autenticar e renovar sessões seguras.
export interface AuthTokens {
  accessToken: string; // Token de acesso atual
  refreshToken: string; // Token usado para renovar o accessToken
}

// ------------------------------------------------------------
// 📧 Credenciais de login
// ------------------------------------------------------------
export interface LoginCredentials {
  email: string; // E-mail do usuário
  password: string; // Senha (mínimo de 6 caracteres)
}

// ------------------------------------------------------------
// 📝 Dados necessários para cadastro
// ------------------------------------------------------------
export interface SignupData extends LoginCredentials {
  name: string; // Nome do usuário a ser exibido no perfil
}