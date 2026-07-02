interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="bg-black-overlay absolute inset-0" onClick={onCancel} />

      {/* Modal */}
      <div className="bg-gray-0 relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] px-[28px] pt-[35px] pb-[25px]">
        {/* Text */}
        <p className="typo-body2 text-gray-80 text-center">{message}</p>

        {/* Buttons */}
        <div className="mt-4 flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className="bg-gray-80 flex h-[44px] flex-1 items-center justify-center rounded-[10px]"
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
