import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DoublecheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "black" | "green" | "singular" | "opposite" | "singular-green";
  closeOnOverlayClick?: boolean;
}

export default function DoublecheckModal({
  isOpen,
  onClose,
  title,
  description,
  inputValue,
  onInputChange,
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

  const isSingular = variant === "singular" || variant === "singular-green";

  const confirmBtnColor =
    variant === "green" || variant === "singular-green"
      ? "bg-green"
      : variant === "opposite"
        ? "bg-gray-30"
        : "bg-black";

  const cancelBtnColor = variant === "opposite" ? "bg-black" : "bg-gray-30";

  const buttonWidth = isSingular ? "w-[184px]" : "w-[95px]";

  return createPortal(
    <div className="bg-black-overlay fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 cursor-default"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div className="bg-gray-0 animate-popIn rounded-L relative flex w-75 flex-col items-center gap-6 p-6">
        <div className="text-gray-80 w-full gap-2 text-center">
          <h2 className="typo-l-strong w-full">{title}</h2>
          {description && (
            <p className="typo-m w-full whitespace-pre-wrap">{description}</p>
          )}
          {onInputChange !== undefined && (
            <input
              type="text"
              value={inputValue ?? ""}
              onChange={e => onInputChange(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") onConfirm();
                if (e.key === "Escape") onClose();
              }}
              autoFocus
              className="text-gray-80 typo-m w-full text-center outline-none"
            />
          )}
        </div>
        <div className="flex w-full gap-2">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`typo-l-strong text-gray-0 rounded-M h-11 w-full ${confirmBtnColor} ${buttonWidth}`}
          >
            {confirmText}
          </button>
          {!isSingular && (
            <button
              onClick={onClose}
              className={`typo-l-strong text-gray-0 rounded-M h-11 w-full ${cancelBtnColor}`}
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
