/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  getMe,
  uploadMyAvatar,
  updateMyProfile,
  type UpdateProfileRequest,
  deleteMyAvatar,
} from "@/api/profile";

/**
 * Shape usado pelo Profile.tsx
 * (mantém compatível com os campos usados na tela)
 */
export type ProfileData = {
  avatar_url?: string | null;
  display_name?: string | null;
  bio?: string | null;
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // carrega /me apenas para avatar (display_name/bio são opcionais até o backend expor)
  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const me = await getMe();
      setProfile((prev) => ({
        ...prev,
        avatar_url: me.avatarUrl ?? null,
        // display_name e bio podem vir de outro endpoint no futuro;
        // por enquanto deixamos como estavam (ou null).
        display_name: prev?.display_name ?? null,
        bio: prev?.bio ?? null,
      }));
    } catch {
      toast.error("Não foi possível carregar seu perfil.");
      setProfile({ avatar_url: null, display_name: null, bio: null });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadAvatar = useCallback(async (file: File) => {
    setIsSaving(true);
    try {
      const res = await uploadMyAvatar(file);
      // atualiza URL localmente
      setProfile((p) => ({ ...(p ?? {}), avatar_url: res.url }));
      toast.success("Avatar atualizado!");
    } catch {
      toast.error("Falha ao enviar avatar.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    setIsSaving(true);
    // otimista: atualiza já
    setProfile((p) => ({
      ...(p ?? {}),
      display_name:
        data.display_name !== undefined
          ? data.display_name
          : (p?.display_name ?? null),
      bio: data.bio !== undefined ? data.bio : (p?.bio ?? null),
    }));

    try {
      await updateMyProfile(data);
      toast.success("Perfil salvo com sucesso!");
    } catch (err: any) {
      if (err?.response?.status === 404) {
        toast.info(
          "Atualização local aplicada (endpoint /users/me ainda não disponível).",
        );
      } else {
        toast.error("Não foi possível salvar seu perfil.");
      }
    } finally {
      setIsSaving(false);
    }
  }, []);

  const deleteAvatar = useCallback(async () => {
    setIsSaving(true);
    try {
      await deleteMyAvatar();
      setProfile((p) => ({ ...(p ?? {}), avatar_url: null }));
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    isSaving,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
  };
}
