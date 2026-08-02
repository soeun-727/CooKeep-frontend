import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import DifficultySelector from "@/components/recipe/main/confirm/DifficultySelector";
import SelectedIngredientList from "@/components/recipe/main/confirm/SelectedIngredientList";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

export default function RecipeConfirmPage() {
  const navigate = useNavigate();
  const { selectedIngredients, setSelectedIngredients, difficulty } =
    useRecipeFlowStore();

  const { toggleSelect } = useIngredientStore();

  const handleRecommend = () => {
    if (!difficulty) return;

    navigate("/recipe/loading", {
      state: {
        difficulty,
        ingredientIds: selectedIngredients.map(item => item.id),
        isRandom: false,
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
    <div className="flex w-full flex-col gap-[30px] px-4">
      <BackHeader title="재료선택" />

      <SelectedIngredientList
        ingredients={selectedIngredients}
        onRemove={handleRemoveIngredient}
      />
      <DifficultySelector />

      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 flex w-full max-w-[450px] -translate-x-1/2 justify-center px-4">
        <Button
          size="L"
          variant="green"
          disabled={!difficulty}
          onClick={handleRecommend}
        >
          AI 레시피 추천받기
        </Button>
      </div>
    </div>
  );
}
