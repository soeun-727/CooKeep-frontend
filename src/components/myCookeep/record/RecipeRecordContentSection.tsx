import { IngredientsJson } from "../../../api/dailyAiRecipe";
import RecipeDetailIngredientSection from "../../cookeeps/recipedetail/RecipeDetailIngredientSection";
import RecipeDetailStepSection from "../../cookeeps/recipedetail/RecipeDetailStepSection";

interface Props {
  recipe: {
    ingredients: IngredientsJson;
    steps: string[];
  };
}

export default function RecipeRecordContentSection({ recipe }: Props) {
  return (
    <section className="flex flex-col w-full bg-white rounded-md shadow p-4">
      <div className="flex flex-col w-full gap-9">
        <RecipeDetailIngredientSection ingredients={recipe.ingredients} />
        <RecipeDetailStepSection steps={recipe.steps} />
      </div>
    </section>
  );
}
