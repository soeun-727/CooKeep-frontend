import React from "react";
import icon from "../../assets/character/congrats_char.svg";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WeeklyGoalModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-[#11111180]">
      {/* 배경 클릭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 */}
      <div className="relative flex w-[258px] flex-col items-center gap-[18px] rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        {/* 내부 wrapper (gap 28) */}
        <div className="flex w-full flex-col items-center gap-[28px]">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[20px]">
            <img src={icon} className="w-[80px] h-[85px]" />

            <div className="w-[202px] text-center text-[14px] font-medium leading-[20px] text-[#202020]">
              이번 주 목표를 달성했어요!
              <br />
              축하의 마음을 담아 쿠키를 드려요
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

export default WeeklyGoalModal;
