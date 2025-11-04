// ============================================================
// 🔐 CONTEXTO DE AUTENTICAÇÃO: AuthContext
// ============================================================
// Este arquivo define o **AuthProvider** e o hook `useAuth()`,
// que centralizam toda a lógica de autenticação do app.
//
// Ele integra o Supabase para:
// - Login e logout de usuários
// - Cadastro (sign up)
// - Carregamento automático de perfil e papéis (roles)
// - Controle de sessão persistente
// - Proteção condicional de rotas e recursos
// ============================================================

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// ------------------------------------------------------------
// 🧩 Tipagens
// ------------------------------------------------------------

// Modelo do usuário autenticado
interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

// Tipagem do contexto de autenticação
interface AuthContextType {
  user: User | null; // Usuário autenticado
  isAuthenticated: boolean; // Se há sessão ativa
  isLoading: boolean; // Indica se está carregando dados de sessão
  login: (credentials: { email: string; password: string }) => Promise<void>; // Login
  signup: (data: { name: string; email: string; password: string }) => Promise<void>; // Cadastro
  logout: () => void; // Logout
  can: (role: string) => boolean; // Verifica permissão (role)
}

// ------------------------------------------------------------
// 🧱 Criação do Contexto
// ------------------------------------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------------------------------------------------
// 🧭 Provedor de Autenticação
// ------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------------------------------------
  // 🧩 Efeito inicial: carrega sessão atual e escuta mudanças
  // ------------------------------------------------------------
  useEffect(() => {
    // 1️⃣ Recupera a sessão ativa do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserData(session.user); // Carrega perfil e roles
      } else {
        setIsLoading(false);
      }
    });

    // 2️⃣ Escuta eventos de login/logout do Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        loadUserData(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // 3️⃣ Limpeza ao desmontar
    return () => subscription.unsubscribe();
  }, []);

  // ------------------------------------------------------------
  // 🧠 Função para carregar dados do usuário autenticado
  // ------------------------------------------------------------
  const loadUserData = async (supabaseUser: SupabaseUser) => {
    try {
      // Busca o perfil do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", supabaseUser.id)
        .maybeSingle();

      // Busca os papéis (roles) associados ao usuário
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", supabaseUser.id);

      const roles = userRoles?.map((r) => r.role) || [];

      // Define o estado do usuário
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name: profile?.display_name || supabaseUser.email?.split("@")[0] || "User",
        roles,
      });
    } catch (error) {
      console.error("❌ Erro ao carregar dados do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------
  // 🔑 Login com e-mail e senha
  // ------------------------------------------------------------
  const login = async (credentials: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
  };

  // ------------------------------------------------------------
  // 📝 Cadastro de novo usuário
  // ------------------------------------------------------------
  const signup = async (data: { name: string; email: string; password: string }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name, // Salva o nome no metadata
        },
        emailRedirectTo: `${window.location.origin}/`, // Redireciona após confirmação
      },
    });

    if (error) throw error;
  };

  // ------------------------------------------------------------
  // 🚪 Logout
  // ------------------------------------------------------------
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ------------------------------------------------------------
  // 🛡️ Verificação de permissões
  // ------------------------------------------------------------
  const can = (role: string): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  // ------------------------------------------------------------
  // 🧩 Provedor do contexto
  // ------------------------------------------------------------
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
// ⚙️ Hook de uso do contexto
// ------------------------------------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};