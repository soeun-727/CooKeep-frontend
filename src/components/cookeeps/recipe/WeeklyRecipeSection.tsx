import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeRankItem } from "@/api/cookeeps";

import ArrowRightIcon from "@/assets/signup/arrowright.svg?react";
import RecipeListItem from "./RecipeListItem";

interface WeeklyRecipeSectionProps {
  topRecipes: RecipeRankItem[];
}

function WeeklyRecipeSection({ topRecipes }: WeeklyRecipeSectionProps) {
  const navigate = useNavigate();

  const recipesToShow = topRecipes.slice(0, 3);

  const isEmpty = topRecipes.length === 0;

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      {/* 제목 + 전체보기 Header */}
      <div className="flex items-center justify-between self-stretch px-1">
        <h2 className="typo-l-strong text-gray-80 flex-1">
          쿠킵이들의 레시피 둘러보기
        </h2>

        <button
          onClick={() => navigate("/cookeeps/all")}
          className="typo-label flex items-center justify-end text-gray-50"
        >
          전체보기
          <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </button>
      </div>

      {/* 레시피 박스 */}
      {isEmpty ? (
        <div className="border-gray-10 bg-gray-0 flex flex-col items-center justify-center gap-3 self-stretch rounded-2xl border px-3 py-4">
          <p className="typo-m-strong text-gray-30 text-center">
            아직 등록된 레시피가 없어요
            <br />
            이번 주 첫 레시피를 등록해보세요!
          </p>
        </div>
      ) : (
        <div className="border-gray-10 bg-gray-0 flex flex-col items-start gap-4 self-stretch rounded-2xl border px-3 py-4">
          {recipesToShow.map((recipe, index) => (
            <RecipeListItem
              key={recipe.dailyRecipeId}
              rank={index + 1}
              title={recipe.title}
              subtitle={recipe.nickname}
              image={recipe.recipeImageUrl ?? undefined}
              badge={{ type: "like", likes: recipe.likeCount ?? 0 }}
              onSelect={() => navigate(`/cookeeps/${recipe.dailyRecipeId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(WeeklyRecipeSection);
