import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import cookChar from "@/assets/recipe/main/cook_char.svg";
import Button from "@/components/ui/Button";
import RecipeHeader from "@/components/recipe/main/RecipeHeader";
import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

export default function RecipeIntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    useIngredientStore.getState().clearSelection();
    useRecipeFlowStore.getState().reset();
  }, []);

  return (
    <div className="relative h-[calc(100vh-90px)] flex justify-center bg-background">
      {/* 헤더 */}
      <RecipeHeader transparent />

      {/* 배경 blur */}
      <div
        className="
          absolute
          top-[72px]
          left-1/2
          -translate-x-1/2
          w-[450px]
          h-[450px]
          rounded-full 
         bg-green-deep/15 blur-[100px]
          pointer-events-none
          z-0
        "
      />

      {/* 콘텐츠 */}
      <div className="z-10 mt-[203.62px] flex w-[361px] flex-col items-center gap-[28px]">
        <img
          src={cookChar}
          alt="요리 캐릭터"
          className="h-[116.646px] w-[162.5px]"
        />

        <div className="flex flex-col items-center h-[144px] gap-[28px] self-stretch">
          <h1 className="text-center text-[28px] font-semibold leading-[36px] text-gray-80">
            지금 있는 재료로
            <br />
            요리해볼까요?
          </h1>

          <div className="h-[44px] w-[249px]">
            <Button
              size="S"
              variant="green"
              onClick={() => navigate("/recipe/select")}
              className="h-full w-full"
            >
              요리할 재료 선택하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
