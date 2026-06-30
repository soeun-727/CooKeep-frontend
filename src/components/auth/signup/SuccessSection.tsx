import { useNavigate } from "react-router-dom";

import char from "@/assets/character/congrats_char.svg";
import { chatbox, lightbulb, shadow } from "@/assets/index";

import Button from "@/components/ui/Button";

export default function SuccessSection() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in flex flex-1 flex-col items-center justify-start">
      {/* 상단 간격 */}
      <div className="mt-[102px] flex flex-col items-center gap-[10px] text-center">
        <h1 className="typo-h1 w-[361px] text-center !text-[28px] !leading-[36px] !font-bold">
          반가워요! 오늘부터 지속 가능한 요리 루틴을 만들어볼까요?
        </h1>

        <p className="typo-button text-center text-[var(--color-green-deep)]">
          쿠킵과 함께 냉장고 속 재료부터 채워봐요
        </p>
      </div>

      {/* 이미지 */}
      <img src={char} alt="임시" className="mt-20 w-49" />
      <img src={shadow} className="mt-3 w-[154px] brightness-95" />

      <img src={chatbox} className="fixed bottom-35 -left-5" />
      <img src={lightbulb} className="fixed -right-5 bottom-54" />

      {/* 버튼 */}
      <div className="fixed bottom-0 left-1/2 mb-[34px] -translate-x-1/2">
        <Button
          size="L"
          className="w-[361px]"
          variant="green"
          onClick={() => navigate("/onboarding")}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
