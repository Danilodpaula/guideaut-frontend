import api from "./client";


export type MeResponse = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  avatarUrl?: string | null;
};

export type UpdateProfileRequest = {
  display_name?: string;
  bio?: string;
};

const toAbsolute = (url?: string | null) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = (api.defaults.baseURL ?? "").replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
};

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/me");
  return { ...data, avatarUrl: toAbsolute(data.avatarUrl) };
}

export async function uploadMyAvatar(
  file: File
): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append("file", file);

  const { data } = await api.post<{ url: string }>(
    "/users/me/avatar",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return { url: toAbsolute(data.url) ?? data.url };
}

export async function deleteMyAvatar(): Promise<void> {
  await api.delete("/users/me/avatar");
}

/**
 * Se seu backend ainda não tiver esse endpoint,
 * o hook trata 404 como "atualização local".
 */
export async function updateMyProfile(
  payload: UpdateProfileRequest
): Promise<void> {
  await api.patch("/users/me", payload);
}
