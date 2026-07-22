import { useEffect, useMemo, useState } from "react";

import {
  OnboardingIngredient,
  getOnboardingIngredients,
} from "@/api/onboarding";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

import { SearchIcon } from "@/assets/index";
import xIcon from "@/assets/onboarding/x.svg";

import TextField from "@/components/ui/TextField";

import InputModal from "./InputModal";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Preference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allIngredients, setAllIngredients] = useState<OnboardingIngredient[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedIngredients, setSelectedIngredients } = useOnboardingStore();

  const hasText = searchTerm.trim().length > 0;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        const res = await getOnboardingIngredients();
        const ingredientsList = res.data?.data?.ingredients;

        if (ingredientsList && Array.isArray(ingredientsList)) {
          setAllIngredients(ingredientsList);
        }
      } catch (error) {
        console.error("재료 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIngredients();
  }, []);

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

  const isDropdownOpen = hasText;

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
                ? "text-green-deep"
                : ""
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full gap-2">
        <h1 className="typo-h2">먹지 못하는 재료가 있나요?</h1>
        <h3 className="typo-l text-gray-50">
          해당 재료는 레시피에서 제외할게요
        </h3>
      </div>
      <div className="relative flex w-full flex-col items-center gap-4">
        <div
          className={`relative w-full duration-200 ${isDropdownOpen ? "rounded-t-[6px] rounded-b-none" : "rounded-[6px]"} typo-m [&_input]:w-full [&_input]:outline-none [&_input::placeholder]:text-gray-50 [&_p]:hidden ${
            isDropdownOpen
              ? `[&_div]:rounded-b-none [&_div]:border-b-0 [&_input]:rounded-b-none [&_input]:border-b-0`
              : ""
          } `}
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="ex. 고구마, 초코우유..."
            onChange={setSearchTerm}
            rightIcon={
              <div className="flex items-center justify-center transition-opacity duration-200">
                <SearchIcon
                  aria-label="search"
                  className={`h-6 w-6 ${hasText ? "text-gray-80 cursor-pointer" : "cursor-default text-gray-50"}`}
                />
              </div>
            }
          />
        </div>

        {/* 선택된 재료 */}
        <div className="flex w-full flex-wrap gap-[6px]">
          {selectedIngredients.map(ingredient => (
            <div
              key={ingredient.defaultIngredientId}
              onClick={() => handleRemove(ingredient.defaultIngredientId)}
              className="flex h-7 items-center gap-1 rounded-[100px] bg-gray-200 px-1 px-3"
            >
              <img src={xIcon} className="h-3 w-3" />
              <span className="typo-m text-gray-50">
                {ingredient.ingredient}
              </span>
            </div>
          ))}
        </div>

        {hasText && (
          <ul className="bg-gray-0 border-gray-10 typo-m absolute top-12 z-50 max-h-[200px] w-full overflow-y-auto rounded-b-[6px] border !border-t-0">
            {filteredIngredients.map(item => (
              <li
                key={item.defaultIngredientId}
                onClick={() => {
                  setTimeout(() => {
                    handleSelect(item);
                  }, 300);
                }}
                className="hover:bg-gray-10 active:bg-gray-10 h-12 cursor-pointer p-3 transition-colors"
              >
                {highlightText(item.ingredient, searchTerm.trim())}
              </li>
            ))}
            <li
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`flex h-12 cursor-pointer items-center gap-2 p-3 hover:bg-gray-100`}
            >
              직접 입력하기
            </li>
          </ul>
        )}
      </div>
      {isModalOpen && (
        <InputModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddCustom}
        />
      )}
    </div>
  );
}
