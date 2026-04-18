import api from "./axios";

/** --- 타입 정의 --- */

export interface OnboardingIngredient {
  defaultIngredientId: number;
  ingredient: string; // 재료 이름
}

export interface OnboardingResponse {
  status: string;
  timestamp: string;
  data: {
    ingredients: OnboardingIngredient[];
  };
}

export interface OnboardingSaveRequest {
  dislikedIngredients: string[]; // 기피 식재료 이름 리스트
  goalActionType: string | null; // 예: "COOKING", "PHOTO" 등
  targetCount: number | null; // 목표 횟수 (숫자)
}

/** --- API 함수들 --- */

/** 1. [GET] 온보딩용 전체 식재료 목록 조회 */
export const getOnboardingIngredients = () => {
  return api.get<OnboardingResponse>("/api/users/me/onboarding/ingredients");
};

/** 2. [POST] 온보딩 데이터 최종 저장 (기피 식재료, 목표 포함) */
export const saveOnboardingData = (data: OnboardingSaveRequest) => {
  return api.post("/api/users/me/onboarding", data);
};

/** 3. [PATCH] 약관 동의 여부 저장 (소셜 로그인 회원 등 대상) */
export const updateAgreements = (marketingConsent: boolean) => {
  return api.patch<{ status: string; timestamp: string }>(
    `/api/users/me/agreements`,
    { marketingConsent },
  );
};

/** 4. [PATCH] 온보딩 과정 중 푸시 알림 동의 수정 */
export const updatePushConsent = (marketingConsent: boolean) => {
  return api.patch("/api/users/me/onboarding/push", { marketingConsent });
};
