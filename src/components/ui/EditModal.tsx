import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function EditModal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-end justify-center ">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체 */}
      <div className="relative w-full max-w-[450px] bg-white rounded-t-[30px] py-[19px] px-4 animate-slide-up gap-[18px]">
        <div className="flex justify-center items-center h-10 p-2 mb-[26px]">
          <h3 className="typo-body mt-[19px]">{title}</h3>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
