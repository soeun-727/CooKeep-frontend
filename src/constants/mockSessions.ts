import type { RecipeSession } from "../types/recipe";
import { MOCK_RECIPES } from "./mockRecipes";

export const MOCK_RECIPE_SESSIONS: RecipeSession[] = [
  {
    sessionId: 1,
    createdAt: "2026-02-08",
    recipes: MOCK_RECIPES,
  },
  {
    sessionId: 2,
    createdAt: "2026-02-07",
    recipes: [MOCK_RECIPES[1]],
  },
];
