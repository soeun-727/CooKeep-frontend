import { useEffect, useRef, useState } from "react";

import EditIcon from "@/assets/icons/rename.svg?react";

interface InputModalProps {
  onClose: () => void;
  onConfirm: (ingredient: string) => void;
}

export default function InputModal({ onClose, onConfirm }: InputModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 수정 모드로 전환될 때 포커스 자동 맞춤
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleConfirm = () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    onConfirm(inputValue.trim());
    setIsLoading(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (isEditing) {
        setIsEditing(false); // 엔터 누르면 입력 완료(보기 모드)
      } else {
        handleConfirm(); // 보기 모드에서 엔터 누르면 최종 추가
      }
    }
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="bg-black-overlay absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="bg-gray-0 shadow-container rounded-L relative flex h-44 w-70 flex-col items-center px-7 pt-[35px] pb-[25px]">
        <div className="mb-4 flex w-full items-center justify-center gap-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeyDown}
              placeholder="직접 입력"
              className="typo-l-strong text-gray-80 border-gray-30 w-[180px] border-b text-center font-bold outline-none"
            />
          ) : (
            <div className="group flex items-center justify-center gap-1">
              <h2 className="typo-l-strong text-gray-80 max-w-[180px] truncate text-center font-bold break-all">
                {inputValue || "직접 입력"}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <EditIcon aria-label="edit" role="img" className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <p className="mb-4 text-center text-[12px] leading-none text-gray-50">
          재료명을 입력하세요
        </p>

        <button
          onClick={handleConfirm}
          disabled={!inputValue.trim() || isLoading}
          className={`typo-label text-gray-0 rounded-M h-11 w-full transition-colors ${
            inputValue.trim() && !isLoading
              ? "bg-green"
              : "bg-gray-30 cursor-not-allowed"
          }`}
        >
          추가
        </button>
      </div>
    </div>
  );
}
