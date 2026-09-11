import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";

interface PhotoRewardModalProps {
  onConfirm: () => void;
}

export default function PhotoRewardModal({ onConfirm }: PhotoRewardModalProps) {
  return createPortal(
    <div className="bg-black-overlay fixed inset-0 z-[999] flex items-center justify-center">
      <div className="bg-gray-0 rounded-L flex w-[258px] flex-col items-center gap-[18px] px-[28px] pt-[35px] pb-[25px]">
        <div className="flex flex-col items-center gap-[20px]">
          <p className="text-gray-80 w-[202px] text-center text-[14px] leading-[20px] font-medium">
            요리 사진 등록!
            <br />
            추가 쿠키가 도착했어요
          </p>
        </div>

        <Button
          size="S"
          variant="green"
          className="!w-[202px]"
          onClick={onConfirm}
        >
          확인
        </Button>
      </div>
    </div>,
    document.body,
  );
}
