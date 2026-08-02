import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import RecipeHeader from "@/components/recipe/main/RecipeHeader";
import RecipeActionButtons from "@/components/recipe/main/result/RecipeActionButtons";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "@/components/recipe/main/result/RecipeYoutubeCard";
import RecipePagination from "@/components/recipe/main/result/RecipePagination";
import RecipeIngredientSection from "@/components/recipe/main/result/RecipeIngredientSection";
import RecipeStepSection from "@/components/recipe/main/result/RecipeStepSection";

import { DIFFICULTY_OPTIONS } from "@/constants/recipeDifficulty";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function RecipeResultPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sessionId } = useParams();

  const {
    recipeHistory,
    difficulty,
    retryCount,
    generateRecipe,
    isLoading,
    fetchSessionDetail,
  } = useRecipeFlowStore();

  const [currentPage, setCurrentPage] = useState(1);

  const handleRetry = async () => {
    if (isLoading) return;
    if (retryCount >= 5) return;

    try {
      await generateRecipe();

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

  const isHistoryMode = !!sessionId;

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetail(Number(sessionId));
    }
  }, [sessionId]);

  useEffect(() => {
    if (recipeHistory.length > 0) {
      setCurrentPage(recipeHistory.length);
    }
  }, [recipeHistory.length]);

  if (isLoading || (sessionId && !recipeHistory.length)) {
    return <LoadingScreen />;
  }

  if (!recipeHistory.length) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  const totalPage = recipeHistory.length;
  const currentData = recipeHistory[currentPage - 1];

  return (
    <div className="flex w-full flex-col gap-3 px-4">
      <RecipeHeader title="오늘의 레시피" />

      <div className="flex w-full flex-col items-center gap-3">
        {/* 🚀 onPageChange 콜백 전달해서 페이지 전환 이벤트 연결 */}
        <RecipePagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={newPage => setCurrentPage(newPage)}
        />

        <div
          ref={scrollRef}
          className="no-scrollbar flex flex-1 flex-col gap-9 overflow-y-auto"
        >
          {currentData &&
            (() => {
              const recipe = currentData.recipe;
              if (!recipe || !recipe.ingredients) return null;

              const userIngredients = recipe.ingredients.user_ingredients || [];
              const additionalIngredients =
                recipe.ingredients.additional_ingredients || [];
              const optionalIngredients =
                recipe.ingredients.optional_ingredients || [];

              const rawSteps = recipe.steps || [];
              const steps = rawSteps.map((step: any, idx: number) => ({
                order: idx + 1,
                description:
                  typeof step === "string" ? step : step.content || "",
              }));

              const rawFeature = difficulty || currentData.feature || "ANY";
              const activeFeature = String(rawFeature).trim().toUpperCase();

              const matchedOption = DIFFICULTY_OPTIONS.find(
                opt => String(opt.key).trim().toUpperCase() === activeFeature,
              );

              const categoryKorean =
                matchedOption?.desc ||
                (activeFeature === "ANY" || activeFeature === "RANDOM"
                  ? "랜덤"
                  : "추천 요리");

              return (
                <div className="mx-auto flex w-full flex-col">
                  <RecipeTitle
                    name={recipe.title}
                    category={categoryKorean}
                    usedItems={userIngredients.length}
                  />

                  <div className="flex flex-col gap-3">
                    <RecipeIngredientSection
                      selectedIngredients={userIngredients}
                      requiredIngredients={additionalIngredients}
                      substitutions={optionalIngredients}
                    />

                    <RecipeStepSection
                      steps={steps}
                      difficulty={difficulty || "NORMAL"}
                    />

                    <RecipeYoutubeCard
                      videos={currentData.youtubeReferences || []}
                      tags={recipe.youtube_search_queries || []}
                    />

                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="typo-caption w-full text-center text-gray-50">
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
                  </div>

                  <div className="mt-6 mb-7 w-full max-w-[450px]">
                    <RecipeActionButtons
                      retryCount={retryCount}
                      onRetry={handleRetry}
                      showRetryButton={!isHistoryMode}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
