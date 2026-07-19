import cookChar from "@/assets/recipe/main/cook_char.svg";

import Button from "@/components/ui/Button";

interface GuestRecipeIntroProps {
  onNext: () => void;
  isDimmed: boolean;
  setIsDimmed: (isDimmed: boolean) => void;
}

export default function GuestRecipeIntro({
  onNext,
  isDimmed,
  setIsDimmed,
}: GuestRecipeIntroProps) {
  return (
    <div
      onClick={() => setIsDimmed(true)}
      className="flex h-[calc(100dvh-40px)] justify-center"
    >
      <div className="relative mt-[203.62px] flex w-[361px] flex-col items-center gap-[28px]">
        <div
          className={`relative h-[44px] w-[249px] ${isDimmed ? "z-[100]" : "z-20"}`}
        >
          <Button
            size="S"
            variant="green"
            onClick={() => {
              if (!isDimmed) return;
              onNext();
            }}
            className="h-full w-full"
          >
            요리할 재료 선택하기
          </Button>
        </div>
      </div>
    </div>
  );
}
