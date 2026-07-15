import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import cookChar from "@/assets/recipe/main/cook_char.svg";
import LightBulbIcon from "@/assets/recipe/main/lightbulb.svg?react";
import randomIcon from "@/assets/recipe/main/randomIcon.svg";
import selectIcon from "@/assets/recipe/main/selectIcon.svg";

import RecipeGenerateButton from "@/components/recipe/main/RecipeGenerateButton";
import RecipeHeader from "@/components/recipe/main/RecipeHeader";

export default function RecipeIntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    useIngredientStore.getState().clearSelection();
    useRecipeFlowStore.getState().reset();
  }, []);

  const handleRandomRecommend = () => {
    navigate("/recipe/loading", { state: { isRandom: true } });
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <RecipeHeader transparent />
      <div className="mt-[70px] flex w-full flex-col items-start gap-1 px-1">
        <img src={cookChar} alt="요리 캐릭터" className="w-25" />
        <h1 className="text-gray-80 typo-h2 py-2 text-start">
          오늘은 어떻게 요리해볼까요?
        </h1>
      </div>

      <div className="flex w-full flex-col gap-2">
        <RecipeGenerateButton
          image={selectIcon}
          title="재료 직접 선택"
          description={"내가 고른 재료로\n레시피를 추천받아요"}
          onClick={() => navigate("/recipe/select")}
        />
        <RecipeGenerateButton
          image={randomIcon}
          title="랜덤 추천"
          description={"오늘 뭐 먹지?\n가볍게 추천받아요"}
          onClick={handleRandomRecommend}
        />
      </div>

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
