import icon from "@/assets/character/congrats_char.svg";

import Button from "./Button";

type OnboardingType = "INGREDIENT" | "RECIPE";

interface OnboardingRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: OnboardingType;
}

export default function OnboardingRewardModal({
  isOpen,
  onClose,
  type,
}: OnboardingRewardModalProps) {
  if (!isOpen) return null;
  const title = type === "RECIPE" ? "첫 요리 기록 성공!" : "첫 재료 등록 완료!";
  return (
    <div className="bg-black-overlay fixed inset-0 z-100 flex items-center justify-center">
      {/* 배경 클릭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 */}
      <div className="bg-gray-0 rounded-L relative flex w-75 flex-col items-center gap-6 p-6">
        {/* 이미지 + 텍스트 */}
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={icon} className="w-20" />

          {/* 텍스트 묶음 */}
          <div className="flex w-full flex-col items-center gap-2">
            <div className="text-gray-80 typo-l-strong">
              {title}
              <br />
              축하 쿠키가 도착했어요
            </div>
            <div className="text-green-deep typo-h3">쿠키 +1 🍪</div>
          </div>
        </div>

        {/* 버튼 */}
        <Button onClick={onClose} size="S" variant="green" className="w-full">
          확인
        </Button>
      </div>
    </div>
  );
}
