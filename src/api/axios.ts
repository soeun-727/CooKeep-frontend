import { refreshAccessToken } from "@/api/auth.api";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { clearTokens, getAccessToken } from "@/utils/auth";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  withCredentials: true,
});

let isRefreshing = false;

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token && config.headers) {
    const hasBearer = token.startsWith("Bearer ");
    config.headers.Authorization = hasBearer ? token : `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError<{ code?: string }>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;
    const isUnauthorized =
      error.response?.status === 401 ||
      error.response?.data?.code === "AUTH-001";

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("refresh") || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isUnauthorized) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        if (originalRequest.data && typeof originalRequest.data === "string") {
          try {
            originalRequest.data = JSON.parse(originalRequest.data);
          } catch {
            // 직렬화된 요청 본문을 그대로 사용합니다.
          }
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();

        const { useAuthStore } = await import("../stores/useAuthStore");
        useAuthStore.getState().logout();

        const publicPaths = ["/", "/login", "/signup", "/onboarding"];
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
