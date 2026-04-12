import { useEffect, useRef, useState } from "react";
import editIcon from "../../../assets/recipe/rename.svg";

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
      <div className="relative w-70 h-44 bg-white rounded-[10px] shadow-xl flex flex-col items-center px-7 pt-[35px] pb-[25px]">
        <div className="w-full flex items-center justify-center gap-1 mb-4">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeyDown}
              placeholder="직접 입력"
              className="typo-body w-[180px] text-center font-bold text-neutral-900 border-b border-zinc-300 outline-none"
            />
          ) : (
            <div className="flex items-center justify-center gap-1 group">
              <h2 className="typo-body max-w-[180px] text-center font-bold text-neutral-900 break-all truncate">
                {inputValue || "직접 입력"}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img src={editIcon} alt="edit" className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <p className="text-[12px] text-zinc-500 mb-4 leading-none text-center">
          재료명을 입력하세요
        </p>

        <button
          onClick={handleConfirm}
          disabled={!inputValue.trim() || isLoading}
          className={`typo-label w-full h-11 text-white rounded-[10px] transition-colors
            ${
              inputValue.trim() && !isLoading
                ? "bg-[var(--color-green)]"
                : "bg-zinc-300 cursor-not-allowed"
            }`}
        >
          추가
        </button>
      </div>
    </div>
  );
}
