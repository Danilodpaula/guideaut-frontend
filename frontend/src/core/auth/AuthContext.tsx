// src/core/auth/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// REMOVIDO: import { supabase } from "@/integrations/supabase/client";
import { loginApi, getProfileApi } from "@/api/authService"; // IMPORTADO
import { AuthRequest } from "@/api/types/authTypes"; // IMPORTADO

// ------------------------------------------------------------
// 🧩 Tipagens (Simplificado para o backend Spring)
// ------------------------------------------------------------
interface User {
  id: string; // Usaremos o email por enquanto
  email: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthRequest) => Promise<void>;
  signup: (data: any) => Promise<void>; // Signup não está no backend, será mockado
  logout: () => void;
  can: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chaves do Local Storage
const TOKEN_KEY = "guideaut_access_token";
const REFRESH_KEY = "guideaut_refresh_token";

// ------------------------------------------------------------
// 🧭 Provedor de Autenticação (Modificado)
// ------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const bootstrapped = useRef(false);

  // Efeito inicial: Tenta carregar dados do usuário se houver token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // ------------------------------------------------------------
  // 🧠 Função para carregar dados do usuário (do backend Spring)
  // ------------------------------------------------------------
  const loadUserData = async () => {
    try {
      // O interceptor do Axios em 'api/client.ts' já injeta o token
      const { data } = await getProfileApi(); // Chama GET /me

      // O backend /me só retorna o email (e roles, se o JWTAuthFilter for ajustado)
      // Vamos simular os dados do usuário
      setUser({
        id: data.email,
        email: data.email,
        name: data.email.split("@")[0], // Simples
        roles: ["USER"], // TODO: O backend precisa popular isso
      });
    } catch (error) {
      console.error("❌ Erro ao carregar dados do usuário:", error);
      // Se deu erro (token expirado), força o logout
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------
  // 🔑 Login (agora usa o backend Spring)
  // ------------------------------------------------------------
  const login = async (credentials: AuthRequest) => {
    const { data } = await loginApi(credentials); // Chama POST /auth/login

    // Salva os tokens recebidos do backend
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_KEY, data.refreshToken);

    // Carrega os dados do usuário (/me) e atualiza o estado
    await loadUserData();
  };

  const logout = async () => {
    // TODO: Chamar /auth/logout do backend (passando o refresh token)
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setUser(null);
  };

  // ------------------------------------------------------------
  // 📝 Cadastro (Ainda não implementado no backend)
  // ------------------------------------------------------------
  const signup = async (data: any) => {
    // Esta função precisa ser implementada no backend (ex: POST /users/register)
    console.warn("Signup não implementado no backend Spring.");
    throw new Error("Signup não disponível.");
  };

  // ------------------------------------------------------------
  // 🛡️ Verificação de permissões (simplificada)
  // ------------------------------------------------------------
  const can = (role: string): boolean => {
    if (!user) return false;
    // O backend precisa popular 'roles' no JWT para isso funcionar 100%
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

// ------------------------------------------------------------
// ⚙️ Hook de uso do contexto (sem alteração)
// ------------------------------------------------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
};
