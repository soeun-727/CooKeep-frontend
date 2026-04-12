import React from "react";
import icon from "../../assets/cookeeps/main/water_cookie_cookeeps.svg";
import Button from "./Button";

type OnboardingType = "INGREDIENT" | "RECIPE";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: OnboardingType;
}

const OnboardingRewardModal: React.FC<Props> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  const title = type === "RECIPE" ? "첫 요리 완료!" : "첫 재료 등록 완료!";
  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-[#11111180]">
      {/* 배경 클릭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 */}
      <div className="relative flex w-[258px] flex-col items-center gap-[18px] rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        <div className="flex w-full flex-col items-center gap-[16px]">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[12px]">
            <img src={icon} className="w-[48px] h-[48px]" />

            {/* 텍스트 묶음 */}
            <div className="flex flex-col items-center gap-[2px] w-full">
              <div className="text-center text-[16px] font-bold leading-[24px] text-[#1FC16F]">
                쿠키 1개
              </div>

              <div className="text-center text-[14px] font-medium leading-[20px] text-[#202020]">
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
};

export default OnboardingRewardModal;
