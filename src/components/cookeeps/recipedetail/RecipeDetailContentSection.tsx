import { IngredientsJson } from "@/api/dailyAiRecipe";
import RecipeDetailIngredientSection from "./RecipeDetailIngredientSection";
import RecipeDetailStepSection from "./RecipeDetailStepSection";
interface RecipeDetailContentSectionProps {
  recipe: {
    ingredients: IngredientsJson;
    steps: string[];
  };
}

export default function RecipeDetailContentSection({
  recipe,
}: RecipeDetailContentSectionProps) {
  return (
    <section className="flex flex-col w-full bg-gray-0 rounded-md shadow p-4">
      <div className="flex flex-col w-full gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
