import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import CheckIcon from "@/assets/recipe/check.svg";

import RecipeLoadingSpinner from "@/components/recipe/main/loading/RecipeLoadingSpinner";
import StepMessage from "@/components/recipe/main/loading/StepMessage";

export default function RecipeLoadingPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const messages = [
    "선택한 재료를 보고 있어요...",
    "원하는 난이도에 맞추는 중이에요...",
    "맞춤형 레시피가 완성됐어요!",
  ];

  const { selectedIngredients, difficulty, generateRecipe, error } =
    useRecipeFlowStore();

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }

    if (step === messages.length) {
      (async () => {
        try {
          await generateRecipe(); // 끝날 때까지 기다림
          navigate("/recipe/result");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [step, generateRecipe, navigate]);

  useEffect(() => {
    if (selectedIngredients.length === 0 || !difficulty) {
      navigate("/recipe/select", { replace: true });
    }
  }, []);

  return (
    <div className="flex h-screen flex-col items-center pt-[139px] text-center">
      <RecipeLoadingSpinner />

      {/* 타이틀 / 서브타이틀 */}
      <div className="mb-[49px] flex w-[361px] flex-col items-center gap-2">
        <h1 className="typo-result-title">오늘의 요리 준비 중...</h1>
        <p className="typo-button text-green-deep font-bold">
          나에게 딱 맞는 레시피를 찾고 있어요
        </p>
      </div>

      {/* 메시지 카드 */}
      <div className="flex w-[321px] flex-col gap-3">
        {messages.slice(0, step).map((msg, idx) => (
          <StepMessage key={idx} message={msg} icon={CheckIcon} />
        ))}
      </div>
      {error && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-semantic-negative text-sm">{error}</p>

          <button
            onClick={() => generateRecipe()}
            className="text-sm text-gray-500 underline"
          >
            다시 시도하기
          </button>
        </div>
      )}
    </div>
  );
}
