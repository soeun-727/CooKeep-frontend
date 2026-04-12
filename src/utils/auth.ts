// src/utils/auth.ts
export function saveTokens(params: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem("accessToken", params.accessToken);
  localStorage.setItem("refreshToken", params.refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
