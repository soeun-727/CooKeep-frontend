import { useParams } from "react-router-dom";
import { useRecipeStore } from "../../../../stores/useRecipeStore";
import tempIcon from "../../../../assets/mycookeep/record/fork_knife_plate.svg";
import unlikedIcon from "../../../../assets/recipe/unliked.svg";
import likedIcon from "../../../../assets/recipe/liked.svg";
import { useRecipeFlowStore } from "../../../../stores/useRecipeFlowStore";

interface Props {
  name: string;
}

export default function RecipeTitle({ name }: Props) {
  const { sessionId: paramSessionId } = useParams();
  const { sessionId: flowSessionId } = useRecipeFlowStore();

  // 우선순위: URL → 없으면 store
  const currentSessionId = paramSessionId
    ? Number(paramSessionId)
    : flowSessionId;

  const { pinned, toggleLike } = useRecipeStore();

  // 현재 세션이 pinned 배열에 있는지 확인하여 하트 색상 결정
  const isLiked = pinned.some((p) => p.sessionId === currentSessionId);

  const handleToggleLike = async () => {
    if (currentSessionId) {
      await toggleLike(currentSessionId);
    }
  };

  return (
    <div
      className="
        flex items-center justify-center self-stretch
        w-full max-w-[361px]
        bg-white
        rounded-[6px]
        shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
        p-4
        mx-auto
      "
      style={{ gap: "8px" }}
    >
      {/* 왼쪽 이미지 */}
      <img
        src={tempIcon}
        alt="레시피 아이콘"
        className="flex-shrink-0 w-[36px] h-[36px]"
      />

      {/* 레시피 이름 */}
      <h2
        className="flex-1 text-[18px] font-semibold leading-[26px] text-[#202020]"
        style={{ flex: "1 0 0" }}
      >
        {name}
      </h2>

      {/* 즐겨찾기 버튼 */}
      <button
        onClick={handleToggleLike}
        className="flex-shrink-0 w-[22px] h-[18px] aspect-square"
      >
        <img
          src={isLiked ? likedIcon : unlikedIcon}
          alt={isLiked ? "즐겨찾기됨" : "즐겨찾기 안됨"}
          className="object-contain w-full h-full"
        />
      </button>
    </div>
  );
}
