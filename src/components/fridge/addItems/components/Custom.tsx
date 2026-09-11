import { useEffect, useRef, useState } from "react";

import {
  type CategoryType,
  type CustomIngredientRequest,
  type CustomIngredientResponse,
  registerCustomIngredient,
} from "@/api/ingredient";
import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

import EditIcon from "@/assets/icons/rename.svg?react";

import { CATEGORY_ID_TO_SERVER_KEY } from "@/constants/category";
import { DEFAULT_EXPIRY_DAYS } from "@/constants/expiry";

interface CustomProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (serverData: CustomIngredientResponse) => void;
  categories: { id: number; name: string; image: string; serverKey: string }[];
  confirmText?: string;
}

export default function Custom({
  isOpen,
  onClose,
  onConfirm,
  categories,
  confirmText = "추가",
}: CustomProps) {
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
    <div className="bg-black-overlay fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-gray-0 shadow-container rounded-L relative flex h-[316px] w-[280px] flex-col items-center px-7 py-[35px]">
        <div className="mb-4 flex w-full items-center justify-center gap-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={localName}
              onChange={e => setLocalName(e.target.value)}
              onBlur={finishEditing}
              onKeyDown={e => e.key === "Enter" && finishEditing()}
              className="typo-l-strong text-gray-80 border-gray-30 w-[180px] border-b text-center font-bold outline-none"
            />
          ) : (
            <div className="group flex items-center justify-center gap-1">
              <h2 className="typo-l-strong text-gray-80 max-w-[180px] truncate text-center font-bold break-all">
                '{localName}'
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <EditIcon className="h-5 w-5 text-gray-50" />
              </button>
            </div>
          )}
        </div>

        <p className="mb-4 text-center text-[12px] leading-none text-gray-50">
          '{localName}'의 카테고리를 선택해주세요
        </p>

        <div className="no-scrollbar mb-4 grid h-40 w-40 flex-1 grid-cols-3 gap-2 overflow-y-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              disabled={isLoading}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`rounded-S flex h-12 w-12 flex-col items-center gap-[2px] pt-2 ${
                selectedCategoryId === cat.id
                  ? "bg-gray-100 ring-1 ring-gray-300 ring-inset"
                  : "bg-gray-0 hover:bg-gray-50"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <div className="flex w-[18px] items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-contain"
                />
              </div>
              <span className="w-[26px] truncate text-[10px] leading-none font-semibold whitespace-nowrap text-gray-50">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={selectedCategoryId === null || isLoading}
          className={`typo-label text-gray-0 rounded-M h-11 w-full transition-colors ${
            selectedCategoryId !== null && !isLoading
              ? "bg-green-deep"
              : "bg-gray-30 cursor-not-allowed"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
