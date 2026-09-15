import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import axios from "axios";

import RecipeLoadingSpinner from "@/components/recipe/main/loading/RecipeLoadingSpinner";
import StepMessage from "@/components/recipe/main/loading/StepMessage";
import { BackHeader } from "@/components/ui/BackHeader";
import DoublecheckModal from "@/components/ui/DoublecheckModal";

export default function RecipeLoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const isCancelledRef = useRef(false);

  const messages = [
    "선택한 재료를 보고 있어요...",
    "원하는 난이도에 맞추는 중이에요...",
    "맞춤형 레시피가 완성됐어요!",
  ];

  const {
    selectedIngredients,
    difficulty,
    generateRecipe,
    cancelRecipe,
    error,
  } = useRecipeFlowStore();
  const isRandom = location.state?.isRandom ?? false;

  const handleGenerateRecipe = async () => {
    try {
      setLocalError(null);
      if (isRandom) {
        useRecipeFlowStore.setState({ difficulty: "RANDOM" });
      }
      await generateRecipe();
      if (!isCancelledRef.current) {
        navigate("/recipe/result");
      }
    } catch (err: unknown) {
      if (axios.isCancel(err) || isCancelledRef.current) {
        return;
      }
      console.error(err);
      const errorCode = axios.isAxiosError<{ code?: string }>(err)
        ? err.response?.data?.code
        : undefined;

      if (
        errorCode === "INGREDIENTS_REQUIRED" ||
        errorCode === "INGREDIENT_NOT_FOUND"
      ) {
        setLocalError(
          "레시피 생성을 위해 냉장고에 재료가 최소 3개 이상 필요합니다.",
        );
      } else if (errorCode === "USER_RATE_LIMIT_EXCEEDED") {
        setLocalError("1분 내 AI 생성 횟수(3회)를 초과하였습니다.");
      } else {
        setLocalError(
          "레시피 생성 중 오류가 발생했습니다. 다시 시도해 주세요.",
        );
      }
    }
  };

  const handleBack = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    isCancelledRef.current = true;
    cancelRecipe();
    navigate(-1);
  };

  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
      cancelRecipe();
    };
  }, [cancelRecipe]);

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
    if (!isRandom && (selectedIngredients.length === 0 || !difficulty)) {
      navigate("/recipe/select", { replace: true });
    }
  }, []);

  const displayError = error || localError;

  return (
    <div className="flex w-full flex-col px-4">
      <BackHeader onBack={handleBack} />

      <div className="mt-[120px] flex w-full flex-col items-center gap-6 text-center">
        <RecipeLoadingSpinner />

        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="typo-h2">오늘의 요리 준비 중...</h1>
          <p className="typo-l text-green-deep">
            나에게 딱 맞는 레시피를 찾고 있어요
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {messages.slice(0, step).map((msg, idx) => (
            <StepMessage key={idx} message={msg} />
          ))}
        </div>
        {displayError && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-semantic-negative typo-caption">
              {displayError}
            </p>

            <button
              onClick={handleGenerateRecipe}
              className="typo-caption text-gray-500 underline"
            >
              다시 시도하기
            </button>
          </div>
        )}
      </div>

      <DoublecheckModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="레시피 생성을 중단할까요?"
        onConfirm={handleConfirmCancel}
        variant="black"
        confirmText="네"
        cancelText="아니오"
      />
    </div>
  );
}
