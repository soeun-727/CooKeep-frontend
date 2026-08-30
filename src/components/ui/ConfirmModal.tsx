interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  confirmButtonClassName,
  cancelButtonClassName,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="bg-black-overlay absolute inset-0" onClick={onCancel} />

      {/* Modal */}
      <div className="bg-gray-0 shadow-container relative z-10 flex w-[300px] flex-col items-center gap-6 rounded-2xl p-6">
        {/* Text */}
        <div className="flex w-full flex-col items-center gap-3">
          <p className="typo-l-strong text-gray-80 text-center">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-2">
          {/* 확인(아니오) */}
          <button
            onClick={onConfirm}
            className={`flex h-11 flex-1 items-center justify-center rounded-xl ${
              confirmButtonClassName ?? "bg-gray-80"
            }`}
          >
            <span className="text-gray-0 typo-l-strong">네</span>
          </button>
          {/* 취소(아니오) */}
          <button
            onClick={onCancel}
            className={`flex h-11 flex-1 items-center justify-center rounded-xl ${
              cancelButtonClassName ?? "bg-gray-30"
            }`}
          >
            <span className="text-gray-0 typo-l-strong">아니오</span>
          </button>
        </div>
      </div>
    </div>
  );
}
