/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// ============================================================
// 🔐 CONTEXTO DE AUTENTICAÇÃO: AuthContext (via API própria)
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import type { AxiosError } from "axios";
import { api, getStoredTokens, setTokens, clearTokens } from "@/api/client";

// Tipagens
interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  can: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const bootstrap = async () => {
      const { accessToken, refreshToken } = getStoredTokens();

      if (!accessToken && !refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await api.get("/me");
        const apiUser = me.data as Partial<User> & {
          id?: string;
          email?: string;
          name?: string;
          roles?: string[];
          authorities?: string[];
        };

        const roles =
          Array.isArray(apiUser.roles)
            ? apiUser.roles
            : Array.isArray(apiUser.authorities)
            ? apiUser.authorities.map((a: string) => a.replace(/^ROLE_/, ""))
            : [];

        setUser({
          id: apiUser.id ?? "",
          email: apiUser.email ?? "",
          name: apiUser.name ?? apiUser.email?.split("@")[0] ?? "User",
          roles,
        });
      } catch (_err) {
        // Interceptor já tentou refresh; se ainda falhou, limpa sessão.
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>(
      "/auth/login",
      credentials
    );
    setTokens(data.accessToken, data.refreshToken);

    const me = await api.get("/me");
    const apiUser = me.data as any;
    const roles =
      Array.isArray(apiUser.roles)
        ? apiUser.roles
        : Array.isArray(apiUser.authorities)
        ? apiUser.authorities.map((a: string) => a.replace(/^ROLE_/, ""))
        : [];

    setUser({
      id: apiUser.id ?? "",
      email: apiUser.email ?? "",
      name: apiUser.name ?? apiUser.email?.split("@")[0] ?? "User",
      roles,
    });
  };

  const signup = async (data: { name: string; email: string; password: string }) => {
    try {
      // API espera { nome, email, password }
      await api.post("/users", {
        nome: data.name,
        email: data.email,
        password: data.password,
      });

      // opcional: auto-login após criar
      await login({ email: data.email, password: data.password });
    } catch (err) {
      const ax = err as AxiosError<any>;
      if (ax.response?.status === 409) {
        throw new Error("email_exists");
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      const { refreshToken } = getStoredTokens();
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // ignore rede
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  const can = (role: string) => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
};
