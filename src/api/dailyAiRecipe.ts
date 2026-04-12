import api from "./axios";

export interface DailyAiRecipe {
  aiRecipeId: number;
  title: string;
  isPinned: boolean;
  createdAt: string;
}

// src/api/dailyAiRecipe.ts

export interface Ingredient {
  name: string;
  unit: string;
  quantity: number;
  description?: string | null;
  type?: string;
  referenceId?: number;
}

export interface IngredientsJson {
  user_ingredients: Ingredient[]; // 내가 가진 재료
  additional_ingredients: Ingredient[]; // 추가 필요 재료
  optional_ingredients: Ingredient[]; // 선택/대체 재료
}

export interface YoutubeVideo {
  url: string;
  title: string;
  thumbnail: string;
}

export interface AiRecipeDetail {
  aiRecipeId: number;
  title: string;
  createdAt: string;
  ingredientsJson: IngredientsJson;
  stepsJson: string[];
  youtubeUrlJson: YoutubeVideo[];
  youtubeSearchQueries: string;
}

export interface AiRecipeDetailResponse {
  status: string;
  data: AiRecipeDetail;
}

/** [GET] 채택된 AI 레시피 상세 조회 */
export const getAiRecipeDetail = async (aiRecipeId: number) => {
  const res = await api.get<AiRecipeDetailResponse>(
    `/api/users/me/daily-recipes/ai-recipes/${aiRecipeId}`,
  );
  return res.data;
};

export const getDailyAiRecipes = async (): Promise<DailyAiRecipe[]> => {
  const res = await api.get("/api/users/me/daily-recipes/ai-recipes");
  return res.data.data;
};
