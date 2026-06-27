import { IngredientsJson } from "@/api/dailyAiRecipe";
import RecipeDetailIngredientSection from "@/components/cookeeps/recipedetail/RecipeDetailIngredientSection";
import RecipeDetailStepSection from "@/components/cookeeps/recipedetail/RecipeDetailStepSection";

interface Props {
  recipe: {
    ingredients: IngredientsJson;
    steps: string[];
  };
}

export default function RecipeRecordContentSection({ recipe }: Props) {
  return (
    <section className="flex w-full flex-col rounded-md bg-white p-4 shadow">
      <div className="flex w-full flex-col gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
