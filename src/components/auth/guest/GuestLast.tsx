import char from "@/assets/character/onboarding_char.svg";

import Button from "@/components/ui/Button";

export default function GuestLast({ onNext }: { onNext: () => void }) {
  return (
    <div className="mt-15 flex w-full flex-col items-center">
      <div className="flex flex-col gap-4">
        <div className="typo-h2 text-gray-80 text-center">
          방금 만든 레시피,
          <br />
          저장하지 않으면 사라져요!
        </div>
        <div className="typo-l-strong text-green-deep">
          마음에 드는 레시피, 그냥 놓치기 아쉽다면
        </div>
      </div>
      <img src={char} className="mt-[94px] h-64" />
      <div className="typo-m mt-20 text-center text-gray-50">
        지금 쿠킵에 가입하고, 나만의 레시피를 저장해보세요!
      </div>
      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 z-100 w-full -translate-x-1/2 px-4 pt-6">
        <Button size="L" variant="green" onClick={onNext} className="w-full">
          시작하기
        </Button>
      </div>
    </div>
  );
}
