import { createPortal } from "react-dom";
import Button from "../../ui/Button";

interface PhotoRewardModalProps {
  onConfirm: () => void;
}

export default function PhotoRewardModal({ onConfirm }: PhotoRewardModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#11111180]">
      <div className="w-[258px] bg-white rounded-[10px] px-[28px] pt-[35px] pb-[25px] flex flex-col items-center gap-[18px]">
        <div className="flex flex-col items-center gap-[20px]">
          <p className="w-[202px] text-center text-[14px] font-medium leading-[20px] text-[#202020]">
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
