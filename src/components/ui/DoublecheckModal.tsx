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
  closeOnOverlayClick?: boolean;
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
  const confirmBtnColor = variant === "green" ? "bg-green" : "bg-black";
  const buttonWidth = isSingular ? "w-[184px]" : "w-[95px]";

  return createPortal(
    <div className="bg-black-overlay fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 cursor-default"
        onClick={closeOnOverlayClick ? onClose : undefined}
      ></div>

      {/* 모달 박스 */}
      <div className="bg-gray-0 animate-popIn relative flex w-[254px] flex-col items-center rounded-[10px] px-7 py-[25px] shadow-xl">
        <h2 className="typo-body text-gray-80 mb-2 w-[198px] text-center font-bold">
          {title}
        </h2>
        {description && (
          <p className="typo-body2 text-gray-80 mb-4 w-[198px] text-center font-medium whitespace-pre-wrap">
            {description}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`typo-label text-gray-0 h-11 rounded-[10px] transition-colors active:opacity-80 ${confirmBtnColor} ${buttonWidth}`}
          >
            {confirmText}
          </button>
          {!isSingular && (
            <button
              onClick={onClose}
              className="typo-label text-gray-0 bg-gray-30 h-11 w-[95px] rounded-[10px] active:opacity-80"
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
