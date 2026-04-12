import { createPortal } from "react-dom";
import Button from "../ui/Button";

interface ExpiringRewardModalProps {
  onConfirm: () => void;
}

export default function ExpiringRewardModal({
  onConfirm,
}: ExpiringRewardModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#11111180]">
      <div className="w-[258px] bg-white rounded-[10px] px-[28px] pt-[35px] pb-[25px] flex flex-col items-center gap-[18px]">
        <div className="flex flex-col items-center gap-[20px]">
          <p className="w-[202px] text-center text-[14px] font-medium leading-[20px] text-[#202020]">
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
