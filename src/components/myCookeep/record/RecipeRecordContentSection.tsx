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
    <section className="flex flex-col w-full bg-gray-0 rounded-md shadow p-4">
      <div className="flex flex-col w-full gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
