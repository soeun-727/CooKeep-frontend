import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { generateRandomAiRecipe } from "@/api/aiRecipe";

import cookChar from "@/assets/recipe/main/cook_char.svg";
import LightBulbIcon from "@/assets/recipe/main/lightbulb.svg?react";
import randomIcon from "@/assets/recipe/main/randomIcon.svg";
import selectIcon from "@/assets/recipe/main/selectIcon.svg";

import RecipeGenerateButton from "@/components/recipe/main/RecipeGenerateButton";
import RecipeHeader from "@/components/recipe/main/RecipeHeader";

export default function RecipeIntroPage() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    useIngredientStore.getState().clearSelection();
    useRecipeFlowStore.getState().reset();
  }, []);

  const handleRandomRecommend = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      const data = await generateRandomAiRecipe();
      const flowStore = useRecipeFlowStore.getState() as any;
      if (typeof flowStore.setRecipeData === "function") {
        flowStore.setRecipeData(data);
      } else if (typeof flowStore.setRecipe === "function") {
        flowStore.setRecipe(data);
      } else if (typeof flowStore.setRecipeResponse === "function") {
        flowStore.setRecipeResponse(data);
      }
      navigate("/recipe/flow", { state: { recipeData: data } });
    } catch (error: any) {
      console.error("랜덤 레시피 생성 실패:", error);

      const errorCode = error?.response?.data?.code;
      if (errorCode === "RANDOM_RECIPE_INGREDIENT_NOT_ENOUGH") {
        alert(
          "랜덤 레시피 생성을 위해 냉장고에 재료가 최소 3개 이상 필요합니다.",
        );
      } else if (errorCode === "USER_RATE_LIMIT_EXCEEDED") {
        alert(
          "1분 내 생성 요청 횟수(3회)를 초과하였습니다. 잠시 후 다시 시도해 주세요.",
        );
      } else {
        alert("레시피 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      {/* 헤더 */}
      <RecipeHeader transparent />
      {/* 콘텐츠 */}
      <div className="mt-[70px] flex w-full flex-col items-start gap-1 px-1">
        <img src={cookChar} alt="요리 캐릭터" className="w-25" />
        <h1 className="text-gray-80 typo-h2 py-2 text-start">
          오늘은 어떻게 요리해볼까요?
        </h1>
      </div>

      {/* 버튼 */}
      <div className="flex w-full flex-col gap-2">
        <RecipeGenerateButton
          image={selectIcon}
          title="재료 직접 선택"
          description={"내가 고른 재료로\n레시피를 추천받아요"}
          onClick={() => navigate("/recipe/select")}
          disabled={isGenerating}
        />
        {/* TODO: 랜덤 추천 API 연동 */}
        <RecipeGenerateButton
          image={randomIcon}
          title="랜덤 추천"
          description={"오늘 뭐 먹지?\n가볍게 추천받아요"}
          onClick={handleRandomRecommend}
          disabled={isGenerating}
        />
      </div>

      {/* 팁 */}
      <div className="rounded-M bg-gray-exception mb-5 flex w-full gap-3 p-3">
        <LightBulbIcon className="h-9 w-9" />
        <div className="flex w-full flex-col text-start text-gray-50">
          <span className="typo-caption-strong">쿠킵이 생성하는 레시피는</span>
          <span className="typo-caption">
            보유 재료와 취향을 반영해 추천해 드려요
          </span>
        </div>
      </div>
    </div>
  );
}
