import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import { Search } from "@/components/fridge/features/Search";
import Sort from "@/components/fridge/features/Sort";
import IngredientGrid from "@/components/fridge/items/IngredientGrid";
import Storage from "@/components/fridge/main/Storage";
import FloatingNotice from "@/components/recipe/main/FloatingNotice";
import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import { useSortedIngredients } from "@/hooks/useSortedIngredients";

export default function RecipeSelectPage() {
  const navigate = useNavigate();

  const {
    ingredients,
    viewCategory,
    setViewCategory,
    selectedIds,
    searchTerm,
    setSearchTerm,
  } = useIngredientStore();

  const { sortedIngredients } = useSortedIngredients();

  const filteredIngredients = sortedIngredients
    .filter(item => (viewCategory ? item.category === viewCategory : true))
    .filter(item =>
      searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    );

  const { setSelectedIngredients } = useRecipeFlowStore();

  const handleConfirm = () => {
    const selectedIngredients = ingredients.filter(item =>
      selectedIds.includes(item.id),
    );
    setSelectedIngredients(selectedIngredients);
    navigate("/recipe/confirm");
  };

  const handleBack = () => {
    if (viewCategory) {
      setViewCategory(null);
    } else {
      navigate(-1);
    }
  };

  const getIcon = (category: string) => {
    if (category === "냉장") return FridgeIcon;
    if (category === "냉동") return FreezerIcon;
    return PantryIcon;
  };
  const handleSearch = (value: string) => {
    setSearchTerm(value);

    // 검색 시작 시 전체보기(카테고리 뷰) 해제
    if (value.trim().length > 0) {
      setViewCategory(null);
    }
  };
  return (
    <div className="flex w-full flex-col pb-5">
      <BackHeader title="재료 선택" onBack={handleBack} />

      {!viewCategory && (
        <FloatingNotice
          text={
            selectedIds.length > 0
              ? "다른 재료도 골라볼까요?"
              : "요리할 재료를 선택해 주세요"
          }
        />
      )}

      <div className="mt-13 flex flex-col gap-6">
        <div className="flex items-center px-4">
          <Search
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {viewCategory || searchTerm ? (
          <>
            {viewCategory && (
              <Sort
                categoryIcon={getIcon(viewCategory)}
                viewCategory={viewCategory}
              />
            )}
            <IngredientGrid items={filteredIngredients} />
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Storage
              category="냉장"
              icon={FridgeIcon}
              ingredients={ingredients.filter(i => i.category === "냉장")}
            />
            <Storage
              category="냉동"
              icon={FreezerIcon}
              ingredients={ingredients.filter(i => i.category === "냉동")}
            />
            <Storage
              category="상온"
              icon={PantryIcon}
              ingredients={ingredients.filter(i => i.category === "상온")}
            />
          </div>
        )}
      </div>

      {!viewCategory && (
        <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 flex w-full max-w-[450px] -translate-x-1/2 items-center px-4">
          <Button
            size="L"
            variant="black"
            disabled={selectedIds.length === 0}
            onClick={handleConfirm}
          >
            선택 완료
          </Button>
        </div>
      )}
    </div>
  );
}
