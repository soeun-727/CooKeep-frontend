import { ReactNode } from "react";

import RecipeDetailYoutube from "@/components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import RecipeIngredientSection from "@/components/recipe/main/result/RecipeIngredientSection";
import RecipeStepSection from "@/components/recipe/main/result/RecipeStepSection";

import { IngredientItem } from "@/types/aiRecipe";

interface Step {
  order: number;
  description: string;
}

interface YoutubeVideo {
  title: string;
  thumbnail: string;
  url: string;
}

interface RecipeInfoDetailProps {
  selectedIngredients: IngredientItem[];
  requiredIngredients?: IngredientItem[];
  substitutions?: IngredientItem[];
  steps: Step[];
  difficulty: string;
  youtubeVideos?: YoutubeVideo[];
  youtubeTags?: string[];
}

export function RecipeInfoDetail({
  selectedIngredients,
  requiredIngredients,
  substitutions,
  steps,
  difficulty,
  youtubeVideos = [],
  youtubeTags,
}: RecipeInfoDetailProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <RecipeIngredientSection
        selectedIngredients={selectedIngredients}
        requiredIngredients={requiredIngredients}
        substitutions={substitutions}
      />
      <RecipeStepSection steps={steps} difficulty={difficulty} />
      <RecipeDetailYoutube videos={youtubeVideos} tags={youtubeTags} />
    </div>
  );
}
