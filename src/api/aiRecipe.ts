import type { AiRecipeResponse, Difficulty } from "@/types/aiRecipe";
import api from "./axios";

interface GenerateAiRecipeRequest {
  ingredientIds?: number[];
  difficulty?: Difficulty;
  sessionId?: number;
}

// 1. AI 레시피 생성
export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post(
    "/api/users/me/ai/recipes",
    body,
    { timeout: 60000 }, // AI 연산 대기를 위한 60초 타임아웃
  );

  return response.data;
};

// 2. AI 랜덤 레시피 생성 (냉장고 전체 재료 기반)
export const generateRandomAiRecipe = async (): Promise<AiRecipeResponse> => {
  const response = await api.post(
    "/api/users/me/ai/recipes/random",
    {}, // POST 요청이므로 빈 body를 전달합니다.
    { timeout: 60000 }, // AI 연산 대기를 위한 60초 타임아웃 동일 적용
  );

  return response.data;
};

// 3. AI 레시피 재생성
export const retryAiRecipe = async (body: {
  sessionId: number;
  difficulty: Difficulty;
  ingredientIds: number[];
}): Promise<AiRecipeResponse> => {
  const response = await api.post("/api/users/me/ai/recipes/retry", body, {
    timeout: 60000,
  });
  return response.data;
};

// 4. AI 레시피 채택
export const completeAiRecipe = async (sessionId: number) => {
  const response = await api.post(
    `/api/users/me/ai/recipes/${sessionId}/complete`,
  );
  return response.data;
};
