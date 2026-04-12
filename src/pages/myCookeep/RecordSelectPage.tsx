import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/recipe/search.svg";
import liked from "../../assets/recipe/liked.svg";
import unliked from "../../assets/recipe/unliked.svg";
import BackHeader from "../../components/ui/BackHeader";
import Button from "../../components/ui/Button";
// import { useRecipeStore, type RecipeItem } from "../../stores/useRecipeStore";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import { useDailyAiRecipeStore } from "../../stores/useDailyAiRecipeStore";
import type { DailyAiRecipe } from "../../api/dailyAiRecipe";

export default function RecordSelectPage() {
  const navigate = useNavigate();

  // 임시: 기존 레시피 store 재사용
  const { recipes, fetchRecipes } = useDailyAiRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, []);

  // 기록용 store
  const { selectedRecipeId, setSelectedRecipeId } = useCookeepRecordStore();

  const [searchTerm, setSearchTerm] = useState("");

  const { editingRecordId } = useCookeepRecordStore();

  // 검색 필터
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [recipes, searchTerm]);

  const likedRecipes = filteredRecipes.filter((r) => r.isPinned);
  const normalRecipes = filteredRecipes.filter((r) => !r.isPinned);

  const renderRecipeItem = (recipe: DailyAiRecipe) => {
    const isSelected = selectedRecipeId === recipe.aiRecipeId;

    return (
      <div
        key={recipe.aiRecipeId}
        onClick={() => setSelectedRecipeId(recipe.aiRecipeId)}
        className={`
        flex justify-between items-center
        w-full
        px-3 py-2
        rounded-[6px]
        cursor-pointer
        transition
        ${isSelected ? "bg-[#EBEBEB]" : ""}
      `}
      >
        {/* 왼쪽: 좋아요 + 제목 */}
        <div className="flex items-center gap-3">
          <img
            src={recipe.isPinned ? liked : unliked}
            alt="like"
            className="w-[18px] h-[15px] shrink-0"
          />
          <span
            className={`
    flex-1
    truncate
    typo-body2
    ${isSelected ? "text-[#1FC16F]" : "text-[#202020]"}
  `}
          >
            {recipe.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      {/* 헤더 */}
      <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />
      {/* 검색 */}
      <div className="w-full max-w-[390px] px-4 mt-1 pt-[54px]">
        <div
          className="
      flex items-center justify-center
      w-full
      rounded-[6px]
      bg-[#EBEDF1]
      shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
    "
        >
          <div className="flex items-center gap-2 w-full p-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="레시피를 검색하세요"
              className="
          flex-1
          h-[24px]
          bg-transparent
          outline-none
          typo-body2
          text-[#7D7D7D]
        "
            />
            <img src={searchIcon} alt="검색" className="w-6 h-6 shrink-0" />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-7">
        <div className="mx-auto max-w-[361px] flex justify-center">
          <div className="h-[28px] px-2 rounded-[6px] bg-[#202020] flex items-center">
            <span className="typo-caption text-white">
              내가 요리한 레시피들이에요
            </span>
          </div>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar mt-4">
        <div className="w-full max-w-[390px] px-4 mx-auto">
          <div className="flex flex-col gap-6 pb-[140px]">
            <div className="flex flex-col ">
              {likedRecipes.map(renderRecipeItem)}
            </div>

            <div className="flex flex-col">
              {normalRecipes.map(renderRecipeItem)}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-[34px] left-0 right-0">
        <div className="w-full max-w-[390px] px-4 mx-auto">
          <Button
            size="L"
            disabled={!selectedRecipeId}
            onClick={() => {
              const recipe = recipes.find(
                (r) => r.aiRecipeId === selectedRecipeId,
              );
              if (!recipe) return;

              //  수정 모드 → 여기서만 레시피 교체
              if (editingRecordId) {
                setSelectedRecipeId(recipe.aiRecipeId);
              }

              // 무조건 write로 이동
              navigate("/mycookeep/record/write");
            }}
          >
            선택 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
