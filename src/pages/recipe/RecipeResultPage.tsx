import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import RecipeHeader from "@/components/recipe/main/RecipeHeader";
import RecipeActionButtons from "@/components/recipe/main/result/RecipeActionButtons";
import RecipeContentSection from "@/components/recipe/main/result/RecipeContentSection";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "@/components/recipe/main/result/RecipeYoutubeCard";

export default function RecipeResultPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { recipeHistory, difficulty, retryCount, generateRecipe, isLoading } =
    useRecipeFlowStore();

  const handleRetry = async () => {
    if (isLoading) return;
    if (retryCount >= 5) return;

    try {
      await generateRecipe();

      // 생성이 완료된 후 스크롤 이동
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error("레시피 채택 실패:", error);
      alert("레시피 재 생성 중 오류가 발생했습니다.");
    }
  };

  const { sessionId } = useParams();
  // const location = useLocation();
  const { fetchSessionDetail } = useRecipeFlowStore();

  // URL에 sessionId가 포함되어 들어왔다면 '상세보기 모드'로 간주
  // (만약 생성 직후에도 URL에 sessionId가 붙는 구조라면, location.state 등을 활용해 구분 가능)
  const isHistoryMode = !!sessionId;

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetail(Number(sessionId));
    }
  }, [sessionId]);

  if (!recipeHistory.length) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50">
      <RecipeHeader title="오늘의 레시피" />

      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 flex-col gap-9 overflow-y-auto px-4 pt-[75px]"
      >
        {recipeHistory.map((data, index) => {
          const recipe = data.recipe;
          if (!recipe || !recipe.ingredients) return null;

          const isLastRecipe = index === recipeHistory.length - 1;

          // 안전하게 데이터 추출
          const userIngredients = recipe.ingredients.user_ingredients || [];
          const additionalIngredients =
            recipe.ingredients.additional_ingredients || [];
          const optionalIngredients =
            recipe.ingredients.optional_ingredients || [];

          return (
            <div
              key={index}
              className="mx-auto flex w-full max-w-[361px] flex-col gap-2"
            >
              <RecipeTitle name={recipe.title} />

              <RecipeContentSection
                selectedIngredients={userIngredients}
                requiredIngredients={additionalIngredients}
                substitutions={optionalIngredients}
                steps={recipe.steps.map((step, idx) => ({
                  order: idx + 1,
                  description: step,
                }))}
                difficulty={difficulty || "NORMAL"}
              />

              <RecipeYoutubeCard
                videos={data.youtubeReferences || []}
                tags={recipe.youtube_search_queries || []}
              />

              {isLastRecipe && (
                <div className="mt-[10px] flex flex-col items-center gap-[2px] self-stretch">
                  <div className="font-pretendard w-[361px] text-center text-[11px] leading-[14px] text-[#7D7D7D]">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </div>

                  {isLoading && (
                    <div className="flex h-[28.8px] w-[28.8px] items-center justify-center gap-[3.6px]">
                      <div className="animate-dot h-[4.8px] w-[4.8px] rounded-full" />
                      <div className="animate-dot h-[4.8px] w-[4.8px] rounded-full delay-200" />
                      <div className="animate-dot h-[4.8px] w-[4.8px] rounded-full delay-400" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* 버튼 영역 */}
        <div className="mx-auto mb-7 w-full max-w-[450px] p-4">
          <RecipeActionButtons
            retryCount={retryCount}
            onRetry={handleRetry}
            showRetryButton={!isHistoryMode} // 히스토리 모드일 때는 false
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
