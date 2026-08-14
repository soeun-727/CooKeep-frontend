import { useEffect, useRef, useState } from "react";

import Triangle from "@/assets/guest/triangle.svg?react";

import RecipeActionButtons from "@/components/recipe/main/result/RecipeActionButtons";
import RecipeIngredientSection from "@/components/recipe/main/result/RecipeIngredientSection";
import RecipePagination from "@/components/recipe/main/result/RecipePagination";
import RecipeStepSection from "@/components/recipe/main/result/RecipeStepSection";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "@/components/recipe/main/result/RecipeYoutubeCard";
import OnboardingRewardModal from "@/components/ui/OnboardingRewardModal";

import {
  GUEST_RECIPE_CATEGORY,
  GUEST_RECIPE_DATA,
  GUEST_RECIPE_STEPS,
} from "@/constants/guestIngredients";

interface GuestRecipeResultProps {
  onNext: () => void;
  isDimmed?: boolean;
  setIsDimmed?: (dimmed: boolean) => void;
}

export default function GuestRecipe({
  onNext,
  isDimmed = false,
  setIsDimmed,
}: GuestRecipeResultProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsDimmed?.(false);
  }, [setIsDimmed]);

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  const { title, ingredients, youtube_videos, youtube_search_queries } =
    GUEST_RECIPE_DATA;

  return (
    <div
      className="relative flex w-full flex-col px-4"
      onClick={() => {
        if (!isDimmed) setIsDimmed?.(true);
      }}
    >
      <div className="mt-3 flex w-full flex-col items-center gap-3">
        <RecipePagination currentPage={1} totalPage={1} />

        <div
          ref={scrollRef}
          className="no-scrollbar flex w-full flex-1 flex-col gap-9 overflow-y-auto"
        >
          <div className="mx-auto flex w-full flex-col">
            {/* 레시피 제목 영역 */}
            <RecipeTitle
              name={title}
              category={GUEST_RECIPE_CATEGORY}
              usedItems={ingredients.user_ingredients.length}
            />

            <div className="flex flex-col gap-3">
              {/* 재료 리스트 영역 */}
              <RecipeIngredientSection
                selectedIngredients={ingredients.user_ingredients}
                requiredIngredients={ingredients.additional_ingredients}
                substitutions={ingredients.optional_ingredients}
              />

              {/* 조리 순서 영역 */}
              <RecipeStepSection steps={GUEST_RECIPE_STEPS} difficulty="EASY" />

              {/* 유튜브 연관 카드 영역 */}
              <RecipeYoutubeCard
                videos={youtube_videos}
                tags={youtube_search_queries}
              />

              {/* 하단 안내 텍스트 */}
              <div className="mt-2 flex flex-col items-center gap-[2px]">
                <div className="typo-caption w-full text-center text-gray-50">
                  AI가 제공하는 정보에는 실수가 있을 수 있습니다
                  <br />
                  관련 정보를 확인 후 활용해주세요
                </div>
              </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="relative mt-8 flex w-full max-w-[450px] flex-col items-center">
              {/* 말풍선: absolute 적용으로 레이아웃 흐름에서 제외 */}
              {isDimmed && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-[120] mb-2 flex -translate-x-1/2 flex-col items-center">
                  <div className="rounded-S bg-gray-0/90 text-green-deep typo-label px-3 py-2 text-center whitespace-nowrap shadow-sm">
                    레시피를 채택하면
                    <br />
                    재료가 자동으로 소비돼요!
                  </div>
                  <div className="-mt-1 px-4">
                    <Triangle className="text-gray-0/90 w-4" />
                  </div>
                </div>
              )}

              <div
                className={`w-full transition-all ${
                  isDimmed
                    ? "pointer-events-auto z-[110]"
                    : "pointer-events-none z-20"
                }`}
                onClick={e => {
                  if (isDimmed) e.stopPropagation();
                }}
              >
                <RecipeActionButtons
                  retryCount={1}
                  onRetry={handleActionClick}
                  onCook={handleActionClick}
                  isGuest={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 온보딩 리워드 모달 */}
      <OnboardingRewardModal
        isOpen={isModalOpen}
        onClose={onNext}
        type={"INGREDIENT"}
      />
    </div>
  );
}
