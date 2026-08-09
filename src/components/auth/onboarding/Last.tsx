import { calendarImage } from "@/assets/index";

import Button from "@/components/ui/Button";

interface LastProps {
  onStart: () => void;
}

export default function Last({ onStart }: LastProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <section className="flex flex-1 flex-col gap-4">
        <div className="typo-h2 mt-25 flex w-full flex-col items-center">
          <h1>답변 완료!</h1>
          <h1>목표는 매주 자유롭게</h1>
          <h1>변경할 수 있어요</h1>
        </div>

        <div className="typo-l-strong text-green-deep">
          입력한 답변을 바탕으로 AI 레시피를 추천해드려요
        </div>
      </section>

      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 w-full -translate-x-1/2">
        <div className="fixed -right-3 bottom-16 flex justify-end">
          <img src={calendarImage} className="w-30 shrink-0" />
        </div>
        <div className="relative z-10 w-full px-4">
          <Button size="L" onClick={onStart} variant="green">
            시작하기
          </Button>
        </div>
      </div>

      <div className="absolute right-[-22.49px] bottom-[10.4px]">
        <img src={calendarImage} className="w-44" />
      </div>
    </div>
  );
}
