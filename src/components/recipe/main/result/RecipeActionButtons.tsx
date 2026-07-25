import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import Button from "@/components/ui/Button";

interface RecipeActionButtonsProps {
  retryCount: number;
  maxRetry?: number;
  onRetry: () => void;
  onCook?: () => void;
  showRetryButton?: boolean;
  isLoading?: boolean;
  isGuest?: boolean;
}

export default function RecipeActionButtons({
  retryCount,
  maxRetry = 5,
  onRetry,
  onCook,
  showRetryButton = true,
  isLoading = false,
  isGuest = false,
}: RecipeActionButtonsProps) {
  const navigate = useNavigate();

  const {
    selectedIngredients,
    difficulty,
    recipeHistory,
    completeSession,
    isCompleted,
  } = useRecipeFlowStore();

  const latestRecipe = recipeHistory.at(-1);

  const isMaxed = retryCount >= maxRetry;
  const leftRetry = maxRetry - retryCount;

  const isRetryDisabled = isMaxed || isLoading;

  const retryBtnText = isLoading ? (
    "레시피 생성 중..."
  ) : (
    <span>
      다른 레시피 보기 · <span className="text-green-deep">{leftRetry}</span>회{" "}
      남음
    </span>
  );

  const handleCookClick = async () => {
    if (onCook) {
      onCook();
      return;
    }

    if (!latestRecipe) return;

    try {
      await completeSession();
      navigate("/mycookeep/record/select", {
        state: {
          selectedIngredients,
          difficulty,
          recipeData: latestRecipe,
        },
      });
    } catch (error) {
      console.error(error);
      alert("레시피 채택 중 오류가 발생했습니다.");
    }
  };

  const isCookDisabled = isGuest
    ? isLoading
    : !latestRecipe || isLoading || isCompleted;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button
        onClick={handleCookClick}
        disabled={isCookDisabled}
        size="L"
        variant="green"
      >
        이 레시피대로 요리할래요
      </Button>
      {showRetryButton && (
        <Button
          size="S"
          variant="black"
          onClick={onRetry}
          disabled={isRetryDisabled}
        >
          {retryBtnText}
        </Button>
      )}
    </div>
  );
}
