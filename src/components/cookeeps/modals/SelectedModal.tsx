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
      <div className="relative w-70 h-64 bg-white rounded-[10px] flex flex-col items-center pt-[35px] px-7 pb-[25x]">
        <h2 className="typo-body text-center">
          <span className="text-(--color-green-deep)">{plant} </span>
          <span>을/를 키워볼까요?</span>
        </h2>
        <img src={image} alt={plant} className="w-25 object-contain" />
        <div className="flex flex-col items-center -mt-2">
          <div
            className="w-0 h-0 border-gray-200 
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-b-[8px] "
          />
          <div className="bg-gray-200 rounded-[3px] h-[14px] flex items-center justify-center px-[10px]">
            <span className="text-center text-zinc-500 text-[8px] h-[10px]">
              {description}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onConfirm}
            className="typo-label w-27 h-11 text-white bg-(--color-green) rounded-[10px]"
          >
            시작하기
          </button>
          <button
            onClick={onClose}
            className="typo-label w-27 h-11 text-white bg-black rounded-[10px]"
          >
            다시 고를래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedModal;
