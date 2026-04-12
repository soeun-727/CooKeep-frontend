import React, { useEffect, useRef, useState } from "react";
import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";
import editIcon from "../../../../assets/recipe/rename.svg";
import { CATEGORY_ID_TO_SERVER_KEY } from "../../../../constants/category";
import { DEFAULT_EXPIRY_DAYS } from "../../../../constants/expiry";
import {
  registerCustomIngredient,
  type CategoryType,
  type CustomIngredientRequest,
} from "../../../../api/ingredient";

interface CustomProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (serverData: any) => void;
  categories: { id: number; name: string; image: string; serverKey: string }[];
  confirmText?: string;
}

const Custom: React.FC<CustomProps> = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  confirmText = "추가",
}) => {
  const { searchTerm } = useAddIngredientStore();
  const [localName, setLocalName] = useState(searchTerm);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (selectedCategoryId === null || isLoading) return;

    setIsLoading(true);
    try {
      const serverCategoryKey = CATEGORY_ID_TO_SERVER_KEY[
        selectedCategoryId
      ] as CategoryType;
      const expiryDays = DEFAULT_EXPIRY_DAYS[serverCategoryKey] || 7;

      const requestData: CustomIngredientRequest = {
        name: localName.trim() || "이름 없음",
        expirationDays: expiryDays,
        storage: "FRIDGE",
        category: serverCategoryKey,
      };

      const response = await registerCustomIngredient(requestData);

      if (response.data && response.data.data) {
        onConfirm(response.data.data);
      }

      setSelectedCategoryId(null);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("식재료 등록 실패:", error);
      alert("이미 등록한 식재료와 같은 이름의 식재료는 등록할 수 없어요");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLocalName(searchTerm);
    }
  }, [isOpen, searchTerm]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const finishEditing = () => {
    if (localName.trim() === "") {
      setLocalName("이름 없음");
    }
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-[280px] h-[316px] bg-white rounded-[10px] shadow-xl flex flex-col items-center px-7 py-[35px]">
        <div className="w-full flex items-center justify-center gap-1 mb-4">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onBlur={finishEditing}
              onKeyDown={(e) => e.key === "Enter" && finishEditing()}
              className="typo-body w-[180px] text-center font-bold text-neutral-900 border-b border-zinc-300 outline-none"
            />
          ) : (
            <div className="flex items-center justify-center gap-1 group">
              <h2 className="typo-body max-w-[180px] text-center font-bold text-neutral-900 break-all truncate">
                '{localName}'
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
          '{localName}'의 카테고리를 선택해주세요
        </p>

        <div className="w-40 h-40 flex-1 overflow-y-auto no-scrollbar grid grid-cols-3 gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              disabled={isLoading}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex flex-col items-center pt-2 rounded-[6px] transition-all w-12 h-12 gap-[2px]
                ${
                  selectedCategoryId === cat.id
                    ? "bg-gray-100 ring-1 ring-inset ring-gray-300"
                    : "bg-white hover:bg-gray-50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="w-[18px] flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-contain"
                />
              </div>
              <span className="w-[26px] truncate text-[10px] whitespace-nowrap leading-none font-semibold text-zinc-500">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={selectedCategoryId === null || isLoading}
          className={`typo-label w-full h-11 text-white rounded-[10px] transition-colors
            ${
              selectedCategoryId !== null && !isLoading
                ? "bg-[var(--color-green-deep)]"
                : "bg-zinc-300 cursor-not-allowed"
            }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Custom;
