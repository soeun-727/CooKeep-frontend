import LikeIcon from "@/assets/cookeeps/main/like_cookeeps.svg?react";
import SaveIcon from "@/assets/cookeeps/main/save_cookeeps.svg?react";

interface RecipeDetailUserMetaProps {
  userName: string;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

export default function RecipeDetailUserMeta({
  userName,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
}: RecipeDetailUserMetaProps) {
  return (
    <div className="flex w-full items-center justify-between p-1">
      {/* 유저 pill */}
      <div className="bg-gray-80 flex h-[20px] items-center gap-1 rounded-full px-3">
        <span className="text-green text-[12px] font-medium">{userName}</span>
        <span className="text-gray-0 text-[12px] font-medium">님의 레시피</span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center">
        <button
          onClick={onLike}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        >
          <LikeIcon
            aria-label="좋아요"
            role="img"
            className={`h-8 w-8 ${isLiked ? "brightness-100 invert" : ""}`}
          />
        </button>

        <button
          onClick={onBookmark}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        >
          <SaveIcon
            aria-label="저장"
            role="img"
            className={`h-8 w-8 ${isBookmarked ? "brightness-100 invert" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
