interface SelectViewTypeModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

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
      <div className="bg-gray-0 relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] px-[28px] pt-[35px] pb-[25px]">
        {/* Text */}
        <p className="typo-button text-green-deep text-center">{message}</p>

        {/* Text */}
        <p className="typo-body2 text-center text-gray-50">
          상태를 변경할까요?
        </p>

        {/* Buttons */}
        <div className="mt-4 flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className="bg-green flex h-[44px] flex-1 items-center justify-center rounded-[10px]"
          >
            <span className="text-gray-0 text-[14px] leading-[24px] font-semibold">
              네
            </span>
          </button>
          {/* 취소(아니오) */}
          <button
            onClick={onCancel}
            className="bg-gray-30 flex h-[44px] flex-1 items-center justify-center rounded-[10px]"
          >
            <span className="text-gray-0 text-[14px] leading-[24px] font-semibold">
              아니오
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
