import api from "./axios";

export interface RecipeRankItem {
  dailyRecipeId: number;
  likeCount: number;
  rank: number;
  recipeImageUrl: string | null;
  title: string;
  nickname: string; // 추가
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

export interface IngredientItem {
  name: string;
  unit: string;
  quantity: number;
  description?: string | null;
  type?: string;
  referenceId?: number;
}

export interface RecipeDetailContent {
  ingredients: {
    user_ingredients: IngredientItem[];
    optional_ingredients: IngredientItem[];
    additional_ingredients: IngredientItem[];
  };
  steps: string[];
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

export interface RankingResponse {
  myWateringCount: number;
  recipeRanking: RecipeRankItem[];
  wateringRanking: WateringRankItem[];
}

/** [GET] 이번 주 랭킹 조회 (물주기 Top 3, 레시피 좋아요 Top 3) */
export const getWeeklyRanking = async () => {
  const res = await api.get<{ data: RankingResponse }>("/api/cookeeps/ranking");
  return res.data.data;
};

// api/cookeeps.ts

/** [GET] 온보딩 완료 여부 조회 */
export const getOnboardingStatus = () => {
  return api.get<{ status: string; data: { isCookeepsOnboarded: boolean } }>(
    "/api/cookeeps/onboarding",
  );
};

/** [PATCH] 온보딩 완료 상태 업데이트 */
export const updateOnboardingStatus = () => {
  return api.patch<{ status: string; message: string }>(
    "/api/cookeeps/onboarding",
  );
};
