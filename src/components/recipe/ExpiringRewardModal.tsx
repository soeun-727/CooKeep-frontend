import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";

interface ExpiringRewardModalProps {
  onConfirm: () => void;
}

export default function ExpiringRewardModal({
  onConfirm,
}: ExpiringRewardModalProps) {
  return createPortal(
    <div className="bg-black-overlay fixed inset-0 z-[999] flex items-center justify-center">
      <div className="bg-gray-0 rounded-L flex w-[258px] flex-col items-center gap-[18px] px-[28px] pt-[35px] pb-[25px]">
        <div className="flex flex-col items-center gap-[20px]">
          <p className="text-gray-80 w-[202px] text-center text-[14px] leading-[20px] font-medium">
            유통기한 임박 재료를 살렸어요!
            <br />
            선물로 쿠키 3개를 드려요
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
