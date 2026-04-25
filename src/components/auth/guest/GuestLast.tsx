import char from "../../../assets/character/onboarding_char.svg";
import Button from "../../ui/Button";

export default function GuestLast({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="text-3xl font-bold leading-9 text-center mt-26">
        지금 만든 레시피,
        <br />
        저장하지 않으면 사라져요!
      </div>
      <div className="typo-body text-(--color-green-deep) !font-bold">
        마음에 드는 레시피, 그냥 놓치기 아쉽다면
      </div>
      <img src={char} className="h-64 mt-17" />
      <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2 z-[130]">
        <div className="typo-body text-center text-zinc-500 pb-4">
          지금 쿠킵에 가입하고 나만의 레시피를 저장해보세요!
        </div>
        <Button
          size="L"
          variant="black"
          onClick={onNext}
          className="!text-(--color-green-deep)"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
