import {
  completeAiRecipe,
  generateAiRecipe,
  generateRandomAiRecipe,
  retryAiRecipe,
  retryRandomAiRecipe,
} from "@/api/aiRecipe";
import { getAiSessionDetail } from "@/api/aiSession";
import axios from "axios";
import { create } from "zustand";

import type { AiRecipeResponse, RecipeCategory } from "@/types/aiRecipe";

import type { Ingredient } from "./useIngredientStore";
import { useRewardStore } from "./useRewardStore";
import type { RewardType } from "./useRewardStore";

const parseAiError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  const status = error.response?.status;
  const code = error.response?.data?.code;

  if (status === 429) {
    return "AI 요청 횟수를 초과했어요. 잠시 후 다시 시도해주세요.";
  }

  const isLimitExceeded =
    status === 400 && code === "AI_RECIPE_CHANGE_LIMIT_EXCEEDED";
  if (isLimitExceeded) {
    return "레시피 재생성은 최대 5번까지 가능합니다.";
  }

  if (status === 401) {
    return "로그인이 만료되었습니다.";
  }

  return "레시피 생성 중 문제가 발생했어요.";
};

const PRIORITY: Record<RewardType, number> = {
  ONBOARDING_INGREDIENT: 0,
  ONBOARDING_RECIPE: 0,
  WEEKLY: 1,
  EXPIRING: 2,
  COMEBACK: -1,
};

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: RecipeCategory | null;

  sessionId: number | null;
  retryCount: number;

  recipeHistory: AiRecipeResponse[];

  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: RecipeCategory | null) => void;

  generateRecipe: () => Promise<void>;
  reset: () => void;

  fetchSessionDetail: (sessionId: number) => Promise<void>;
  completeSession: () => Promise<void>;

  hasExpiringIngredient: boolean;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set, get) => ({
  selectedIngredients: [],
  difficulty: null,

  sessionId: null,
  retryCount: 0,

  recipeHistory: [],

  isLoading: false,
  error: null,
  isCompleted: false,
  hasExpiringIngredient: false,

  setSelectedIngredients: items => set({ selectedIngredients: items }),

  setDifficulty: difficulty => set({ difficulty }),

  generateRecipe: async () => {
    set({ error: null });

    const { selectedIngredients, difficulty, sessionId, recipeHistory } = get();

    const hasDdayIngredient = selectedIngredients.some(i => i.dDay === 0);

    set({
      hasExpiringIngredient: hasDdayIngredient,
    });

    if (!difficulty) return;

    try {
      set({ isLoading: true });

      let response: AiRecipeResponse;
      const apiDifficulty =
        (difficulty as string) === "RANDOM" ? undefined : difficulty;

      if (sessionId === null) {
        if (difficulty === ("RANDOM" as any)) {
          response = await generateRandomAiRecipe();
        } else {
          response = await generateAiRecipe({
            ingredientIds: selectedIngredients.map(i => i.id),
            feature: apiDifficulty as any,
          });
        }
      } else {
        if (difficulty === ("RANDOM" as any)) {
          response = await retryRandomAiRecipe({
            sessionId,
          });
        } else {
          response = await retryAiRecipe({
            sessionId,
          });
        }
      }

      set({
        sessionId: response.sessionId,
        retryCount: response.changeCount,
        recipeHistory: [...recipeHistory, response],
        isLoading: false,
      });
    } catch (error) {
      const message = parseAiError(error);

      set({
        isLoading: false,
        error: message,
      });

      throw error;
    }
  },

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      sessionId: null,
      retryCount: 0,
      recipeHistory: [],
      error: null,
      isCompleted: false,
    }),

  fetchSessionDetail: async (sessionId: number) => {
    try {
      set({ isLoading: true, error: null });
      const data = await getAiSessionDetail(sessionId);

      const parsedHistory: AiRecipeResponse[] = data.messages
        .filter(msg => msg.role === "AI")
        .map(msg => {
          try {
            const parsed = JSON.parse(msg.content);
            return {
              sessionId: data.sessionId,
              changeCount: 0,
              feature: data.feature ?? parsed.feature ?? "ANY",
              recipe: parsed.recipe || parsed,
              youtubeReferences:
                parsed.youtubeReferences ?? parsed.youtube_references ?? [],
            };
          } catch (e) {
            console.error("JSON 파싱 에러:", e);
            return null;
          }
        })
        .filter((item): item is AiRecipeResponse => item !== null);

      const finalFeature =
        data.feature ??
        parsedHistory[parsedHistory.length - 1]?.feature ??
        "ANY";

      set({
        sessionId,
        recipeHistory: parsedHistory,
        isCompleted: data.completed,
        difficulty: finalFeature as RecipeCategory,
        isLoading: false,
      });
    } catch (error) {
      console.error("세션 상세 조회 실패:", error);
      set({ isLoading: false });
    }
  },

  completeSession: async () => {
    const { sessionId } = get();
    if (!sessionId) {
      console.error("세션 ID가 없습니다.");
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const response = await completeAiRecipe(sessionId);

      const rewards: RewardType[] = [];
      const types = response?.reward?.types || [];

      if (types.includes("ONBOARDING_RECIPE")) {
        rewards.push("ONBOARDING_RECIPE");
      }

      if (types.includes("BONUS_WEEKLY_GOAL_ACHIEVE")) {
        rewards.push("WEEKLY");
      }

      if (types.includes("BONUS_URGENT_INGREDIENT_USE")) {
        rewards.push("EXPIRING");
      }

      rewards.sort((a, b) => PRIORITY[a] - PRIORITY[b]);

      rewards.forEach(r => {
        useRewardStore.getState().enqueue(r);
      });

      set({ isCompleted: true, isLoading: false });
    } catch (error) {
      console.error("레시피 채택 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
