interface GoalcheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
}

export default function GoalcheckModal({
  isOpen,
  onClose,
  description,
  onConfirm,
}: GoalcheckModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative flex h-43 w-[254px] flex-col items-center rounded-[10px] bg-white shadow-xl">
        <h2 className="typo-body mt-[35px] mb-2 h-6 w-[198px] text-center text-neutral-900">
          이번 주 목표, 이걸로 가볼까요?
        </h2>
        <p className="typo-body2 mb-4 h-5 w-[198px] truncate text-center font-medium text-(--color-green-deep)">
          {description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="typo-label h-11 w-[95px] rounded-[10px] bg-(--color-green) text-white"
          >
            네
          </button>
          <button
            onClick={onClose}
            className="typo-label h-11 w-[95px] rounded-[10px] bg-stone-300 text-white"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
