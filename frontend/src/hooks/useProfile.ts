import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/core/auth/AuthContext";
import { toast } from "sonner";

/**
 * Representa o perfil de um usuário.
 */
interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Hook responsável por gerenciar o perfil do usuário:
 * - Carregar informações do perfil
 * - Atualizar nome e bio
 * - Fazer upload e atualização do avatar
 * - Registrar atividades no banco (activity_logs)
 */
export function useProfile() {
  const { user } = useAuth(); // Usuário autenticado
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Carrega o perfil assim que o usuário estiver autenticado
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  /**
   * 🔍 Carrega os dados do perfil do usuário atual.
   */
  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      toast.error("Erro ao carregar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ✏️ Atualiza informações básicas do perfil (nome e bio).
   */
  const updateProfile = async (updates: { display_name?: string; bio?: string }) => {
    if (!user?.id) return;

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id);

      if (error) throw error;

      // Registra atividade
      await logActivity("UPDATE", "PROFILE", profile?.id || "", { changes: updates });

      await loadProfile();
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error(error.message || "Erro ao atualizar perfil");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 🖼️ Faz upload de um novo avatar e atualiza o perfil.
   */
  const uploadAvatar = async (file: File) => {
    if (!user?.id) return;

    try {
      setIsSaving(true);

      // Exclui o avatar anterior, se existir
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("avatars").remove([`${user.id}/${oldPath}`]);
        }
      }

      // Faz upload do novo arquivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtém a URL pública do novo avatar
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Atualiza o perfil no banco
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // Registra atividade
      await logActivity("UPDATE", "AVATAR", profile?.id || "", {
        avatar_url: data.publicUrl,
      });

      await loadProfile();
      toast.success("Avatar atualizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer upload do avatar:", error);
      toast.error(error.message || "Erro ao fazer upload do avatar");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 🪵 Registra uma ação do usuário na tabela "activity_logs".
   */
  const logActivity = async (
    action: string,
    entityType: string,
    entityId: string,
    details: any
  ) => {
    if (!user?.id) return;

    try {
      await supabase.from("activity_logs").insert({
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details,
      });
    } catch (error) {
      console.error("Erro ao registrar atividade:", error);
    }
  };

  // Retorna o estado e as funções principais
  return {
    profile,
    isLoading,
    isSaving,
    updateProfile,
    uploadAvatar,
    reloadProfile: loadProfile,
  };
}
