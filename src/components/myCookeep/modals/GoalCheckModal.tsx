import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
}

const GoalcheckModal: React.FC<Props> = ({
  isOpen,
  onClose,
  description,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-[254px] h-43 bg-white rounded-[10px] shadow-xl flex flex-col items-center">
        <h2 className="typo-body w-[198px] h-6 mb-2 text-center text-neutral-900 mt-[35px]">
          이번 주 목표, 이걸로 가볼까요?
        </h2>
        <p className="mb-4 typo-body2 w-[198px] h-5 text-center font-medium text-(--color-green-deep) truncate">
          {description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="typo-label w-[95px] h-11 text-white bg-(--color-green) rounded-[10px]"
          >
            네
          </button>
          <button
            onClick={onClose}
            className="typo-label w-[95px] h-11 text-white bg-stone-300 rounded-[10px]"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalcheckModal;
