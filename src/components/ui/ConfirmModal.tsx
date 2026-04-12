type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(17,17,17,0.5)]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        {/* Text */}
        <p className="typo-body2 text-center text-[#111]">{message}</p>

        {/* Buttons */}
        <div className="mt-4 flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#202020]"
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
