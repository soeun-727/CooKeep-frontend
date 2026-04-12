import { useRef, useState } from "react";
import RecipeTitle from "../../recipe/main/result/RecipeTitle";
import RecipeContentSection from "../../recipe/main/result/RecipeContentSection";
import RecipeYoutubeCard from "../../recipe/main/result/RecipeYoutubeCard";
import notice from "../../../assets/guest/recipe_notice.svg";
import DoublecheckModal from "../../ui/DoublecheckModal";

interface GuestRecipeResultProps {
  onNext: () => void;
}

export default function GuestRecipe({ onNext }: GuestRecipeResultProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
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
          note: "이 재료는 생략 가능합니다",
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
  const [isDimmed, setIsDimmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div
      className="flex flex-col h-screen bg-gray-50 overflow-hidden items-center"
      onClick={() => setIsDimmed(true)}
    >
      {isDimmed && (
        <div className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}
      <div className="typo-body">오늘의 레시피</div>
      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-9 px-4 pt-[21px] pb-10"
      >
        <div className="flex flex-col gap-2 w-full max-w-[361px] mx-auto">
          {/* 레시피 제목 */}
          <RecipeTitle name={title} />

          {/* 레시피 상세 내용 (재료, 순서) */}
          <RecipeContentSection
            selectedIngredients={ingredients.user_ingredients}
            requiredIngredients={ingredients.additional_ingredients}
            substitutions={ingredients.optional_ingredients}
            steps={steps.map((step, idx) => ({
              order: idx + 1,
              description: step,
            }))}
            difficulty="EASY"
          />

          {/* 유튜브 카드 */}
          <RecipeYoutubeCard videos={[]} tags={youtube_search_queries} />

          {/* AI 주의사항 문구 */}
          <div className="flex flex-col items-center gap-[2px] self-stretch mt-[10px]">
            <div className="w-[361px] text-center text-[11px] leading-[14px] text-[#7D7D7D] font-pretendard">
              AI가 제공하는 정보에는 실수가 있을 수 있습니다
              <br />
              관련 정보를 확인 후 활용해주세요
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="relative flex p-4 w-full max-w-[450px] mx-auto mb-10 z-20 items-center justify-center">
          {isDimmed && (
            <img
              src={notice}
              alt="click notice"
              /* left-1/2와 -translate-x-1/2를 추가하여 가로 중앙 정렬 */
              className="absolute w-[178px] bottom-15 left-1/2 -translate-x-1/2"
            />
          )}
          <button
            onClick={handleButtonClick}
            className="w-full rounded-[10px] h-[38px] typo-button text-white bg-[#32E389] active:scale-95 transition-transform"
          >
            이 레시피대로 요리할래요
          </button>
        </div>
      </div>

      <DoublecheckModal
        variant="singular"
        isOpen={isModalOpen}
        onClose={onNext}
        title="🍪 쿠키 1개"
        description={"첫 요리 완료!\n쿠키 선물이 도착했어요"}
        onConfirm={onNext}
        confirmText="확인"
      />
    </div>
  );
}
