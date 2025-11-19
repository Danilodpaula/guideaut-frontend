import api from "./client";
import { AuthRequest } from "./types/authTypes";

/**
 * Envia credenciais para o endpoint /auth/login do backend Spring.
 */
export const loginApi = (credentials: AuthRequest) => {
  return api.post("/auth/login", credentials);
};

/**
 * Busca os dados do usuário logado no endpoint /me.
 * O token JWT é adicionado automaticamente pelo interceptor do 'api' client.
 */
export const getProfileApi = () => {
  return api.get("/me");
};

export const signupApi = (userData: {
  nome: string;
  email: string;
  password: string;
}) => {
  return api.post("/users", userData);
};
