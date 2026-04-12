import { create } from "zustand";
import {
  getAiRecipeSessions,
  AiRecipeSessionItem,
  toggleFavoriteSession,
  updateAiSessionTitle,
  deleteAiRecipeSession,
} from "../api/aiSession";

interface RecipeState {
  pinned: AiRecipeSessionItem[];
  sessions: AiRecipeSessionItem[];
  isLoading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;
  toggleLike: (sessionId: number) => Promise<void>;
  renameRecipe: (sessionId: number, newTitle: string) => Promise<void>;
  deleteSession: (sessionId: number) => Promise<void>;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  pinned: [],
  sessions: [],
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    try {
      set({ isLoading: true, error: null });

      const data = await getAiRecipeSessions();

      set({
        pinned: data.pinned,
        sessions: data.sessions,
        isLoading: false,
      });
    } catch (error) {
      console.error("세션 목록 조회 실패:", error);
      set({
        error: "세션 목록을 불러오지 못했습니다.",
        isLoading: false,
      });
    }
  },

  toggleLike: async (sessionId: number) => {
    try {
      await toggleFavoriteSession(sessionId);

      // 서버에서 다시 데이터를 가져오거나 로컬에서 위치를 옮겨줍니다.
      // 여기서는 가장 정확한 방법인 재조회(fetch) 방식을 권장합니다.
      const data = await getAiRecipeSessions();
      set({
        pinned: data.pinned,
        sessions: data.sessions,
      });
    } catch (error) {
      console.error("즐겨찾기 변경 실패:", error);
      alert("즐겨찾기 상태를 변경하지 못했습니다.");
    }
  },

  renameRecipe: async (sessionId: number, newTitle: string) => {
    try {
      set({ isLoading: true });
      await updateAiSessionTitle(sessionId, newTitle);

      // 최신 목록을 다시 불러와서 UI를 동기화합니다.
      const data = await getAiRecipeSessions();
      set({
        pinned: data.pinned,
        sessions: data.sessions,
        isLoading: false,
      });
    } catch (error) {
      console.error("제목 수정 실패:", error);
      set({ isLoading: false });
      alert("제목 수정에 실패했습니다.");
    }
  },

  deleteSession: async (sessionId: number) => {
    try {
      set({ isLoading: true });
      await deleteAiRecipeSession(sessionId);

      // 서버에서 성공하면 로컬 상태를 최신화 (두 가지 방법 중 선택)

      // 방법 1: API 다시 찌르기 (가장 확실함)
      // await get().fetchSessions();

      // 방법 2: 로컬 상태에서 직접 필터링 (네트워크 비용 아끼기)
      set((state) => ({
        pinned: state.pinned.filter((s) => s.sessionId !== sessionId),
        sessions: state.sessions.filter((s) => s.sessionId !== sessionId),
        isLoading: false,
      }));
    } catch (error) {
      console.error("세션 삭제 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
