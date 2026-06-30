import { IngredientItem } from "@/types/aiRecipe";
import RecipeIngredientSection from "./RecipeIngredientSection";
import RecipeStepSection from "./RecipeStepSection";

interface Step {
  order: number;
  description: string;
}

interface RecipeContentSectionProps {
  selectedIngredients: IngredientItem[];
  requiredIngredients?: IngredientItem[];
  substitutions?: IngredientItem[];
  steps: Step[];
  difficulty: string;
}

export default function RecipeContentSection({
  selectedIngredients,
  requiredIngredients = [],
  substitutions,
  steps,
  difficulty,
}: RecipeContentSectionProps) {
  return (
    <section
      className="
        flex flex-col items-center
        py-[22px] px-[15px]
        bg-gray-0 rounded-[6px]
        shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
        w-full max-w-[361px] mx-auto
      "
      style={{ gap: "8px" }}
    >
      {/* 내부 세부 섹션 */}
      <div className="flex w-full max-w-[331px] flex-col items-start gap-9">
        <RecipeIngredientSection
          selectedIngredients={selectedIngredients}
          requiredIngredients={requiredIngredients}
          substitutions={substitutions}
        />

        <RecipeStepSection steps={steps} difficulty={difficulty} />
      </div>
    </section>
  );
}
