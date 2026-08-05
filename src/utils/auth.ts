export function saveTokens(params: { accessToken: string }) {
  localStorage.setItem("accessToken", params.accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  // 기존 클라이언트에서 저장했던 refresh token도 마이그레이션 시 제거합니다.
  localStorage.removeItem("refreshToken");
}
