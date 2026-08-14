import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { DailyAiRecipe } from "@/api/dailyAiRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";
import { useDailyAiRecipeStore } from "@/stores/useDailyAiRecipeStore";

import HeartIcon from "@/assets/icons/heart.svg?react";
import { SearchIcon } from "@/assets/index";

import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

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

  const pinned = filteredRecipes.filter(r => r.isPinned);
  const sessions = filteredRecipes.filter(r => !r.isPinned);

  const renderRecipeItem = (recipe: DailyAiRecipe, isPinned: boolean) => {
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
            className={`stroke-gray-10 h-[15px] w-[18px] shrink-0 fill-current stroke-[2px] ${isPinned ? "text-gray-30" : "text-transparent"}`}
          />
          <span
            className={`typo-l flex-1 truncate ${isSelected ? "text-green-deep" : "text-gray-80"} `}
          >
            {recipe.title}
          </span>
        </div>
      </div>
    );
  };

  const renderRecipeList = (list: DailyAiRecipe[], isPinned: boolean) => (
    <div className="flex flex-col">
      {list.map(recipe => renderRecipeItem(recipe, isPinned))}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4">
      <div className="flex w-full flex-col gap-3">
        {/* 헤더 */}
        <BackHeader title="레시피 선택" />
        {/* 검색 */}
        <TextField
          value={searchTerm}
          placeholder="레시피를 검색하세요"
          onChange={value => setSearchTerm(value)}
          rightIcon={<SearchIcon className="h-6 w-6 text-gray-50" />}
        />
      </div>

      {/* 리스트 영역 */}
      <div className="flex w-full flex-col justify-start">
        <p className="typo-l-strong px-1">찜한 레시피</p>
        {pinned.length > 0 && renderRecipeList(pinned, true)}
        {pinned.length > 0 && sessions.length > 0}
        <p className="typo-l-strong mt-6 px-1">다른 레시피</p>
        {sessions.length > 0 && renderRecipeList(sessions, false)}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed right-0 bottom-[34px] left-0">
        <div className="mx-auto w-full max-w-[450px] px-4">
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
