import { useEffect, useRef, useState } from "react";

import editIcon from "@/assets/recipe/rename.svg";

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
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative flex h-44 w-70 flex-col items-center rounded-[10px] bg-white px-7 pt-[35px] pb-[25px] shadow-xl">
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
              className="typo-body w-[180px] border-b border-zinc-300 text-center font-bold text-neutral-900 outline-none"
            />
          ) : (
            <div className="group flex items-center justify-center gap-1">
              <h2 className="typo-body max-w-[180px] truncate text-center font-bold break-all text-neutral-900">
                {inputValue || "직접 입력"}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <img src={editIcon} alt="edit" className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <p className="mb-4 text-center text-[12px] leading-none text-zinc-500">
          재료명을 입력하세요
        </p>

        <button
          onClick={handleConfirm}
          disabled={!inputValue.trim() || isLoading}
          className={`typo-label h-11 w-full rounded-[10px] text-white transition-colors ${
            inputValue.trim() && !isLoading
              ? "bg-[var(--color-green)]"
              : "cursor-not-allowed bg-zinc-300"
          }`}
        >
          추가
        </button>
      </div>
    </div>
  );
}
