// src/pages/recipe/RecipeSelectPage.tsx
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import BackHeader from "../../components/ui/BackHeader";
import Search from "../../components/fridge/features/Search";
import Sort from "../../components/fridge/features/Sort";
import Storage from "../../components/fridge/main/Storage";
import IngredientGrid from "../../components/fridge/items/IngredientGrid";
import FloatingNotice from "../../components/recipe/main/FloatingNotice";

import { useIngredientStore } from "../../stores/useIngredientStore";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
import { useSortedIngredients } from "../../hooks/useSortedIngredients";

import fridgeIcon from "../../assets/fridge/fridge.svg";
import freezerIcon from "../../assets/fridge/freezer.svg";
import pantryIcon from "../../assets/fridge/pantry.svg";

export default function RecipeSelectPage() {
  const navigate = useNavigate();

  // fridge store에서 전부 관리
  const {
    ingredients,
    viewCategory,
    setViewCategory,
    selectedIds,
    searchTerm,
  } = useIngredientStore();

  const { sortedIngredients } = useSortedIngredients();

  const filteredIngredients = sortedIngredients
    .filter((item) => (viewCategory ? item.category === viewCategory : true))
    .filter((item) =>
      searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    );

  // snapshot 저장
  const { setSelectedIngredients } = useRecipeFlowStore();

  const handleConfirm = () => {
    const selectedIngredients = ingredients.filter((item) =>
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
    if (category === "냉장") return fridgeIcon;
    if (category === "냉동") return freezerIcon;
    return pantryIcon;
  };

  return (
    <div className="flex flex-col w-full pb-32">
      <BackHeader title="재료 선택" onBack={handleBack} />

      {!viewCategory && <FloatingNotice text="요리할 재료를 선택해 주세요" />}

      <div className="mt-[48px]">
        <Search />

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
              image={fridgeIcon}
              ingredients={ingredients.filter((i) => i.category === "냉장")}
            />
            <Storage
              category="냉동"
              image={freezerIcon}
              ingredients={ingredients.filter((i) => i.category === "냉동")}
            />
            <Storage
              category="상온"
              image={pantryIcon}
              ingredients={ingredients.filter((i) => i.category === "상온")}
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
