/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/client.ts
/* Centraliza Axios + tokens + interceptors (refresh com fila). */
import axios, { AxiosError, AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const ACCESS_KEY = "ga.accessToken";
const REFRESH_KEY = "ga.refreshToken";

export const getStoredTokens = () => ({
  accessToken: localStorage.getItem(ACCESS_KEY) || "",
  refreshToken: localStorage.getItem(REFRESH_KEY) || "",
});

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // habilite se sua API usar cookies
});

/* ===== Refresh com fila ===== */
let isRefreshing = false;
let pendingQueue: Array<(newAccess: string) => void> = [];
const processQueue = (newAccess: string) => {
  pendingQueue.forEach((resolve) => resolve(newAccess));
  pendingQueue = [];
};

/* Injeta Authorization */
api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens();
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* Tenta refresh automático em 401 */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original: any = error.config;
    const status = error.response?.status;

    if (status === 401 && !original?._retry) {
      original._retry = true;

      const { refreshToken } = getStoredTokens();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // aguarda o refresh em andamento
        return new Promise((resolve) => {
          pendingQueue.push((newAccess) => {
            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${newAccess}`;
            resolve(api(original));
          });
        });
      }

      try {
        isRefreshing = true;

        // use axios "cru" para não cair no próprio interceptor
        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        setTokens(data.accessToken, data.refreshToken);
        isRefreshing = false;
        processQueue(data.accessToken);

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (err) {
        isRefreshing = false;
        clearTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
