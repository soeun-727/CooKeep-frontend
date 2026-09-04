import { RecipeDetailContent } from "@/api/cookeeps";

import RecipeDetailIngredientSection from "./RecipeDetailIngredientSection";
import RecipeDetailStepSection from "./RecipeDetailStepSection";

interface RecipeDetailContentSectionProps {
  recipe: {
    ingredients: RecipeDetailContent["ingredients"];
    steps: RecipeDetailContent["steps"];
  };
}

export default function RecipeDetailContentSection({
  recipe,
}: RecipeDetailContentSectionProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
      <RecipeDetailStepSection steps={recipe.steps} />
    </div>
  );
}
