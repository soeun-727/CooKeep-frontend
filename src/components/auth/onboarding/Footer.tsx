import Button from "@/components/ui/Button";

interface FooterProps {
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
  isLoading: boolean;
}

export default function Footer({
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  isValid,
  isLoading,
}: FooterProps) {
  return (
    <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 w-full max-w-[450px] -translate-x-1/2 px-4">
      <div className="mx-auto flex w-full flex-col gap-2">
        <Button
          size="L"
          variant="green"
          onClick={() => isValid && onNext()}
          disabled={!isValid || isLoading}
        >
          {isLastStep ? "쿠킵 시작하기" : "다음"}
        </Button>

        {!isFirstStep && (
          <Button
            size="S"
            className="w-full bg-gray-300"
            disabled={isLoading}
            onClick={onPrev}
          >
            이전
          </Button>
        )}
      </div>
    </div>
  );
}
