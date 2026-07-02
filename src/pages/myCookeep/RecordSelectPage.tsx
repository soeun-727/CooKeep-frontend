import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { DailyAiRecipe } from "@/api/dailyAiRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";
import { useDailyAiRecipeStore } from "@/stores/useDailyAiRecipeStore";

import searchIcon from "@/assets/recipe/search.svg";
import HeartIcon from "@/assets/recipe/heart.svg?react";

import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

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
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [recipes, searchTerm]);

  const likedRecipes = filteredRecipes.filter(r => r.isPinned);
  const normalRecipes = filteredRecipes.filter(r => !r.isPinned);

  const renderRecipeItem = (recipe: DailyAiRecipe) => {
    const isSelected = selectedRecipeId === recipe.aiRecipeId;

    return (
      <div
        key={recipe.aiRecipeId}
        onClick={() => setSelectedRecipeId(recipe.aiRecipeId)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-[6px] px-3 py-2 transition ${isSelected ? "bg-gray-10" : ""} `}
      >
        {/* 왼쪽: 좋아요 + 제목 */}
        <div className="flex items-center gap-3">
          <HeartIcon
            className={`stroke-gray-10 h-[15px] w-[18px] shrink-0 fill-current stroke-[2px] ${recipe.isPinned ? "text-gray-30" : "text-transparent"}`}
          />
          <span
            className={`typo-body2 flex-1 truncate ${isSelected ? "text-green-deep" : "text-gray-80"} `}
          >
            {recipe.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      {/* 헤더 */}
      <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />
      {/* 검색 */}
      <div className="mt-1 w-full max-w-[390px] px-4 pt-[54px]">
        <div className="bg-searchbar flex w-full items-center justify-center rounded-[6px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          <div className="flex w-full items-center gap-2 p-3">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="레시피를 검색하세요"
              className="typo-body2 h-[24px] flex-1 bg-transparent text-gray-50 outline-none"
            />
            <img src={searchIcon} alt="검색" className="h-6 w-6 shrink-0" />
          </div>
        </div>
      </div>

      <div className="mt-7 w-full px-4">
        <div className="mx-auto flex max-w-[361px] justify-center">
          <div className="bg-gray-80 flex h-[28px] items-center rounded-[6px] px-2">
            <span className="typo-caption text-gray-0">
              내가 요리한 레시피들이에요
            </span>
          </div>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="no-scrollbar mt-4 w-full flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[390px] px-4">
          <div className="flex flex-col gap-6 pb-[140px]">
            <div className="flex flex-col">
              {likedRecipes.map(renderRecipeItem)}
            </div>

            <div className="flex flex-col">
              {normalRecipes.map(renderRecipeItem)}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed right-0 bottom-[34px] left-0">
        <div className="mx-auto w-full max-w-[390px] px-4">
          <Button
            size="L"
            disabled={!selectedRecipeId}
            onClick={() => {
              const recipe = recipes.find(
                r => r.aiRecipeId === selectedRecipeId,
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
