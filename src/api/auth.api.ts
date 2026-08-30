// src/apis/auth.api.ts
import { useRewardStore } from "@/stores/useRewardStore";
import axios from "axios";

import { saveTokens } from "@/utils/auth";

export async function refreshAccessToken() {
  const baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE_URL;

  const res = await axios.post(`${baseURL}/api/auth/refresh`, undefined, {
    withCredentials: true,
  });

  // const newAccessToken = res.data.data.accessToken;
  const { accessToken, isRewarded } = res.data.data; // 변경

  // 핵심 추가
  if (isRewarded) {
    useRewardStore.getState().enqueue("COMEBACK");
  }
  saveTokens({
    accessToken,
  });

  return accessToken;
}
