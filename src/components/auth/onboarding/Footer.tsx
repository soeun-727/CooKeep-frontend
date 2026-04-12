import Button from "../../ui/Button";
interface FooterProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
  isLoading: boolean;
}

export default function Footer({
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
  isValid,
  isLoading,
}: FooterProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
      <div className="w-[361px] mx-auto flex flex-col items-center gap-2">
        <Button
          size="S"
          variant="green"
          onClick={() => isValid && onNext()}
          disabled={!isValid || isLoading}
        >
          {isLastStep ? "쿠킵 시작하기" : "다음"}
        </Button>

        {!isFirstStep && (
          <Button
            size="S"
            className="bg-gray-300"
            disabled={isLoading}
            onClick={onPrev}
          >
            이전
          </Button>
        )}

        <button
          className={`typo-caption text-gray-500 transition-opacity ${
            isLastStep ? "invisible" : "visible"
          }`}
          onClick={onSkip}
          disabled={isLoading}
        >
          질문 건너뛰기
        </button>
      </div>
    </div>
  );
}
