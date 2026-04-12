import axios from "axios";
import { getAccessToken, clearTokens } from "../utils/auth";
import { refreshAccessToken } from "../api/auth.api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    const hasBearer = token.startsWith("Bearer ");
    config.headers.Authorization = hasBearer ? token : `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized =
      error.response?.status === 401 ||
      error.response?.data?.code === "AUTH-001";

    if (isUnauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            const hasBearer = (token as string).startsWith("Bearer ");
            originalRequest.headers.Authorization = hasBearer
              ? token
              : `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          const hasBearer = newAccessToken.startsWith("Bearer ");
          originalRequest.headers.Authorization = hasBearer
            ? newAccessToken
            : `Bearer ${newAccessToken}`;
        }

        if (originalRequest.data && typeof originalRequest.data === "string") {
          try {
            originalRequest.data = JSON.parse(originalRequest.data);
          } catch (e) {}
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        clearTokens();
        import("../stores/useAuthStore").then((module) => {
          module.useAuthStore.getState().logout();
        });

        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/auth")
        ) {
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
