import { create } from "zustand";
import { getDailyAiRecipes, DailyAiRecipe } from "../api/dailyAiRecipe";

interface State {
  recipes: DailyAiRecipe[];
  isLoading: boolean;
  fetchRecipes: () => Promise<void>;
}

export const useDailyAiRecipeStore = create<State>((set) => ({
  recipes: [],
  isLoading: false,

  fetchRecipes: async () => {
    try {
      set({ isLoading: true });
      const data = await getDailyAiRecipes();
      set({ recipes: data, isLoading: false });
    } catch (e) {
      console.error("daily 레시피 조회 실패", e);
      set({ isLoading: false });
    }
  },
}));
