// ============================================================
// 🔐 MOCK SERVICE: AuthService
// ============================================================
// Este serviço simula a autenticação de usuários no sistema GuideAut,
// útil para desenvolvimento e testes locais antes da integração real
// com o backend (ex: Supabase, Spring Boot, etc).
//
// Ele fornece funções para:
// - Login e SignUp
// - Recuperar perfil
// - Renovar tokens (mock)
// - Armazenar/recuperar tokens no localStorage
// ============================================================

import { User, AuthTokens, LoginCredentials, SignupData } from "./types";

// ------------------------------------------------------------
// 🧱 Classe principal de autenticação
// ------------------------------------------------------------
class AuthService {
  private readonly TOKEN_KEY = "guideaut-tokens"; // Chave usada no localStorage

  // 🔸 Mock de usuários disponíveis
  private mockUsers: User[] = [
    {
      id: "1",
      email: "admin@guideaut.com",
      name: "Admin User",
      status: "ACTIVE",
      roles: ["ADMIN"],
    },
    {
      id: "2",
      email: "user@guideaut.com",
      name: "Regular User",
      status: "ACTIVE",
      roles: ["USER"],
    },
  ];

  // ------------------------------------------------------------
  // 🔑 Login de usuário
  // ------------------------------------------------------------
  async login(
    credentials: LoginCredentials,
  ): Promise<{ tokens: AuthTokens; user: User }> {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Busca usuário mock pelo e-mail
    const user = this.mockUsers.find((u) => u.email === credentials.email);

    // Validação de credenciais
    if (!user || credentials.password !== "123456") {
      throw new Error("Invalid credentials");
    }

    // Verifica status da conta
    if (user.status !== "ACTIVE") {
      throw new Error("User account is not active");
    }

    // Gera tokens mockados
    const tokens: AuthTokens = {
      accessToken: `mock-access-token-${user.id}`,
      refreshToken: `mock-refresh-token-${user.id}`,
    };

    return { tokens, user };
  }

  // ------------------------------------------------------------
  // 📝 Cadastro (Signup)
  // ------------------------------------------------------------
  async signup(data: SignupData): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simula delay

    // Verifica se o e-mail já existe
    const existingUser = this.mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Em um backend real:
    // - Seria criado o usuário no banco
    // - E enviado um e-mail de verificação
  }

  // ------------------------------------------------------------
  // 👤 Recuperar perfil do usuário
  // ------------------------------------------------------------
  async getProfile(accessToken: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay

    // Extrai ID do token mockado
    const userId = accessToken.split("-").pop();
    const user = this.mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new Error("Invalid token");
    }

    return user;
  }

  // ------------------------------------------------------------
  // 🔄 Atualizar tokens (mock de refresh)
  // ------------------------------------------------------------
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay

    const userId = refreshToken.split("-").pop();

    return {
      accessToken: `mock-access-token-${userId}`,
      refreshToken: `mock-refresh-token-${userId}`,
    };
  }

  // ------------------------------------------------------------
  // 💾 Armazenar tokens no localStorage
  // ------------------------------------------------------------
  storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  // ------------------------------------------------------------
  // 📦 Recuperar tokens armazenados
  // ------------------------------------------------------------
  getStoredTokens(): AuthTokens | null {
    const stored = localStorage.getItem(this.TOKEN_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  // ------------------------------------------------------------
  // 🧹 Limpar tokens do armazenamento
  // ------------------------------------------------------------
  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

// ------------------------------------------------------------
// 📤 Exporta instância única do serviço
// ------------------------------------------------------------
export const authService = new AuthService();
