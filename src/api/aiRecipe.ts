import type {
  AiRecipeResponse,
  Feature,
  RetryAiRecipeRequest,
} from "@/types/aiRecipe";
import api from "./axios";

export interface GenerateAiRecipeRequest {
  sessionId?: number;
  feature?: Feature;
  ingredientIds: number[];
}

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

export const generateRandomAiRecipe = async (): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/ai/recipes/random",
    {},
    { timeout: 60000 },
  );

  return response.data;
};

export const retryAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/recipes/retry",
    body,
    { timeout: 60000 },
  );
  return response.data;
};

export const retryRandomAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<AiRecipeResponse>(
    "/api/users/me/recipes/random/retry",
    body,
    { timeout: 60000 },
  );
  return response.data;
};

export const completeAiRecipe = async (sessionId: number) => {
  const response = await api.post(
    `/api/users/me/ai/recipes/${sessionId}/complete`,
  );
  return response.data;
};
