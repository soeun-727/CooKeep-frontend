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

  // fridge store에서 전부 관리
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

  // snapshot 저장
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
    <div className="flex w-full flex-col gap-3 pb-32">
      <div className="w-full">
        <BackHeader title="재료 선택" onBack={handleBack} />
      </div>

      {!viewCategory && <FloatingNotice text="요리할 재료를 선택해 주세요" />}

      <div className="mt-[48px] flex flex-col gap-6">
        <Search
          placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
          value={searchTerm}
          onChange={handleSearch}
        />

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
          <>
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
          </>
        )}
      </div>

      {!viewCategory && (
        <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2">
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
