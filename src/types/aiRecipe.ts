export type Difficulty = "EASY" | "NORMAL" | "HARD";

export interface AiRecipeResponse {
  sessionId: number;
  changeCount: number;
  recipe: {
    title: string;
    ingredients: {
      user_ingredients: IngredientItem[];
      additional_ingredients: IngredientItem[];
      optional_ingredients: IngredientItem[];
    };
    steps: string[];
    youtube_search_queries: string[];
  };
  youtubeReferences: {
    title: string;
    url: string;
    thumbnail: string;
  }[];
  feature: Feature;
}

export interface IngredientItem {
  ingredientId?: number;
  name: string;
  quantity: number;
  unit: string;
  description?: string | null;
}

export type Feature =
  | "SOUP_STEW"
  | "RICE_BOWL"
  | "NOODLE"
  | "STIR_FRY_GRILL"
  | "SALAD_HEALTHY"
  | "SNACK_DESSERT"
  | "ANY";

export type RecipeCategory = Feature;

export interface RetryAiRecipeRequest {
  sessionId: number;
}
