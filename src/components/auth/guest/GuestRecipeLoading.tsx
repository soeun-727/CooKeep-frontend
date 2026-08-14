import { useEffect, useState } from "react";

import LoadingScreen from "@/components/ui/LoadingScreen";

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

  return <LoadingScreen />;
}
