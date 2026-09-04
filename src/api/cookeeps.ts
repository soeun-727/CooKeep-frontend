import api from "./axios";
import { RecipeStep } from "./dailyAiRecipe";

export interface RecipeRankItem {
  dailyRecipeId: number;
  likeCount: number;
  rank: number;
  recipeImageUrl: string | null;
  title: string;
  nickname: string;
  description?: string | null;
}

export interface WateringRankItem {
  nickname: string;
  profileImageUrl: string;
  rank: number;
  wateringCount: number;
}

export interface WeeklyRecipesResponse {
  content: RecipeRankItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean; // 무한 스크롤 중단 판별용
  number: number; // 현재 페이지 번호
}

/** user_ingredients 전용: 유저가 보유한 재료 */
export interface UserIngredientItem {
  name: string;
  unit: string;
  quantity: number;
  ingredientId: number;
}

/** optional_ingredients / additional_ingredients 공용 */
export interface ExtraIngredientItem {
  name: string;
  unit: string;
  quantity: number;
  description?: string | null;
}

export interface RecipeDetailContent {
  ingredients: {
    user_ingredients: UserIngredientItem[];
    optional_ingredients: ExtraIngredientItem[];
    additional_ingredients: ExtraIngredientItem[];
  };
  steps: RecipeStep[];
  youtubeReferences: {
    url: string;
    title: string;
    thumbnail: string;
  }[];
  youtubeSearchQueries: string[];
}

export interface WeeklyRecipeDetailResponse {
  content: RecipeDetailContent;
  createdAt: string;
  dailyRecipeId: number;
  description: string | null;
  likeCount: number;
  nickname: string;
  recipeImageUrl: string | null;
  title: string;
  liked: boolean;
  bookmarked: boolean;
  category?: string; // TODO: 백엔드 응답에 추가되면 optional(?) 제거
}

/** [GET] 이번 주 공개 레시피 상세 조회 */
export const getWeeklyRecipeDetail = async (dailyRecipeId: string) => {
  const res = await api.get<{ data: WeeklyRecipeDetailResponse }>(
    `/api/cookeeps/recipes/${dailyRecipeId}`,
  );
  return res.data.data;
};

/** [GET] 이번 주 전체 레시피 목록 조회 (필터/페이징) */
export const getWeeklyRecipesAll = async (
  filter: "likes" | "latest" | "oldest" = "likes",
  page: number = 0,
  size: number = 10,
): Promise<WeeklyRecipesResponse> => {
  const res = await api.get("/api/cookeeps/recipes/weekly", {
    params: { filter, page, size },
  });
  return res.data.data;
};

export interface AllRecipeItem {
  dailyRecipeId: number;
  title: string;
  likeCount: number;
  recipeImageUrl: string | null;
  createdAt: string;
  nickname: string;
}

export interface AllRecipesResponse {
  content: AllRecipeItem[];
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
}

// 전체 레시피 목록 조회
export const getAllRecipes = async (
  filter: "likes" | "latest" | "oldest" = "latest",
  page: number = 0,
  size: number = 20,
): Promise<AllRecipesResponse> => {
  const res = await api.get("/api/cookeeps/recipes", {
    params: { filter, page, size },
  });
  return res.data.data;
};

export interface WateringRankingResponse {
  wateringRanking: WateringRankItem[];
  myWateringCount: number;
}

export interface RecipeRankingResponse {
  recipeRanking: RecipeRankItem[];
}

/** [GET] 이번 달 물주기 랭킹 조회 */
export const getWateringRanking =
  async (): Promise<WateringRankingResponse> => {
    const res = await api.get<{ data: WateringRankingResponse }>(
      "/api/cookeeps/ranking/watering",
    );
    return res.data.data;
  };

/** [GET] 이번 주 인기 레시피 랭킹 조회 */
export const getRecipeRanking = async (): Promise<RecipeRankingResponse> => {
  const res = await api.get<{ data: RecipeRankingResponse }>(
    "/api/cookeeps/ranking/recipes",
  );
  return res.data.data;
};

/** [GET] 온보딩 완료 여부 조회 */
export const getOnboardingStatus = () => {
  return api.get<{ status: string; data: { cookeepsOnboarded: boolean } }>(
    "/api/cookeeps/onboarding",
  );
};

/** [PATCH] 온보딩 완료 상태 업데이트 */
export const updateOnboardingStatus = () => {
  return api.patch<{ status: string; message: string }>(
    "/api/cookeeps/onboarding",
  );
};
