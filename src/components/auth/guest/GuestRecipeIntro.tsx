import Button from "@/components/ui/Button";
import cookChar from "@assets/recipe/main/cook_char.svg";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

export default function GuestRecipeIntro({ onNext }: Props) {
  const [isDimmed, setIsDimmed] = useState(false);

  return (
    <div onClick={() => setIsDimmed(true)} className="flex justify-center">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute top-[72px] left-1/2 z-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#1FC16F]/15 blur-[100px]" />

      {/* 딤드 레이어 (z-90) */}
      {isDimmed && (
        <div className="fixed inset-0 left-1/2 z-90 w-full max-w-[450px] -translate-x-1/2 bg-neutral-900/50" />
      )}

      {/* 컨텐츠 영역: 부모의 z-index를 제거해야 자식의 z-index가 딤드(z-90)와 직접 경쟁할 수 있습니다. */}
      <div className="relative mt-[203.62px] flex w-[361px] flex-col items-center gap-[28px]">
        {/* 캐릭터와 타이틀: 딤드보다 뒤에 있어야 하므로 낮은 z-index 부여 */}
        <div className="relative z-10 flex flex-col items-center gap-[28px]">
          <img
            src={cookChar}
            alt="요리 캐릭터"
            className="h-[116.646px] w-[162.5px]"
          />
          <h1 className="text-center text-[28px] leading-[36px] font-semibold text-[#202020]">
            지금 있는 재료로
            <br />
            요리해볼까요?
          </h1>
        </div>

        {/* 버튼 영역: isDimmed일 때 딤드(z-90)보다 높은 z-index 부여 */}
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
