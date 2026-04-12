import { create } from "zustand";

export const useLoadingStore = create<{
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}>((set) => ({
  isLoading: false,
  setLoading: (v) => {
    if (v) {
      set({ isLoading: true });
    } else {
      // 콘텐츠가 paint된 다음 프레임에 로딩 해제 → 번쩍임 방지
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          set({ isLoading: false });
        });
      });
    }
  },
}));
