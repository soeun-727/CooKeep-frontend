import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { generateAiRecipe } from "@/api/aiRecipe";
import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import Search from "@/components/fridge/features/Search";
import Sort from "@/components/fridge/features/Sort";
import IngredientGrid from "@/components/fridge/items/IngredientGrid";
import Storage from "@/components/fridge/main/Storage";
import FloatingNotice from "@/components/recipe/main/FloatingNotice";
import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import { useSortedIngredients } from "@/hooks/useSortedIngredients";
import { useState } from "react";

export default function RecipeSelectPage() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    ingredients,
    viewCategory,
    setViewCategory,
    selectedIds,
    searchTerm,
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

  const handleConfirm = async () => {
    if (isGenerating) return;
    const selectedIngredients = ingredients.filter(item =>
      selectedIds.includes(item.id),
    );
    setSelectedIngredients(selectedIngredients);

    try {
      setIsGenerating(true);
      const data = await generateAiRecipe({
        feature: "ANY",
        ingredientIds: selectedIds,
      });
      const flowStore = useRecipeFlowStore.getState() as any;
      if (typeof flowStore.setRecipeData === "function") {
        flowStore.setRecipeData(data);
      } else if (typeof flowStore.setRecipe === "function") {
        flowStore.setRecipe(data);
      } else if (typeof flowStore.setRecipeResponse === "function") {
        flowStore.setRecipeResponse(data);
      }
      navigate("/recipe/confirm", { state: { recipeData: data } });
    } catch (error: any) {
      console.error("AI 레시피 생성 실패:", error);

      const errorCode = error?.response?.data?.code;
      if (errorCode === "RECIPE_INGREDIENTS_REQUIRED") {
        alert(
          "레시피 생성을 위해 하나 이상의 재료가 반드시 선택되어야 합니다.",
        );
      } else if (errorCode === "AI_RATE_LIMIT_EXCEEDED") {
        alert("요청 제한 횟수를 초과했습니다. 잠시 후 다시 시도해 주세요.");
      } else if (errorCode === "INGREDIENT_NOT_FOUND") {
        alert("유저가 보유한 재료를 찾을 수 없습니다.");
      } else {
        alert(
          "레시피를 구상하는 중에 오류가 발생했습니다. 다시 시도해 주세요.",
        );
      }
    } finally {
      setIsGenerating(false);
    }
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

      <div className="mt-13">
        <div className="flex items-center px-4">
          <Search />
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
        <div className="fixed bottom-[34px] left-1/2 flex w-full max-w-[450px] -translate-x-1/2 items-center px-4">
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
