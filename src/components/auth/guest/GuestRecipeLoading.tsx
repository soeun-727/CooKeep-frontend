import { useEffect, useState } from "react";
import CheckIcon from "../../../assets/recipe/check.svg";
import RecipeLoadingSpinner from "../../recipe/main/loading/RecipeLoadingSpinner";
import StepMessage from "../../recipe/main/loading/StepMessage";

interface RecipeLoadingUIProps {
  onComplete?: () => void;
  onNext: () => void;
}

export default function GuestRecipeLoading({
  onComplete,
  onNext,
}: RecipeLoadingUIProps) {
  const [step, setStep] = useState(0);

  const messages = [
    "선택한 재료를 보고 있어요...",
    "원하는 난이도에 맞추는 중이에요...",
    "맞춤형 레시피가 완성됐어요!",
  ];

  useEffect(() => {
    // 메시지 순차 출력 로직
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }

    // 모든 메시지가 출력된 후 (step === 3)
    if (step === messages.length) {
      const completionTimer = setTimeout(() => {
        if (onComplete) onComplete();
        onNext(); // 다음 페이지/단계로 이동
      }, 1000); // 마지막 메시지 노출 후 1초 대기

      return () => clearTimeout(completionTimer);
    }
  }, [step, onComplete, onNext, messages.length]);

  return (
    <div className="flex flex-col items-center pt-[139px] text-center bg-[#FAFAFA]">
      <RecipeLoadingSpinner />

      <div className="flex flex-col items-center w-[361px] gap-2 mb-[49px]">
        <h1 className="typo-result-title">오늘의 요리 준비 중...</h1>
        <p className="typo-button text-[#1FC16F] font-bold">
          나에게 딱 맞는 레시피를 찾고 있어요
        </p>
      </div>

      <div className="flex flex-col w-[321px] gap-3">
        {messages.slice(0, step).map((msg, idx) => (
          <div
            key={idx}
            className="animate-fadeIn transition-all duration-500 transform translate-y-0"
          >
            <StepMessage message={msg} icon={CheckIcon} />
          </div>
        ))}
      </div>
    </div>
  );
}
