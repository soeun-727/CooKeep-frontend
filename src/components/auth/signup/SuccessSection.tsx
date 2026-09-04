import { useNavigate } from "react-router-dom";

import shadow from "@/assets/character/char_shadow.svg";
import Char from "@/assets/character/congrats_char.svg?react";
import chatbox from "@/assets/signup/chatbox.svg";
import lightbulb from "@/assets/signup/lightbulb.svg";

import Button from "@/components/ui/Button";

export default function SuccessSection() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in relative flex min-h-dvh w-full max-w-[450px] flex-col items-center">
      {/* 헤더 + 텍스트 영역 */}
      <div className="flex w-full flex-col items-center gap-[60px] px-4">
        <div className="h-10 w-full" />

        <div className="flex flex-col items-center gap-4 self-stretch">
          <h1 className="typo-h2 text-gray-80 self-stretch text-center">
            반가워요! 오늘부터 지속 가능한
            <br />
            요리 루틴을 만들어볼까요?
          </h1>
          <p className="typo-l-strong text-green-deep self-stretch text-center">
            쿠킵과 함께 냉장고 속 재료부터 채워봐요
          </p>
        </div>
      </div>

      <img
        src={chatbox}
        alt=""
        className="pointer-events-none absolute -right-1 bottom-[250px] w-[55px]"
      />

      <img
        src={lightbulb}
        alt=""
        className="pointer-events-none absolute bottom-[151px] -left-1 w-[91px]"
      />
      {/* 캐릭터 + 버튼: fixed 대신 mt-auto로 하단에 붙이기 */}
      <div className="mt-auto flex w-full flex-col items-center gap-20">
        <div className="flex flex-col items-center">
          <Char className="h-[252px] w-[197px]" />
          <img src={shadow} className="mt-3 w-[154px] brightness-95" />
        </div>

        <div className="background-image-bottom-fade flex w-full flex-col items-center px-4 pt-6 pb-[34px]">
          <Button
            size="L"
            variant="green"
            className="w-full"
            onClick={() => navigate("/onboarding")}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
