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
      <div className="absolute inset-0 bg-black-overlay" onClick={onCancel} />

      {/* Modal */}
      <div className="relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] bg-gray-0 px-[28px] pt-[35px] pb-[25px]">
        {/* Text */}
        <p className="typo-body2 text-center text-gray-80">{message}</p>

        {/* Buttons */}
        <div className="mt-4 flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-gray-80"
          >
            <span className="text-[14px] font-semibold leading-[24px] text-gray-0">
              네
            </span>
          </button>
          {/* 취소(아니오) */}
          <button
            onClick={onCancel}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-gray-30"
          >
            <span className="text-[14px] font-semibold leading-[24px] text-gray-0">
              아니오
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
