import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import Button from "@/components/ui/Button";

interface RecipeActionButtonsProps {
  retryCount: number;
  maxRetry?: number;
  onRetry: () => void;
  showRetryButton?: boolean;
  isLoading?: boolean;
}

export default function RecipeActionButtons({
  retryCount,
  maxRetry = 5,
  onRetry,
  showRetryButton = true, // 기본값은 true
  isLoading = false,
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

  // 로딩 중이거나 횟수 초과 시 비활성화 로직
  const isRetryDisabled = isMaxed || isLoading;

  // leftRetry 숫자만 초록색(text-green-deep)으로 지정
  const retryBtnText = isLoading ? (
    "레시피 생성 중..."
  ) : (
    <span>
      다른 레시피 보기 · <span className="text-green-deep">{leftRetry}</span>회
      남음
    </span>
  );

  const handleCookClick = async () => {
    if (!latestRecipe) return;

    try {
      // 1. API 호출 (채택 완료 처리)
      await completeSession();

      // 2. 페이지 이동
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

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {/* 요리할래요 버튼 */}
      <Button
        onClick={handleCookClick}
        disabled={!latestRecipe || isLoading || isCompleted}
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
