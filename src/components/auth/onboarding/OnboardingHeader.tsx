import { useNavigate } from "react-router-dom";

import BackIcon from "../../../assets/back.svg?react";

interface OnboardingHeaderProps {
  onSkip: () => void;
  isLoading: boolean;
}

export default function OnboardingHeader({
  onSkip,
  isLoading,
}: OnboardingHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { replace: true }); // 최초 접속 화면 경로
  };

  return (
    <header className="bg-background z-50 flex w-full max-w-[450px] items-center justify-between py-2">
      <button type="button" onClick={() => handleBack()} className="h-10 w-10">
        <BackIcon aria-label="뒤로 가기" role="img" className="h-5" />
      </button>

      <button
        type="button"
        className="typo-m py-[10px] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onSkip}
        disabled={isLoading}
      >
        <span className="text-gray-50">질문 건너뛰기</span>
      </button>
    </header>
  );
}
