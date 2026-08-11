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
    <section className="bg-gray-0 flex w-full flex-col rounded-md p-4 shadow">
      <div className="flex w-full flex-col gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
