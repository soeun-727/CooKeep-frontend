import { useEffect, useMemo, useState } from "react";
import { loadingChar, searchIcon } from "@/assets/index";
import searchOnIcon from "@/assets/fridge/search_on.svg";
import TextField from "@/components/ui/TextField";
import xIcon from "@/assets/onboarding/x.svg";
import InputModal from "./InputModal";
import {
  getOnboardingIngredients,
  OnboardingIngredient,
  RawIngredient,
} from "@/api/onboarding";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

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
        const ingredientsList: RawIngredient[] = res.data?.data?.ingredients;

        if (ingredientsList && Array.isArray(ingredientsList)) {
          const mapped = ingredientsList.map((item) => ({
            defaultIngredientId: item.ingredientId,
            ingredient: item.name,
          }));

          setAllIngredients(mapped);
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

  const isDropdownOpen = hasText;

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
      <div className="mt-50 flex flex-col items-center justify-center text-center">
        <img className="w-30 p-5 opacity-70" src={loadingChar} />
        <div className="typo-body2 text-zinc-500">로딩 중...</div>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[46px] w-[361px]">
        <h1 className="typo-h1 !text-[22px]">먹지 못하는 식재료가 있나요?</h1>
        <h3 className="typo-h3 text-gray-500">
          해당 재료는 레시피에서 제외할게요
        </h3>
      </div>
      <div className="relative mt-[46px] flex flex-col items-center">
        <div
          className={`relative w-[361px] transition-all duration-200 ${isDropdownOpen ? "rounded-t-[6px] rounded-b-none" : "rounded-[6px]"} typo-body2 overflow-hidden [&_input]:w-full [&_input]:outline-none [&_input::placeholder]:text-[#7D7D7D] [&_p]:hidden ${
            isDropdownOpen
              ? `[&_div]:rounded-b-none [&_div]:border-b-0 [&_input]:rounded-b-none [&_input]:border-b-0`
              : ""
          } `}
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
        <div className="mt-[18px] flex w-[361px] flex-wrap gap-[6px]">
          {selectedIngredients.map((ingredient) => (
            <div
              key={ingredient.defaultIngredientId}
              onClick={() => handleRemove(ingredient.defaultIngredientId)}
              className="flex h-7 items-center gap-1 rounded-[100px] bg-gray-200 px-1 px-3"
            >
              <img src={xIcon} className="h-3 w-3" />
              <span className="typo-caption !font-medium text-zinc-500">
                {ingredient.ingredient}
              </span>
            </div>
          ))}
        </div>

        {hasText && (
          <ul className="typo-body2 absolute top-12 z-50 max-h-[200px] w-[361px] overflow-y-auto rounded-b-[6px] border !border-t-0 border-[#DDDDDD] bg-white">
            {filteredIngredients.map((item) => (
              <li
                key={item.defaultIngredientId}
                onClick={() => handleSelect(item)}
                className="h-12 cursor-pointer p-3 hover:bg-gray-100"
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
