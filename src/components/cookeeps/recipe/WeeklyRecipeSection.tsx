import RecipeRankCard from "./RecipeRankCard";
import RecipeFilterButtons from "./RecipeFilterButtons";
import { RecipeRankItem } from "../../../api/cookeeps";
import tempImage from "../../../assets/cookeeps/main/temp_recipe_cookeeps.svg";
import { memo } from "react";
interface WeeklyRecipeSectionProps {
  topRecipes: RecipeRankItem[];
}

function WeeklyRecipeSection({ topRecipes }: WeeklyRecipeSectionProps) {
  const fallbackRecipe = {
    dailyRecipeId: 0,
    rank: 0,
    title: "레시피를 등록해주세요",
    recipeImageUrl: tempImage,
    likeCount: 0,
  };

  const filledRecipes = Array.from({ length: 3 }, (_, i) => {
    const recipe = topRecipes[i];

    return (
      recipe ?? {
        ...fallbackRecipe,
        rank: i + 1,
      }
    );
  });

  const isEmpty = topRecipes.length === 0;

  return (
    <div className="flex flex-col items-center w-full min-h-[259px] max-w-md mx-auto bg-white p-4 gap-4 rounded-lg shadow-md">
      {/* 제목 */}
      <h2 className="text-center font-semibold text-[18px] leading-[26px]">
        <span className="text-[#1FC16F]">이번 주</span>{" "}
        <span className="text-gray-800">쿠킵이들이 만든 레시피</span>
      </h2>

      {/* 버튼 + 리스트 */}
      <div className="relative flex flex-col w-full gap-2">
        <RecipeFilterButtons />

        <div className="flex flex-col gap-1 w-full">
          {filledRecipes.map((recipe, idx) => (
            <RecipeRankCard
              key={`${recipe.dailyRecipeId}-${idx}`}
              id={String(recipe.dailyRecipeId)}
              rank={recipe.rank}
              title={recipe.title}
              image={recipe.recipeImageUrl || tempImage}
              likes={recipe.likeCount}
            />
          ))}
        </div>

        {isEmpty && (
          <div className="absolute inset-0 flex justify-center items-center rounded-md bg-white/80">
            <p className="text-center text-[#202020] text-[16px] font-semibold leading-[24px]">
              아직 등록된 레시피가 없어요
              <br />
              이번 주 첫 레시피를 등록해보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(WeeklyRecipeSection);
