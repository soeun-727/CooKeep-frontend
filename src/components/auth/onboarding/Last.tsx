//온보딩 완료
import { calendarImage, checkChar, shadow } from "../../../assets";
import Button from "../../ui/Button";

interface LastProps {
  onStart: () => void;
}

export default function Last({ onStart }: LastProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <div className="text-[28px] leading-[36px] text-center font-bold">
          <h1 className="mt-[112px]">답변 완료!</h1>
          <h1 className="">목표는 매주 자유롭게</h1>
          <h1 className="">변경할 수 있어요</h1>
        </div>

        <div className="typo-body text-[var(--color-green-deep)] !font-bold mt-[10px]">
          입력한 답변을 바탕으로 AI 레시피를 추천해드려요
        </div>
        <img src={checkChar} className="w-[184px] mt-[86px]" />
        <img src={shadow} className="w-42 brightness-93" />

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
          <div className="flex justify-end -mb-8 -mr-4">
            <img src={calendarImage} className="w-44" />
          </div>
          <div className="relative z-10">
            <Button size="L" onClick={onStart}>
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
