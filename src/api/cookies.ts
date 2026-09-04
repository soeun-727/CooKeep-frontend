import axios from "./axios";

export interface CookieReward {
  granted: boolean;
  points: number;
  types: string[];
  currentCookieCount: number;
}

export const getMyCookies = async (): Promise<number> => {
  const res = await axios.get("/api/users/me/cookies");
  return res.data.data; // number
};

export const claimPendingReward = async (
  pendingRewardId: number,
): Promise<CookieReward> => {
  const res = await axios.post(`/api/cookies/pending/${pendingRewardId}/claim`);
  return res.data.data.reward; // 최종 쿠키 개수
};
