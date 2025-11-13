import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/core/auth/AuthContext";

/**
 * Representa um registro de atividade do usuário.
 */
interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

/**
 * Hook para carregar e monitorar em tempo real o histórico de atividades do usuário.
 * Integra com Supabase (tabela: activity_logs).
 */
export function useActivityLogs(limit: number = 10) {
  const { user } = useAuth(); // Obtém o usuário autenticado
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito: carrega e assina mudanças em tempo real na tabela "activity_logs"
  useEffect(() => {
    if (user?.id) {
      loadActivities();

      // 🔄 Inscrição em atualizações do Supabase (Postgres Realtime)
      const channel = supabase
        .channel("activity_logs_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "activity_logs",
            filter: `user_id=eq.${user.id}`, // Apenas logs do usuário atual
          },
          () => {
            loadActivities();
          },
        )
        .subscribe();

      // Remove o canal ao desmontar
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user?.id, limit]);

  /**
   * 🔍 Carrega os logs de atividade mais recentes.
   */
  const loadActivities = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🔣 Retorna um ícone representativo baseado no tipo de ação.
   */
  const getActivityIcon = (action: string, entityType: string) => {
    const key = `${action}_${entityType}`;
    const icons: Record<string, string> = {
      CREATE_RECOMMENDATION: "📝",
      UPDATE_RECOMMENDATION: "✏️",
      DELETE_RECOMMENDATION: "🗑️",
      CREATE_VOTE: "👍",
      UPDATE_VOTE: "🔄",
      CREATE_FAVORITE: "⭐",
      DELETE_FAVORITE: "💔",
      UPDATE_PROFILE: "👤",
      UPDATE_AVATAR: "🖼️",
      LOGIN: "🔐",
      LOGOUT: "👋",
    };
    return icons[key] || "📋";
  };

  /**
   * 🌍 Retorna a descrição traduzida da ação (PT/EN).
   */
  const getActivityDescription = (
    action: string,
    entityType: string,
    language: string,
  ) => {
    const key = `${action}_${entityType}`;
    const descriptions: Record<string, { pt: string; en: string }> = {
      CREATE_RECOMMENDATION: {
        pt: "Criou uma nova recomendação",
        en: "Created a new recommendation",
      },
      UPDATE_RECOMMENDATION: {
        pt: "Atualizou uma recomendação",
        en: "Updated a recommendation",
      },
      DELETE_RECOMMENDATION: {
        pt: "Excluiu uma recomendação",
        en: "Deleted a recommendation",
      },
      CREATE_VOTE: {
        pt: "Votou em uma recomendação",
        en: "Voted on a recommendation",
      },
      UPDATE_VOTE: { pt: "Alterou seu voto", en: "Changed vote" },
      CREATE_FAVORITE: {
        pt: "Favoritou uma recomendação",
        en: "Favorited a recommendation",
      },
      DELETE_FAVORITE: {
        pt: "Removeu dos favoritos",
        en: "Removed from favorites",
      },
      UPDATE_PROFILE: { pt: "Atualizou o perfil", en: "Updated profile" },
      UPDATE_AVATAR: { pt: "Alterou o avatar", en: "Changed avatar" },
      LOGIN: { pt: "Fez login no sistema", en: "Logged in" },
      LOGOUT: { pt: "Saiu do sistema", en: "Logged out" },
    };

    const desc = descriptions[key];
    return desc ? (language === "pt-BR" ? desc.pt : desc.en) : action;
  };

  // Retorna dados e utilitários do hook
  return {
    activities,
    isLoading,
    getActivityIcon,
    getActivityDescription,
    reloadActivities: loadActivities,
  };
}
