type SelectViewTypeModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SelectViewTypeModal({
  message,
  onConfirm,
  onCancel,
}: SelectViewTypeModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(17,17,17,0.5)]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        {/* Text */}
        <p className="typo-button text-center text-[#1FC16F]">{message}</p>

        {/* Text */}
        <p className="typo-body2 text-center text-[#7D7D7D]">
          상태를 변경할까요?
        </p>

        {/* Buttons */}
        <div className="mt-4 flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#32E389]"
          >
            <span className="text-[14px] font-semibold leading-[24px] text-white">
              네
            </span>
          </button>
          {/* 취소(아니오) */}
          <button
            onClick={onCancel}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#C3C3C3]"
          >
            <span className="text-[14px] font-semibold leading-[24px] text-white">
              아니오
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
