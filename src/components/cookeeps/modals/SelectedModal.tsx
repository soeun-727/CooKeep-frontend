import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plant: string;
  image: string;
  description: string;
  onConfirm: () => void;
}

const SelectedModal: React.FC<Props> = ({
  isOpen,
  onClose,
  plant,
  image,
  description,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* modal */}
      <div className="relative flex h-64 w-70 flex-col items-center rounded-[10px] bg-white px-7 pt-[35px] pb-[25px]">
        <h2 className="typo-body text-center">
          <span className="text-(--color-green-deep)">{plant} </span>
          <span>을/를 키워볼까요?</span>
        </h2>
        <img src={image} alt={plant} className="w-25 object-contain" />
        <div className="-mt-2 flex flex-col items-center">
          <div className="h-0 w-0 border-r-[6px] border-b-[8px] border-l-[6px] border-gray-200 border-r-transparent border-l-transparent" />
          <div className="flex items-center justify-center rounded-[3px] bg-gray-200 px-[10px] py-[3px]">
            <span className="text-center text-[8px] leading-tight text-zinc-500">
              {description}
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onConfirm}
            className="typo-label h-11 w-27 rounded-[10px] bg-(--color-green) text-white"
          >
            시작하기
          </button>
          <button
            onClick={onClose}
            className="typo-label h-11 w-27 rounded-[10px] bg-black text-white"
          >
            다시 고를래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedModal;
