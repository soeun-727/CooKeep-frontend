import { IngredientsJson } from "@/api/dailyAiRecipe";

import RecipeDetailIngredientSection from "@/components/cookeeps/recipedetail/RecipeDetailIngredientSection";
import RecipeDetailStepSection from "@/components/cookeeps/recipedetail/RecipeDetailStepSection";

interface RecipeRecordContentSectionProps {
  recipe: {
    ingredients: IngredientsJson;
    steps: string[];
  };
}

export default function RecipeRecordContentSection({
  recipe,
}: RecipeRecordContentSectionProps) {
  return (
    <section className="bg-gray-0 flex w-full flex-col rounded-md p-4 shadow">
      <div className="flex w-full flex-col gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
