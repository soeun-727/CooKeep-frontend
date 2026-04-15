import { create } from "zustand";
import {
  consumeIngredients,
  deleteIngredients,
  updateIngredientDate,
  updateIngredientMemo,
  updateIngredientQuantity,
  updateIngredientStorage,
  type ConsumeRewardResponse,
  type StorageType,
} from "../api/ingredient";

export interface Ingredient {
  id: number;
  name: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
  quantity: number;
  unit: string;
  expiryDate: string;
  createdAt: number;
  dDay: number;
  memo?: string;
  tip?: string;
}

export type SortOrder = "유통기한 임박 순" | "등록 최신 순" | "등록 오래된 순";

interface IngredientState {
  ingredients: Ingredient[];
  selectedIds: number[];
  searchTerm: string;
  viewCategory: string | null;
  sortOrder: SortOrder;
  selectedIngredientId: number | null;
  eatenCount: number;
  setIngredients: (ingredients: Ingredient[]) => void;
  setSearchTerm: (term: string) => void;
  setViewCategory: (category: string | null) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSelect: (id: number) => void;
  setSelectedFromIngredients: (ingredients: Ingredient[]) => void;
  clearSelection: () => void;
  deleteSelected: (
    type?: "eaten" | "thrown",
  ) => Promise<ConsumeRewardResponse | null>;
  openDetail: (id: number) => void;
  closeDetail: () => void;
  updateIngredient: (updated: Ingredient) => void;
  changeStorage: (ingredientId: number, newStorage: string) => Promise<void>;
  changeExpiryDate: (ingredientId: number, newDate: string) => Promise<void>;
  changeQuantity: (ingredientId: number, newQuantity: number) => Promise<void>;
  changeMemo: (ingredientId: number, newMemo: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>()((set, get) => ({
  ingredients: [],
  selectedIds: [],
  searchTerm: "",
  viewCategory: null,
  sortOrder: "유통기한 임박 순",
  selectedIngredientId: null,
  eatenCount: 0,
  setIngredients: (ingredients) => set({ ingredients }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setViewCategory: (category) => set({ viewCategory: category }),
  setSortOrder: (order) => set({ sortOrder: order }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),

  setSelectedFromIngredients: (ingredients) =>
    set({
      selectedIds: ingredients.map((i) => i.id),
    }),

  clearSelection: () => set({ selectedIds: [] }),
  deleteSelected: async (type) => {
    const { selectedIds, ingredients, eatenCount } = get();
    if (selectedIds.length === 0) return null;

    try {
      let rewardData: ConsumeRewardResponse | null = null;

      if (type === "eaten") {
        const response = await consumeIngredients(selectedIds);
        rewardData = response.data.data;
      } else {
        await deleteIngredients(selectedIds);
      }
      set({
        ingredients: ingredients.filter((i) => !selectedIds.includes(i.id)),
        selectedIds: [],
        eatenCount:
          type === "eaten" ? eatenCount + selectedIds.length : eatenCount,
      });

      return rewardData;
    } catch (error) {
      console.error("재료 처리 중 오류 발생:", error);
      alert("처리에 실패했습니다. 다시 시도해 주세요.");
      throw error;
    }
  },
  openDetail: (id) => set({ selectedIngredientId: id }),
  closeDetail: () => set({ selectedIngredientId: null }),
  changeMemo: async (ingredientId, newMemo) => {
    const { ingredients } = get();
    try {
      const response = await updateIngredientMemo(ingredientId, newMemo);

      if (response.status === 200 || response.data.status === "OK") {
        const updatedIngredients = ingredients.map((item) =>
          item.id === ingredientId ? { ...item, memo: newMemo } : item,
        );
        set({ ingredients: updatedIngredients });
      }
    } catch (error) {
      console.error("메모 변경 실패:", error);
      alert("메모 저장 중 오류가 발생했습니다.");
      throw error;
    }
  },
  changeQuantity: async (ingredientId, newQuantity) => {
    const { ingredients } = get();

    try {
      const response = await updateIngredientQuantity(
        ingredientId,
        newQuantity,
      );

      if (response.status === 200 || response.data.status === "OK") {
        // 서버 응답 데이터를 기반으로 로컬 상태 업데이트
        const updatedIngredients = ingredients.map((item) =>
          item.id === ingredientId ? { ...item, quantity: newQuantity } : item,
        );
        set({ ingredients: updatedIngredients });
      }
    } catch (error) {
      console.error("수량 변경 실패:", error);
      alert("수량 변경 중 오류가 발생했습니다.");
      throw error;
    }
  },
  changeStorage: async (ingredientId, newStorage) => {
    const { ingredients } = get();

    // 1. 내부에서 직접 매핑 (가장 안전합니다)
    const mapping: Record<string, string> = {
      냉장: "FRIDGE",
      냉동: "FREEZER",
      상온: "PANTRY",
    };

    const serverStorage = mapping[newStorage];
    if (!serverStorage) {
      console.error("매핑 실패: 유효하지 않은 보관 장소 타입입니다.");
      return;
    }

    try {
      // 2. 반드시 '변환된 영문 값'인 serverStorage를 보냅니다.
      const response = await updateIngredientStorage(
        ingredientId,
        serverStorage as StorageType,
      );

      if (response.status === 200 || response.data.status === "OK") {
        const updatedIngredients = ingredients.map((item) =>
          item.id === ingredientId
            ? {
                ...item,
                category: newStorage as any, // 화면 표시용 (한글)
                // item 객체에 storageType 필드가 있다면 업데이트
                storageType: serverStorage,
              }
            : item,
        );
        set({ ingredients: updatedIngredients });
      }
    } catch (error) {
      console.error("보관 장소 변경 실패:", error);
      alert("보관 장소 변경 중 오류가 발생했습니다.");
      throw error;
    }
  },
  changeExpiryDate: async (ingredientId, newDate) => {
    const { ingredients } = get();
    const serverDate = newDate.replace(/\./g, "-");

    try {
      const response = await updateIngredientDate(ingredientId, serverDate);

      if (response.status === 200 || response.data.status === "OK") {
        const serverData = response.data.data;
        const updatedIngredients = ingredients.map((item) =>
          item.id === ingredientId
            ? {
                ...item,
                expiryDate: newDate, // 화면 표시용 (2026.02.10)
                dDay: serverData.leftDays, // 서버가 계산해준 D-Day
              }
            : item,
        );
        set({ ingredients: updatedIngredients });
      }
    } catch (error) {
      console.error("유통기한 변경 실패:", error);
      alert("유통기한 변경 중 오류가 발생했습니다.");
      throw error;
    }
  },
  updateIngredient: (updated) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) =>
        i.id === updated.id ? updated : i,
      ),
    })),
}));
