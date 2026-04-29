import api from "./axios";
import type { GoalActionType } from "../utils/mapping";

/** 타입 정의 */
export interface UpdateGoalRequest {
  goalActionType: GoalActionType;
  targetCount: number;
}

export interface ProfileData {
  daysSinceJoined: number;
  growingPlantName: string;
  nickname: string;
  profilePlantImageUrl: string;
  weeklyGoal: {
    achieved: boolean;
    currentCount: number;
    goalActionType:
      | "COOKING"
      | "RECIPE_SAVE"
      | "RECIPE_LIKE"
      | "INGREDIENT_MANAGEMENT";
    targetCount: number;
  };
}

export interface ProfileResponse {
  status: string;
  timestamp: string;
  data: ProfileData;
}

export interface MyProfileResponse {
  status: string;
  timestamp: string;
  data: {
    Nickname: string;
    phoneNumber: string;
    email: string;
    authProvider: "LOCAL" | "KAKAO" | "GOOGLE";
    marketingPush: boolean;
  };
}

/** API 함수들 */

// 1. 주간 목표 재설정 API
export const updateWeeklyGoal = async (data: UpdateGoalRequest) => {
  const res = await api.post("/api/my-cookeep/weekly-goal", data);
  return res.data;
};

// 2. 프로필 정보 조회 API
export const getProfileInfo = async (): Promise<ProfileResponse> => {
  const res = await api.get<ProfileResponse>("/api/my-cookeep/profile");
  return res.data;
};

// 3. 닉네임 수정 API
export const updateNickname = async (nickname: string) => {
  const res = await api.patch("/api/users/me/nickname", {
    nickname,
  });
  return res.data;
};

/** [GET] 유통기한 임박 식재료 존재 여부 확인 (팝업 노출 자격) */
export const getPushEligibility = async () => {
  const res = await api.get<{
    status: string;
    data: { eligible: boolean };
  }>("/api/users/me/alerts");

  return res.data.data;
};

// 4. 회원 정보 조회 API
export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const res = await api.get<MyProfileResponse>("/api/users/me/profile");
  return res.data;
};

// 5. 마케팅 푸시 동의 변경 API
export const updateMarketingPush = async (marketingPush: boolean) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/marketing-push", {
    marketingPush,
  });

  return res.data;
};

// 6. 이메일 변경 API
export const updateEmail = async (email: string) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/email", {
    email,
  });

  return res.data;
};

// 이메일 변경 인증 관련 (신규)
export const sendUpdateEmailCode = async (email: string) => {
  const res = await api.post("/api/users/me/email/send-code", { email });
  return res.data;
};

export const verifyUpdateEmailCode = async (email: string, code: string) => {
  const res = await api.post("/api/users/me/email/verify-code", {
    email,
    code,
  });
  return res.data;
};

/** 전화번호 변경 인증 관련 */
export const sendUpdatePhoneCode = async (phoneNumber: string) => {
  const res = await api.post("/api/users/me/phone/send-code", { phoneNumber });
  return res.data;
};

export const verifyUpdatePhoneCode = async (
  phoneNumber: string,
  code: string,
) => {
  const res = await api.post("/api/users/me/phone/verify-code", {
    phoneNumber,
    code,
  });
  return res.data;
};

/** 비밀번호 관련 */
export const verifyCurrentPassword = async (password: string) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/verify", {
    password,
  });
  return res.data;
};

export const changePassword = async (
  password: string,
  passwordConfirm: string,
) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password", {
    password,
    passwordConfirm,
  });
  return res.data;
};

export const sendPasswordChangeCode = async (email: string) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/send-code", {
    email,
  });
  return res.data;
};

export const verifyPasswordChangeCode = async (email: string, code: string) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/verify-code", {
    email,
    code,
  });
  return res.data;
};
