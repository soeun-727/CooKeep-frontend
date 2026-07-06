import { useParams } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { useRecipeStore } from "@/stores/useRecipeStore";

import tempIcon from "@/assets/mycookeep/record/fork_knife_plate.svg";
import HeartIcon from "@/assets/recipe/heart.svg?react";

interface RecipeTitleProps {
  name: string;
}

export default function RecipeTitle({ name }: RecipeTitleProps) {
  const { sessionId: paramSessionId } = useParams();
  const { sessionId: flowSessionId } = useRecipeFlowStore();

  // 우선순위: URL → 없으면 store
  const currentSessionId = paramSessionId
    ? Number(paramSessionId)
    : flowSessionId;

  const { pinned, toggleLike } = useRecipeStore();

  // 현재 세션이 pinned 배열에 있는지 확인하여 하트 색상 결정
  const isLiked = pinned.some(p => p.sessionId === currentSessionId);

  const handleToggleLike = async () => {
    if (currentSessionId) {
      await toggleLike(currentSessionId);
    }
  };

  return (
    <div
      className="bg-gray-0 shadow-search mx-auto flex w-full max-w-[361px] items-center justify-center self-stretch rounded-[6px] p-4"
      style={{ gap: "8px" }}
    >
      {/* 왼쪽 이미지 */}
      <img
        src={tempIcon}
        alt="레시피 아이콘"
        className="h-[36px] w-[36px] flex-shrink-0"
      />

      {/* 레시피 이름 */}
      <h2
        className="text-gray-80 flex-1 text-[18px] leading-[26px] font-semibold"
        style={{ flex: "1 0 0" }}
      >
        {name}
      </h2>

      {/* 즐겨찾기 버튼 */}
      <button
        onClick={handleToggleLike}
        className="aspect-square h-[18px] w-[22px] flex-shrink-0"
      >
        {/* 변경된 부분: img 태그 대신 SVGR 컴포넌트 사용 */}
        <HeartIcon
          className={`stroke-gray-10 h-full w-full fill-current stroke-[2px] ${isLiked ? "text-gray-30" : "text-transparent"}`}
        />
      </button>
    </div>
  );
}
