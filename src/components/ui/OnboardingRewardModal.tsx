import icon from "@/assets/cookeeps/main/water_cookie_cookeeps.svg";

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
  const title = type === "RECIPE" ? "첫 요리 완료!" : "첫 재료 등록 완료!";
  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-black-overlay">
      {/* 배경 클릭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 */}
      <div className="relative flex w-[258px] flex-col items-center gap-[18px] rounded-[10px] bg-gray-0 px-[28px] pt-[35px] pb-[25px]">
        <div className="flex w-full flex-col items-center gap-[16px]">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[12px]">
            <img src={icon} className="h-[48px] w-[48px]" />

            {/* 텍스트 묶음 */}
            <div className="flex flex-col items-center gap-[2px] w-full">
              <div className="text-center text-[16px] font-bold leading-[24px] text-green-deep">
                쿠키 1개
              </div>

              <div className="text-center text-[14px] font-medium leading-[20px] text-gray-80">
                {title}
                <br />
                쿠키 선물이 도착했어요
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <Button
            onClick={onClose}
            size="S"
            variant="green"
            className="!w-[202px]"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
