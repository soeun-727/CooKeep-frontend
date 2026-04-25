// src/stores/useRecipeFlowStore.ts
import { create } from "zustand";
import type { Ingredient } from "./useIngredientStore";
import type { AiRecipeResponse, Difficulty } from "../types/aiRecipe";
import {
  completeAiRecipe,
  generateAiRecipe,
  retryAiRecipe,
} from "../api/aiRecipe";
import { getAiSessionDetail } from "../api/aiSession";
import { useRewardStore } from "./useRewardStore";
import type { RewardType } from "./useRewardStore";

import axios from "axios";

const parseAiError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  const status = error.response?.status;
  const code = error.response?.data?.code;

  if (status === 429) {
    return "AI 요청 횟수를 초과했어요. 잠시 후 다시 시도해주세요.";
  }

  if (status === 400 && code === "AI_RECIPE_CHANGE_LIMIT_EXCEEDED") {
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

  WEEKLY: 1, // A
  EXPIRING: 2, // B
  COMEBACK: -1, // 우선순위 제일 높음
};

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: Difficulty | null;

  sessionId: number | null;
  retryCount: number;

  recipeHistory: AiRecipeResponse[];

  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: Difficulty) => void;
  generateRecipe: () => Promise<void>;
  reset: () => void;

  fetchSessionDetail: (sessionId: number) => Promise<void>;
  completeSession: () => Promise<void>; // 타입 정의 추가

  hasExpiringIngredient: boolean;

  // 작동안해서 넣어놓음
  // clearSelection: () => void;
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

  setSelectedIngredients: (items) => set({ selectedIngredients: items }),

  setDifficulty: (difficulty) => set({ difficulty }),

  generateRecipe: async () => {
    const { selectedIngredients, difficulty, sessionId, recipeHistory } = get();

    const hasDdayIngredient = selectedIngredients.some((i) => i.dDay === 0);

    set({
      hasExpiringIngredient: hasDdayIngredient,
    });

    if (!difficulty) return;

    try {
      set({ isLoading: true, error: null }); // 로딩 시작

      let response: AiRecipeResponse;

      if (sessionId === null) {
        // 처음 생성 시
        response = await generateAiRecipe({
          ingredientIds: selectedIngredients.map((i) => i.id),
          difficulty,
        });
      } else {
        // 재요청(Retry) 시
        response = await retryAiRecipe({
          sessionId,
          difficulty,
          ingredientIds: selectedIngredients.map((i) => i.id),
        });
      }

      set({
        sessionId: response.sessionId,
        retryCount: response.changeCount,
        recipeHistory: [...recipeHistory, response],
        isLoading: false, // 로딩 종료
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
      set({ isLoading: true });
      const data = await getAiSessionDetail(sessionId);

      // AI가 응답한 content(JSON 문자열)를 AiRecipeResponse 구조로 변환
      const parsedHistory: AiRecipeResponse[] = data.messages
        .filter((msg) => msg.role === "AI")
        .map((msg) => {
          try {
            const parsed = JSON.parse(msg.content);

            // API 응답의 content 내부에 이미 sessionId 등이 포함되어 있다면 그대로 사용,
            // 만약 recipe 정보만 들어있다면 형식을 맞춰줍니다.
            return {
              sessionId: data.sessionId,
              changeCount: 0, // 상세 조회 시점에서는 기본값 설정
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

      set({
        sessionId,
        recipeHistory: parsedHistory,
        isCompleted: data.completed,
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
      set({ isLoading: true });
      const response = await completeAiRecipe(sessionId);

      const rewards: RewardType[] = [];

      // 1. 온보딩 (최우선)
      if (response?.recipeRewardGranted) {
        rewards.push("ONBOARDING_RECIPE");
      }

      // 2. 주간 목표
      if (response?.weeklyGoalAchieved) {
        rewards.push("WEEKLY");
      }

      // 3. 유통기한 임박
      if (response?.urgentIngredientRewardGranted) {
        rewards.push("EXPIRING");
      }

      // 우선순위 정렬
      rewards.sort((a, b) => PRIORITY[a] - PRIORITY[b]);

      // 순서대로 enqueue
      rewards.forEach((r) => {
        useRewardStore.getState().enqueue(r);
      });

      set({ isCompleted: true, isLoading: false });
    } catch (error) {
      console.error("레시피 채택 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  // clearSelection: () =>
  //   set({
  //     selectedIngredients: [],
  //   }),
}));
