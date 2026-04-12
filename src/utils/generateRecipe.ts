import type { Ingredient } from "../stores/useIngredientStore";
// import type { Difficulty } from "../stores/useRecipeFlowStore";
import type { Recipe } from "../types/recipe";
import { MOCK_RECIPES } from "../constants/mockRecipes";

export function generateRecipe(
  ingredients: Pick<Ingredient, "id" | "name" | "quantity" | "unit">[],
  retryCount: number,
): Recipe {
  const ingredientNames = ingredients.map((i) => i.name);

  // 재료 매칭 점수
  const scored = MOCK_RECIPES.map((recipe) => {
    const required = recipe.ingredients
      .filter((i) => i.isRequired)
      .map((i) => i.name);

    const matchCount = required.filter((r) =>
      ingredientNames.includes(r),
    ).length;

    return { recipe, score: matchCount };
  });

  // 점수 높은 순 정렬
  scored.sort((a, b) => b.score - a.score);

  // retryCount로 다른 레시피 순환
  const index = retryCount % scored.length;

  return scored[index].recipe;
}
