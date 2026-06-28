import RecipeRankCard from "./RecipeRankCard";
import RecipeFilterButtons from "./RecipeFilterButtons";
import { RecipeRankItem } from "@/api/cookeeps";
import tempImage from "@/assets/cookeeps/main/temp_recipe_cookeeps.svg";
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
    <div className="mx-auto flex min-h-[259px] w-full max-w-md flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md">
      {/* 제목 */}
      <h2 className="text-center text-[18px] leading-[26px] font-semibold">
        <span className="text-[#1FC16F]">이번 주</span>{" "}
        <span className="text-gray-800">쿠킵이들이 만든 레시피</span>
      </h2>

      {/* 버튼 + 리스트 */}
      <div className="relative flex w-full flex-col gap-2">
        <RecipeFilterButtons />

        <div className="flex w-full flex-col gap-1">
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
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-white/80">
            <p className="text-center text-[16px] leading-[24px] font-semibold text-[#202020]">
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
