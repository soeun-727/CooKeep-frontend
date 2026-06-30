// src/pages/recipe/confirm/RecipeConfirmPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import DifficultySelector from "@/components/recipe/main/confirm/DifficultySelector";
import RecommendButton from "@/components/recipe/main/confirm/RecommendButton";
import SelectedIngredientList from "@/components/recipe/main/confirm/SelectedIngredientList";
import BackHeader from "@/components/ui/BackHeader";

export default function RecipeConfirmPage() {
  const navigate = useNavigate();
  const { selectedIngredients, difficulty } = useRecipeFlowStore();

  const handleRecommend = () => {
    if (!difficulty) return;
    navigate("/recipe/loading");
  };

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      navigate("/recipe/select", { replace: true });
    }
  }, [selectedIngredients]);

  return (
    <div className="flex w-full flex-col pb-32">
      <BackHeader title="레시피 추천" onBack={() => navigate(-1)} />

      <div className="mt-[70px] flex flex-col gap-8 px-5">
        <SelectedIngredientList ingredients={selectedIngredients} />

        <DifficultySelector />

        <RecommendButton disabled={!difficulty} onClick={handleRecommend} />
      </div>
    </div>
  );
}
