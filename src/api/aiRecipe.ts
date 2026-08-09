import type {
  AiRecipeResponse,
  Feature,
  RetryAiRecipeRequest,
} from "@/types/aiRecipe";

import api from "./axios";

export interface ApiResponseEnvelope<T> {
  status: string;
  timestamp: string;
  data: T;
}

export interface GenerateAiRecipeRequest {
  sessionId?: number;
  feature?: Feature;
  ingredientIds: number[];
}

const extractData = <T>(response: any): T => {
  if (response?.data && "data" in response.data) {
    return response.data.data as T;
  }
  return response?.data as T;
};

export const generateAiRecipe = async (
  // TODO: 난이도 선택 값 없어서 오류남 추후 수정 필요
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes",
    body,
    { timeout: 60000 },
  );

  return extractData<AiRecipeResponse>(response);
};

export const generateRandomAiRecipe = async (): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/random",
    {},
    { timeout: 60000 },
  );

  return extractData<AiRecipeResponse>(response);
};

export const retryAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/recipes/retry",
    body,
    { timeout: 60000 },
  );
  return extractData<AiRecipeResponse>(response);
};

export const retryRandomAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/recipes/random/retry",
    body,
    { timeout: 60000 },
  );
  return extractData<AiRecipeResponse>(response);
};

export const completeAiRecipe = async (sessionId: number) => {
  const response = await api.post(
    `/api/users/me/ai/recipes/${sessionId}/complete`,
    { sessionId },
  );
  return response.data;
};
