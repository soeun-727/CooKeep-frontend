import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function EditModal({
  isOpen,
  onClose,
  title,
  children,
}: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-end justify-center">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체 */}
      <div className="bg-gray-0 animate-slide-up relative flex w-full max-w-[450px] flex-col gap-6 rounded-t-[16px] px-4 pt-6">
        <h3 className="typo-l-strong flex justify-center">{title}</h3>

        <div>{children}</div>
      </div>
    </div>
  );
}
