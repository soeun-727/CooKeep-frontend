import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { generateAiRecipe } from "@/api/aiRecipe";

import CheckIcon from "@/assets/recipe/check.svg";

import RecipeLoadingSpinner from "@/components/recipe/main/loading/RecipeLoadingSpinner";
import StepMessage from "@/components/recipe/main/loading/StepMessage";

export default function RecipeLoadingPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);

  const messages = [
    "선택한 재료를 보고 있어요...",
    "원하는 난이도에 맞추는 중이에요...",
    "맞춤형 레시피가 완성됐어요!",
  ];

  const { selectedIngredients, difficulty, error } = useRecipeFlowStore();

  const handleGenerateRecipe = async () => {
    try {
      setLocalError(null);
      const ingredientIds = selectedIngredients.map(item => item.id);

      const data = await generateAiRecipe({
        feature: difficulty as any,
        ingredientIds,
      });

      const flowStore = useRecipeFlowStore.getState() as any;
      if (typeof flowStore.setRecipeData === "function") {
        flowStore.setRecipeData(data);
      } else if (typeof flowStore.setRecipe === "function") {
        flowStore.setRecipe(data);
      } else if (typeof flowStore.setRecipeResponse === "function") {
        flowStore.setRecipeResponse(data);
      }

      navigate("/recipe/result");
    } catch (err: any) {
      console.error(err);
      setLocalError("레시피 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }

    if (step === messages.length) {
      handleGenerateRecipe();
    }
  }, [step, navigate]);

  useEffect(() => {
    if (selectedIngredients.length === 0 || !difficulty) {
      navigate("/recipe/select", { replace: true });
    }
  }, []);

  const displayError = error || localError;

  return (
    <div className="mt-40 flex h-screen w-full flex-col items-center gap-6 px-4 text-center">
      <RecipeLoadingSpinner />

      <div className="flex w-full flex-col items-center gap-2">
        <h1 className="typo-h2">오늘의 요리 준비 중...</h1>
        <p className="typo-l text-green-deep">
          나에게 딱 맞는 레시피를 찾고 있어요
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {messages.slice(0, step).map((msg, idx) => (
          <StepMessage key={idx} message={msg} icon={CheckIcon} />
        ))}
      </div>
      {displayError && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-semantic-negative typo-caption">{displayError}</p>

          <button
            onClick={handleGenerateRecipe}
            className="typo-caption text-gray-500 underline"
          >
            다시 시도하기
          </button>
        </div>
      )}
    </div>
  );
}
