import Button from "../../ui/Button";
import char from "../../../assets/character/congrats_char.svg";
import { useNavigate } from "react-router-dom";
import { chatbox, lightbulb, shadow } from "../../../assets";

export default function SuccessSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start animate-fade-in">
      {/* 상단 간격 */}
      <div className="mt-[166px] flex flex-col items-center gap-[10px]  text-center">
        <h1 className="w-[361px] typo-h1 !text-[28px] !leading-[36px] !font-bold text-center">
          반가워요! 오늘부터 지속 가능한 요리 루틴을 만들어볼까요?
        </h1>

        <p className="typo-button text-[var(--color-green-deep)] text-center">
          쿠킵과 함께 냉장고 속 재료부터 채워봐요
        </p>
      </div>

      {/* 이미지 */}
      <img src={char} alt="임시" className="mt-[122px] w-[184px] h-[167px]" />
      <img src={shadow} className="w-[154px] brightness-95 mt-3" />

      <img src={chatbox} className="fixed -left-5 bottom-35" />
      <img src={lightbulb} className="fixed -right-5 bottom-54" />

      {/* 버튼 */}
      <div className="fixed bottom-0 mb-[34px] -translate-x-1/2 left-1/2">
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
