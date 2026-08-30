export function saveTokens(params: { accessToken: string }) {
  localStorage.setItem("accessToken", params.accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
}
