export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  email: string;
  // O backend /me também retorna 'roles' (papeis),
  // podemos adicionar aqui quando necessário.
}
