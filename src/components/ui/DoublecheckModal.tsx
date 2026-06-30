import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DoublecheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "black" | "green" | "singular";
  closeOnOverlayClick?: boolean; // 배경 클릭 시 닫을지 여부 선택 옵션
}

export default function DoublecheckModal({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "네",
  cancelText = "아니오",
  variant = "black",
  closeOnOverlayClick = false,
}: DoublecheckModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isSingular = variant === "singular";
  const confirmBtnColor =
    variant === "green" ? "bg-(--color-green)" : "bg-black";
  const buttonWidth = isSingular ? "w-[184px]" : "w-[95px]";

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#11111180]">
      <div
        className="absolute inset-0 cursor-default"
        onClick={closeOnOverlayClick ? onClose : undefined}
      ></div>

      {/* 모달 박스 */}
      <div className="animate-popIn relative flex w-[254px] flex-col items-center rounded-[10px] bg-white px-7 py-[25px] shadow-xl">
        <h2 className="typo-body mb-2 w-[198px] text-center font-bold text-neutral-900">
          {title}
        </h2>
        {description && (
          <p className="typo-body2 mb-4 w-[198px] text-center font-medium whitespace-pre-wrap text-neutral-900">
            {description}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`typo-label h-11 rounded-[10px] text-white transition-colors active:opacity-80 ${confirmBtnColor} ${buttonWidth}`}
          >
            {confirmText}
          </button>
          {!isSingular && (
            <button
              onClick={onClose}
              className="typo-label h-11 w-[95px] rounded-[10px] bg-stone-300 text-white active:opacity-80"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
