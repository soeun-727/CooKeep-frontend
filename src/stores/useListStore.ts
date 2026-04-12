import { create } from "zustand";
import { LIST_DATA } from "../constants/listData";

interface Recipe {
  id: number;
  img: string;
  title: string;
  likes: number;
  isLiked: boolean; // 좋아요 여부
  bookmark: boolean; // 북마크 여부
}

interface ListState {
  recipes: Recipe[];
  // 좋아요 취소/추가
  toggleLike: (id: number) => void;
  // 북마크 취소/추가
  toggleBookmark: (id: number) => void;
  // 초기 데이터 로드 (필요시)
  setRecipes: (recipes: Recipe[]) => void;
}

export const useListStore = create<ListState>((set) => ({
  // 초기 데이터에 기본 상태값 주입 (실제 데이터 구조에 맞게 조정)
  recipes: LIST_DATA.map((item) => ({
    ...item,
    isLiked: item.isLiked ?? false, // 데이터에 없으면 기본값 false
    bookmark: item.bookmark ?? false,
  })),

  toggleLike: (id) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe,
      ),
    })),

  toggleBookmark: (id) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, bookmark: !recipe.bookmark } : recipe,
      ),
    })),

  setRecipes: (recipes) => set({ recipes }),
}));
