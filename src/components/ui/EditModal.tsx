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
    <div className="fixed inset-0 z-200 flex items-end justify-center">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체 */}
      <div className="animate-slide-up relative w-full max-w-[450px] gap-[18px] rounded-t-[30px] bg-white px-4 py-[19px]">
        <div className="mb-[26px] flex h-10 items-center justify-center p-2">
          <h3 className="typo-body mt-[19px]">{title}</h3>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
