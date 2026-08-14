import icon from "@/assets/character/congrats_char.svg";

import Button from "./Button";

interface WeeklyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WeeklyGoalModal({
  isOpen,
  onClose,
}: WeeklyGoalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-black-overlay fixed inset-0 z-[170] flex items-center justify-center">
      {/* 배경 클릭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 */}
      <div className="bg-gray-0 rounded-L relative flex w-[258px] flex-col items-center gap-[18px] px-[28px] pt-[35px] pb-[25px]">
        {/* 내부 wrapper (gap 28) */}
        <div className="flex w-full flex-col items-center gap-[28px]">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[20px]">
            <img src={icon} className="h-[85px] w-[80px]" />

            <div className="text-gray-80 w-[202px] text-center text-[14px] leading-[20px] font-medium">
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
}
