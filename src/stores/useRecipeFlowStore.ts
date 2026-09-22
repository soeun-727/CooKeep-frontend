import {
  cancelAiRecipe,
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
import { enqueueGlobalRewards } from "@/utils/cookieReward";

const parseAiError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  const status = error.response?.status;
  const code = error.response?.data?.code;

  if (status === 429 || code === "USER_RATE_LIMIT_EXCEEDED") {
    return "AI 생성 횟수(1분당 3회)를 초과했어요. 잠시 후 다시 시도해주세요.";
  }

  const isLimitExceeded =
    (status === 400 || status === 403) &&
    code === "AI_RECIPE_CHANGE_LIMIT_EXCEEDED";
  if (isLimitExceeded) {
    return "레시피 재생성은 최대 5번까지 가능합니다.";
  }

  if (status === 401) {
    return "로그인이 만료되었습니다.";
  }

  return "레시피 생성 중 문제가 발생했어요.";
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

  currentRequestId: string | null;
  abortController: AbortController | null;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: RecipeCategory | null) => void;

  generateRecipe: () => Promise<void>;
  cancelRecipe: () => Promise<void>;
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

  currentRequestId: null,
  abortController: null,

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

    const requestId = crypto.randomUUID();
    const controller = new AbortController();

    try {
      set({
        isLoading: true,
        currentRequestId: requestId,
        abortController: controller,
      });

      let response: AiRecipeResponse;
      const apiDifficulty = difficulty === "RANDOM" ? undefined : difficulty;
      const options = { requestId, signal: controller.signal };

      if (sessionId === null) {
        if (difficulty === "RANDOM") {
          response = await generateRandomAiRecipe(options);
        } else {
          response = await generateAiRecipe(
            {
              ingredientIds: selectedIngredients.map(i => i.id),
              feature: apiDifficulty,
            },
            options,
          );
        }
      } else {
        if (difficulty === "RANDOM") {
          response = await retryRandomAiRecipe(
            {
              sessionId,
            },
            options,
          );
        } else {
          response = await retryAiRecipe(
            {
              sessionId,
            },
            options,
          );
        }
      }

      // 백엔드가 200 OK로 AI_GENERATION_CANCELLED 에러 응답을 내려준 경우 방어
      if (
        (response as unknown as { code?: string })?.code ===
        "AI_GENERATION_CANCELLED"
      ) {
        set({
          isLoading: false,
          currentRequestId: null,
          abortController: null,
        });
        return;
      }

      set({
        sessionId: response.sessionId,
        retryCount: response.changeCount,
        recipeHistory: [...recipeHistory, response],
        isLoading: false,
        currentRequestId: null,
        abortController: null,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        set({
          isLoading: false,
          currentRequestId: null,
          abortController: null,
        });
        throw error;
      }

      const message = parseAiError(error);

      set({
        isLoading: false,
        error: message,
        currentRequestId: null,
        abortController: null,
      });

      throw error;
    }
  },

  cancelRecipe: async () => {
    const { currentRequestId, abortController } = get();

    // 1. 브라우저 네트워크 연결 즉시 중단 (Abort)
    if (abortController) {
      abortController.abort();
    }

    // 2. 백엔드 취소 API 호출 (진행 중인 Gemini/유튜브 검색 즉시 중단, 슬롯 반환, DB 롤백)
    if (currentRequestId) {
      try {
        await cancelAiRecipe(currentRequestId);
      } catch (err) {
        console.error("레시피 생성 취소 요청 실패:", err);
      }
    }

    set({
      isLoading: false,
      currentRequestId: null,
      abortController: null,
    });
  },

  reset: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }

    set({
      selectedIngredients: [],
      difficulty: null,
      sessionId: null,
      retryCount: 0,
      recipeHistory: [],
      error: null,
      isCompleted: false,
      currentRequestId: null,
      abortController: null,
    });
  },

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

      enqueueGlobalRewards(response?.reward);

      set({ isCompleted: true, isLoading: false });
    } catch (error) {
      console.error("레시피 채택 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
