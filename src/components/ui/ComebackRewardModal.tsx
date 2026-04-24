import React from "react";
import icon from "../../assets/character/surprised_char.svg";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ComebackRewardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose} />

      {/* 전체 */}
      <div className="relative flex w-[258px] flex-col items-center gap-[18px] rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        {/* 내용 + 버튼 */}
        <div className="flex w-full flex-col items-center gap-[28px]">
          {/* 내용 */}
          <div className="flex flex-col items-center gap-[20px]">
            {/* 🔥 텍스트1 (맨 위) */}
            <div className="w-[202px] text-center typo-body2 text-[#202020]">
              쿠킵은 기다리고 있었어요!
            </div>

            {/* 🔥 이미지 */}
            <img src={icon} className="w-[60px] h-[56px]" alt="comeback" />

            {/* 🔥 텍스트2 */}
            <div className="w-[202px] text-center typo-body2 text-[#202020]">
              오랜만에 오신 기념으로
              <br />
              쿠키를 준비했어요
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

export default ComebackRewardModal;
