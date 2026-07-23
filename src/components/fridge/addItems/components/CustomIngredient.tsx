import { useEffect, useState } from "react";

import {
  type CategoryType,
  type CustomIngredientRequest,
  registerCustomIngredient,
} from "@/api/ingredient";
import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

import EditIcon from "@/assets/icons/rename.svg?react";

import { InputModal } from "@/components/fridge/modals/InputModal";

import { CATEGORY_ID_TO_SERVER_KEY } from "@/constants/category";
import { DEFAULT_EXPIRY_DAYS } from "@/constants/expiry";

interface CustomProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (serverData: any) => void;
  categories: {
    id: number;
    name: string;
    image: string;
    serverKey: string;
  }[];
  confirmText?: string;
}

export default function CustomIngredient({
  isOpen,
  onClose,
  onConfirm,
  categories,
  confirmText = "추가",
}: CustomProps) {
  const { searchTerm } = useAddIngredientStore();

  const [ingredientName, setIngredientName] = useState(searchTerm);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIngredientName(searchTerm);
      setSelectedCategoryId(null);
    }
  }, [isOpen, searchTerm]);

  const handleConfirm = async () => {
    if (selectedCategoryId === null || isLoading) return;

    setIsLoading(true);

    try {
      const serverCategoryKey = CATEGORY_ID_TO_SERVER_KEY[
        selectedCategoryId
      ] as CategoryType;

      const expiryDays = DEFAULT_EXPIRY_DAYS[serverCategoryKey] || 7;

      const requestData: CustomIngredientRequest = {
        name: ingredientName.trim() || "이름 없음",
        expirationDays: expiryDays,
        storage: "FRIDGE",
        category: serverCategoryKey,
      };

      const response = await registerCustomIngredient(requestData);

      if (response.data?.data) {
        onConfirm(response.data.data);
      }

      setSelectedCategoryId(null);
      setIsNameModalOpen(false);
      onClose();
    } catch (error) {
      console.error("식재료 등록 실패:", error);
      alert("이미 등록한 식재료와 같은 이름의 식재료는 등록할 수 없어요");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIngredientName(searchTerm);
    setSelectedCategoryId(null);
    setIsNameModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-gray-80/50 fixed inset-0 z-80 mx-auto flex max-w-[450px] items-center justify-center">
        <div className="absolute inset-0" onClick={handleClose} />

        <div className="bg-gray-0 relative flex w-[300px] flex-col items-center gap-6 rounded-[10px] p-6 shadow-xl">
          <section className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-[11px]">
              <h2 className="typo-l-strong text-gray-80 max-w-[180px] truncate text-center break-all">
                {ingredientName}
              </h2>

              <button type="button" onClick={() => setIsNameModalOpen(true)}>
                <EditIcon className="h-[18px] w-[18px] text-gray-50" />
              </button>
            </div>

            <div className="no-scrollbar grid w-full flex-1 grid-cols-2 gap-1 overflow-y-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`flex items-center gap-1 rounded-[6px] px-3 py-2 transition-all ${
                    selectedCategoryId === cat.id
                      ? "bg-gray-10"
                      : "bg-gray-0 hover:bg-gray-10"
                  } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-5 w-5 object-contain"
                  />

                  <span className="typo-label whitespace-nowrap text-gray-50">
                    {cat.name === "양념 · 소스 · 조미료"
                      ? cat.name.replace(" · 조미료", "")
                      : cat.name}
                  </span>
                </button>
              ))}
            </div>

            <p className="typo-m text-gray-80">
              추가할 재료의 카테고리를 선택해주세요
            </p>
          </section>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedCategoryId === null || isLoading}
            className={`typo-label text-gray-0 h-11 w-full rounded-[10px] transition-colors ${
              selectedCategoryId !== null && !isLoading
                ? "bg-green-deep"
                : "bg-gray-30 cursor-not-allowed"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      {isNameModalOpen && (
        <InputModal
          title="재료명을 입력해주세요"
          buttonTexts={["확인", "취소"]}
          placeholder="[ ex. 대파 ]"
          value={ingredientName}
          onChange={setIngredientName}
          onConfirm={() => {
            if (!ingredientName.trim()) return;
            setIsNameModalOpen(false);
          }}
          onClose={() => {
            setIngredientName(searchTerm);
            setIsNameModalOpen(false);
          }}
        />
      )}
    </>
  );
}
