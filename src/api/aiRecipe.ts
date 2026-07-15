import type { AiRecipeResponse, Difficulty, Feature } from "@/types/aiRecipe"; // Feature 타입이 정의되어 있다면 추가 임포트
import api from "./axios";

export interface GenerateAiRecipeRequest {
  sessionId?: number;
  feature?: Feature;
  ingredientIds: number[];
  difficulty?: Difficulty;
}

// 1. AI 레시피 생성 (재료 직접 선택 기반)
export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/ai/recipes",
    body,
    { timeout: 60000 },
  );

  return response.data;
};

// 2. AI 랜덤 레시피 생성 (냉장고 전체 재료 기반)
export const generateRandomAiRecipe = async (): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/ai/recipes/random",
    {},
    { timeout: 60000 },
  );

  return response.data;
};

// 3. AI 레시피 재생성
export const retryAiRecipe = async (body: {
  sessionId: number;
  difficulty: Difficulty;
  ingredientIds: number[];
}): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/ai/recipes/retry",
    body,
    { timeout: 60000 },
  );
  return response.data;
};

// 4. AI 레시피 채택
export const completeAiRecipe = async (sessionId: number) => {
  const response = await api.post(
    `/api/users/me/ai/recipes/${sessionId}/complete`,
  );
  return response.data;
};
