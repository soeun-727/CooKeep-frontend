import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

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

  // 로딩 중이거나 횟수 초과 시 비활성화 로직
  const isRetryDisabled = isMaxed || isLoading;
  const retryBtnText = isLoading
    ? "레시피 생성 중..."
    : `다른 레시피 받기 (${retryCount}/${maxRetry})`;

  const handleCookClick = async () => {
    // async 추가
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
      <button
        onClick={handleCookClick}
        disabled={!latestRecipe || isLoading || isCompleted}
        className={`typo-button text-gray-0 h-[38px] w-full rounded-[10px] ${
          !latestRecipe || isLoading || isCompleted ? "bg-gray-300" : "bg-green"
        }`}
      >
        이 레시피대로 요리할래요
      </button>

      {/* 히스토리 조회 모드가 아닐 때만 '다른 레시피' 버튼 표시 */}
      {showRetryButton && (
        <button
          onClick={onRetry}
          disabled={isRetryDisabled}
          className={`typo-button h-[38px] w-full rounded-[10px] transition-colors ${
            isRetryDisabled
              ? "cursor-not-allowed bg-gray-300 text-gray-50"
              : "bg-gray-80 text-gray-0"
          }`}
        >
          {retryBtnText}
        </button>
      )}
    </div>
  );
}
