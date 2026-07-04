//온보딩 완료
import { calendarImage, checkChar, shadow } from "@/assets/index";

import Button from "@/components/ui/Button";

interface LastProps {
  onStart: () => void;
}

export default function Last({ onStart }: LastProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center">
        <div className="typo-h2 text-center">
          <h1 className="mt-[112px]">답변 완료!</h1>
          <h1 className="">목표는 매주 자유롭게</h1>
          <h1 className="">변경할 수 있어요</h1>
        </div>

        <div className="typo-l-strong text-green-deep mt-4">
          입력한 답변을 바탕으로 AI 레시피를 추천해드려요
        </div>
        <img src={checkChar} className="mt-[86px] w-[184px]" />
        <img src={shadow} className="w-42 brightness-93" />

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
          <div className="-mr-4 -mb-8 flex justify-end">
            <img src={calendarImage} className="w-44" />
          </div>
          <div className="relative z-10">
            <Button size="L" onClick={onStart} variant="green">
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
