import { useEffect, useMemo, useState } from "react";
import { loadingChar, searchIcon } from "../../../assets";
import searchOnIcon from "../../../assets/fridge/search_on.svg";
import TextField from "../../ui/TextField";
import xIcon from "../../../assets/onboarding/x.svg";
import InputModal from "./InputModal";
import {
  getOnboardingIngredients,
  OnboardingIngredient,
} from "../../../api/onboarding";
import { useOnboardingStore } from "../../../stores/useOnboardingStore";

export default function Preference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allIngredients, setAllIngredients] = useState<OnboardingIngredient[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedIngredients, setSelectedIngredients } = useOnboardingStore();

  const hasText = searchTerm.length > 0;

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

    return allIngredients.filter((item) => {
      if (!item.ingredient) return false;

      const matchesSearch = item.ingredient.toLowerCase().includes(trimmed);
      const isNotSelected = !selectedIngredients.some(
        (s) => s.defaultIngredientId === item.defaultIngredientId,
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
      selectedIngredients.filter((item) => item.defaultIngredientId !== id),
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

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center text-center mt-50">
        <img className="opacity-70 w-30 p-5" src={loadingChar} />
        <div className="typo-body2 text-zinc-500">로딩 중...</div>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1 !text-[22px]">먹지 못하는 식재료가 있나요?</h1>
        <h3 className="typo-h3 text-gray-500">
          해당 재료는 레시피에서 제외할게요
        </h3>
      </div>
      <div className="relative mt-[46px] flex flex-col items-center">
        <div
          className={`
            relative w-[361px] transition-all duration-200
            ${isDropdownOpen ? "rounded-t-[6px] rounded-b-none" : "rounded-[6px]"}
            overflow-hidden
            [&_p]:hidden
            [&_input]:w-full
            typo-body2
            [&_input]:outline-none 
            [&_input::placeholder]:text-[#7D7D7D]
            ${
              isDropdownOpen
                ? `[&_div]:rounded-b-none [&_div]:border-b-0 [&_input]:rounded-b-none [&_input]:border-b-0`
                : ""
            }
          `}
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            onChange={setSearchTerm}
            rightIcon={
              <div className="flex items-center justify-center transition-opacity duration-200">
                <img
                  src={hasText ? searchOnIcon : searchIcon}
                  alt="search"
                  className={hasText ? "cursor-pointer" : "cursor-default"}
                />
              </div>
            }
          />
        </div>

        {/* 선택된 재료 */}
        <div className="flex flex-wrap mt-[18px] w-[361px] gap-[6px]">
          {selectedIngredients.map((ingredient) => (
            <div
              key={ingredient.defaultIngredientId}
              onClick={() => handleRemove(ingredient.defaultIngredientId)}
              className="bg-gray-200 px-3 px-1 h-7 flex gap-1 rounded-[100px] items-center"
            >
              <img src={xIcon} className="w-3 h-3" />
              <span className="typo-caption !font-medium text-zinc-500">
                {ingredient.ingredient}
              </span>
            </div>
          ))}
        </div>

        {hasText && filteredIngredients.length > 0 && (
          <ul className="absolute top-12 w-[361px] bg-white border border-[#DDDDDD] !border-t-0 rounded-b-[6px] z-50 max-h-[200px] overflow-y-auto typo-body2">
            {filteredIngredients.map((item) => (
              <li
                key={item.defaultIngredientId}
                onClick={() => handleSelect(item)}
                className="h-12 p-3 hover:bg-gray-100 cursor-pointer"
              >
                {highlightText(item.ingredient, searchTerm.trim())}
              </li>
            ))}
            <li
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`h-12 p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2`}
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
