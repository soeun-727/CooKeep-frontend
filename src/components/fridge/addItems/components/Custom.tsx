import { useEffect, useRef, useState } from "react";



import { type CategoryType, type CustomIngredientRequest, registerCustomIngredient } from "@/api/ingredient";
import { useAddIngredientStore } from "@/stores/useAddIngredientStore";



import editIcon from "@/assets/recipe/rename.svg";



import { CATEGORY_ID_TO_SERVER_KEY } from "@/constants/category";
import { DEFAULT_EXPIRY_DAYS } from "@/constants/expiry";















interface CustomProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (serverData: any) => void;
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

      <div className="bg-gray-0 relative flex w-[300px] flex-col items-center gap-6 rounded-[10px] p-6 shadow-xl">
        <section className="flex flex-col gap-3 items-center">
          <div className="mb-4 flex w-full items-center justify-center gap-1">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={localName}
                onChange={e => setLocalName(e.target.value)}
                onBlur={finishEditing}
                onKeyDown={e => e.key === "Enter" && finishEditing()}
                className="typo-body text-gray-80 border-gray-30 w-[180px] border-b text-center font-bold outline-none"
              />
            ) : (
              <div className="group flex items-center justify-center gap-1">
                <h2 className="typo-body text-gray-80 max-w-[180px] truncate text-center font-bold break-all">
                  '{localName}'
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
  );
}
