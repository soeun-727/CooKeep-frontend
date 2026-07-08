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
    <div className="bg-black-overlay fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-gray-0 relative flex h-43 w-[254px] flex-col items-center rounded-[10px]">
        <h2 className="typo-body text-gray-80 mt-[35px] mb-2 h-6 w-[198px] text-center">
          이번 주 목표, 이걸로 가볼까요?
        </h2>
        <p className="typo-body2 text-green-deep mb-4 h-5 w-[198px] truncate text-center font-medium">
          {description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="typo-label text-gray-0 bg-green h-11 w-[95px] rounded-[10px]"
          >
            네
          </button>
          <button
            onClick={onClose}
            className="typo-label text-gray-0 bg-gray-30 h-11 w-[95px] rounded-[10px]"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
