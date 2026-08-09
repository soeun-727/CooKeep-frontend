import { useRef, useState } from "react";

import notice from "@/assets/guest/recipe_notice.svg";

import RecipeIngredientSection from "@/components/recipe/main/result/RecipeIngredientSection";
import RecipeStepSection from "@/components/recipe/main/result/RecipeStepSection";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "@/components/recipe/main/result/RecipeYoutubeCard";
import OnboardingRewardModal from "@/components/ui/OnboardingRewardModal";

interface GuestRecipeResultProps {
  onNext: () => void;
}

export default function GuestRecipe({ onNext }: GuestRecipeResultProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDimmed, setIsDimmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recipeData = {
    title: "딸기 바나나 베이글 프렌치 토스트",
    ingredients: {
      user_ingredients: [
        { name: "우유", quantity: 1, unit: "개" },
        { name: "딸기", quantity: 1, unit: "팩" },
        { name: "베이글", quantity: 1, unit: "개" },
        { name: "바나나", quantity: 1, unit: "개" },
      ],
      additional_ingredients: [
        { name: "달걀", quantity: 2, unit: "개" },
        { name: "설탕", quantity: 3, unit: "티스푼" },
        { name: "버터", quantity: 1, unit: "개" },
        { name: "슈가파우더", quantity: 1, unit: "티스푼" },
        { name: "시럽", quantity: 2, unit: "티스푼" },
      ],
      optional_ingredients: [
        {
          name: "딸기",
          quantity: 1,
          unit: "팩",
          description: "이 재료는 생략 가능합니다",
        },
        { name: "바나나", quantity: 1, unit: "개" },
        { name: "슈가파우더", quantity: 1, unit: "티스푼" },
        { name: "시럽", quantity: 2, unit: "티스푼" },
      ],
    },
    steps: [
      "볼에 달걀, 우유, 설탕, 소금을 섞어 준비해주세요",
      "빵을 달걀물에 충분히 적신 후, 버터를 두른 팬에 약불로 노릇하게 구워주세요",
      "구운 베이글 위에 슬라이스한 딸기와 바나나를 올리고, 시럽이나 슈가파우더를 뿌려 완성해주세요",
    ],
    youtube_search_queries: [
      "프렌치토스트",
      "딸기바나나샌드위치",
      "베이글토스트",
    ],
  };

  const { title, ingredients, steps, youtube_search_queries } = recipeData;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const formattedSteps = steps.map((step, idx) => ({
    order: idx + 1,
    description: step,
  }));

  return (
    <div
      className="flex w-full flex-col px-4"
      onClick={() => setIsDimmed(true)}
    >
      {isDimmed && (
        <div className="bg-black-overlay animate-fadeIn fixed inset-0 left-1/2 z-10 w-full max-w-[450px] -translate-x-1/2 transition-opacity" />
      )}

      <div className="mt-13 flex w-full flex-col items-center gap-3">
        <div
          ref={scrollRef}
          className="no-scrollbar flex flex-1 flex-col gap-9 overflow-y-auto"
        >
          <div className="mx-auto flex w-full flex-col">
            <RecipeTitle
              name={title}
              category="간식/디저트"
              usedItems={ingredients.user_ingredients.length}
            />

            <div className="flex flex-col gap-3">
              <RecipeIngredientSection
                selectedIngredients={ingredients.user_ingredients}
                requiredIngredients={ingredients.additional_ingredients}
                substitutions={ingredients.optional_ingredients}
              />

              <RecipeStepSection steps={formattedSteps} difficulty="EASY" />

              <RecipeYoutubeCard videos={[]} tags={youtube_search_queries} />

              <div className="flex flex-col items-center gap-[2px]">
                <div className="typo-caption w-full text-center text-gray-50">
                  AI가 제공하는 정보에는 실수가 있을 수 있습니다
                  <br />
                  관련 정보를 확인 후 활용해주세요
                </div>
              </div>
            </div>

            <div className="relative z-20 mx-auto mt-6 mb-7 flex w-full max-w-[450px] items-center justify-center p-4">
              {isDimmed && (
                <object
                  data={notice}
                  className="absolute bottom-15 left-1/2 w-[178px] -translate-x-1/2"
                />
              )}
              <button
                onClick={e => {
                  if (!isDimmed) {
                    setIsDimmed(true);
                  } else {
                    handleButtonClick(e);
                  }
                }}
                className="typo-button text-gray-0 bg-green h-[38px] w-full rounded-[10px]"
              >
                이 레시피대로 요리할래요
              </button>
            </div>
          </div>
        </div>
      </div>

      <OnboardingRewardModal
        isOpen={isModalOpen}
        onClose={onNext}
        type={"INGREDIENT"}
      />
    </div>
  );
}
