// src/apis/auth.api.ts
import axios from "axios";
import { getRefreshToken, saveTokens } from "../utils/auth";
import { useRewardStore } from "../stores/useRewardStore";

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  const res = await axios.post(`${baseURL}/api/auth/refresh`, {
    refreshToken,
  });

  // const newAccessToken = res.data.data.accessToken;
  const { accessToken, isRewarded } = res.data.data; // 변경

  // 핵심 추가
  if (isRewarded) {
    useRewardStore.getState().enqueue("COMEBACK");
  }
  saveTokens({
    accessToken,
    refreshToken,
  });

  return accessToken;
}
