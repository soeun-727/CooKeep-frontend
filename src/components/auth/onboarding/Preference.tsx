import { useMemo, useState } from "react";

import { OnboardingIngredient } from "@/api/onboarding";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

import XIcon from "@/assets/onboarding/x.svg?react";

import { Search } from "@/components/fridge/features/Search";
import { InputModal } from "@/components/fridge/modals/InputModal";
interface PreferenceProps {
  allIngredients?: OnboardingIngredient[];
}

export default function Preference({ allIngredients = [] }: PreferenceProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customIngredient, setCustomIngredient] = useState("");

  const { selectedIngredients, setSelectedIngredients } = useOnboardingStore();

  const hasText = searchTerm.length > 0;

  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const trimmed = searchTerm.trim().toLowerCase();

    return allIngredients.filter(item => {
      if (!item.ingredient) return false;

      const matchesSearch = item.ingredient.toLowerCase().includes(trimmed);
      const isNotSelected = !selectedIngredients.some(
        s => s.defaultIngredientId === item.defaultIngredientId,
      );

      return matchesSearch && isNotSelected;
    });
  }, [searchTerm, allIngredients, selectedIngredients]);

  const isDropdownOpen = hasText && filteredIngredients.length > 0;

  const handleSelect = (item: OnboardingIngredient) => {
    setSelectedIngredients([...selectedIngredients, item]);
    setSearchTerm("");
  };

  const handleRemove = (id: number) => {
    setSelectedIngredients(
      selectedIngredients.filter(item => item.defaultIngredientId !== id),
    );
  };

  const handleAddCustom = (newName: string) => {
    const customItem: OnboardingIngredient = {
      defaultIngredientId: -Date.now(),
      ingredient: newName,
    };
    setSelectedIngredients([...selectedIngredients, customItem]);
    setSearchTerm("");
    setCustomIngredient("");
    setIsModalOpen(false);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "text-(--color-green-deep)"
                : ""
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full gap-2">
        <h1 className="typo-h2">먹지 못하는 재료가 있나요?</h1>
        <h3 className="typo-l text-gray-50">
          해당 재료는 레시피에서 제외할게요
        </h3>
      </div>
      <div className="relative flex w-full flex-col items-center gap-4">
        <Search
          placeholder="ex. 고구마, 초코우유..."
          value={searchTerm}
          onChange={setSearchTerm}
          bgColor="bg-gray-0"
          rounded={
            isDropdownOpen
              ? "rounded-t-[12px] rounded-b-none"
              : "rounded-[12px]"
          }
        />

        {/* 선택된 재료 */}
        <div className="flex w-full flex-wrap gap-[6px]">
          {selectedIngredients.map(ingredient => (
            <div
              key={ingredient.defaultIngredientId}
              onClick={() => handleRemove(ingredient.defaultIngredientId)}
              className="bg-gray-10 flex h-7 items-center gap-1 rounded-full px-1 px-3"
            >
              <XIcon
                className={`h-3 w-3 ${ingredient.defaultIngredientId < 0 ? "text-green-deep" : "text-gray-50"}`}
              />
              <span
                className={`typo-m ${ingredient.defaultIngredientId < 0 ? "text-green-deep" : "text-gray-50"}`}
              >
                {ingredient.ingredient}
              </span>
            </div>
          ))}
        </div>

        {hasText && (
          <ul className="bg-gray-0 border-gray-10 typo-m absolute top-12 z-50 max-h-[200px] w-full overflow-y-auto rounded-b-[12px] border !border-t-0">
            {filteredIngredients.map(item => (
              <li
                key={item.defaultIngredientId}
                onClick={() => {
                  setTimeout(() => {
                    handleSelect(item);
                  }, 300);
                }}
                className="hover:bg-gray-10 active:bg-gray-10 cursor-pointer p-3 transition-colors"
              >
                {highlightText(item.ingredient, searchTerm.trim())}
              </li>
            ))}
            <li
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`hover:bg-gray-10 flex cursor-pointer items-center gap-2 p-3`}
            >
              직접 입력하기
            </li>
          </ul>
        )}
      </div>
      {isModalOpen && (
        <InputModal
          title="재료명을 직접 입력하세요"
          placeholder="[ex. 땅콩 버터]"
          value={customIngredient}
          onChange={setCustomIngredient}
          onClose={() => {
            setCustomIngredient("");
            setIsModalOpen(false);
          }}
          onConfirm={handleAddCustom}
          buttonTexts={["확인", "취소"]}
        />
      )}
    </div>
  );
}
