import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import DifficultySelector from "@/components/recipe/main/confirm/DifficultySelector";
import RecommendButton from "@/components/recipe/main/confirm/RecommendButton";
import SelectedIngredientList from "@/components/recipe/main/confirm/SelectedIngredientList";
import BackHeader from "@/components/ui/BackHeader";

export default function RecipeConfirmPage() {
  const navigate = useNavigate();
  const { selectedIngredients, setSelectedIngredients, difficulty } =
    useRecipeFlowStore();

  const { toggleSelect } = useIngredientStore();

  const handleRecommend = () => {
    if (!difficulty) return;

    navigate("/recipe/loading", {
      state: {
        difficulty, // ex: "EASY", "NORMAL", "HARD" 등 (difficulty 타입 규격)
        ingredientIds: selectedIngredients.map(item => item.id),
      },
    });
  };

  const handleRemoveIngredient = (id: number) => {
    const updatedList = selectedIngredients.filter(item => item.id !== id);
    setSelectedIngredients(updatedList);
    toggleSelect(id);
  };

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      navigate("/recipe/select", { replace: true });
    }
  }, [selectedIngredients]);

  return (
    <div className="flex min-h-screen w-full flex-col pb-5">
      <BackHeader title="재료선택" onBack={() => navigate(-1)} />

      <div className="no-scrollbar mt-[70px] flex flex-col gap-[30px] overflow-y-auto px-4">
        <SelectedIngredientList
          ingredients={selectedIngredients}
          onRemove={handleRemoveIngredient}
        />

        <DifficultySelector />

        <RecommendButton disabled={!difficulty} onClick={handleRecommend} />
      </div>
    </div>
  );
}
