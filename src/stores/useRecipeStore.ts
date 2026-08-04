import {
  AiRecipeSessionItem,
  deleteAiRecipeSession,
  getAiRecipeSessions,
  toggleFavoriteSession,
  updateAiSessionTitle,
} from "@/api/aiSession";
import { create } from "zustand";

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

export const useRecipeStore = create<RecipeState>((set, get) => ({
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
    const previousPinned = get().pinned;
    const previousSessions = get().sessions;

    const isPinned = previousPinned.some(s => s.sessionId === sessionId);
    const isSession = previousSessions.some(s => s.sessionId === sessionId);

    let nextPinned = [...previousPinned];
    let nextSessions = [...previousSessions];

    if (isPinned) {
      const target = previousPinned.find(s => s.sessionId === sessionId);
      if (target) {
        nextPinned = previousPinned.filter(s => s.sessionId !== sessionId);
        nextSessions = [{ ...target, isPinned: false }, ...previousSessions];
      }
    } else if (isSession) {
      const target = previousSessions.find(s => s.sessionId === sessionId);
      if (target) {
        nextSessions = previousSessions.filter(s => s.sessionId !== sessionId);
        nextPinned = [{ ...target, isPinned: true }, ...previousPinned];
      }
    }

    set({ pinned: nextPinned, sessions: nextSessions });

    try {
      await toggleFavoriteSession(sessionId);
    } catch (error) {
      console.error("즐겨찾기 변경 실패, 원래대로 복구합니다:", error);
      set({ pinned: previousPinned, sessions: previousSessions });
      alert("즐겨찾기 상태를 변경하지 못했습니다.");
    }
  },

  renameRecipe: async (sessionId: number, newTitle: string) => {
    try {
      set({ isLoading: true });
      await updateAiSessionTitle(sessionId, newTitle);
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
      set(state => ({
        pinned: state.pinned.filter(s => s.sessionId !== sessionId),
        sessions: state.sessions.filter(s => s.sessionId !== sessionId),
        isLoading: false,
      }));
    } catch (error) {
      console.error("세션 삭제 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
