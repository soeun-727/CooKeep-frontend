// import { useState } from "react";
import likeIcon from "@/assets/cookeeps/main/like_cookeeps.svg";
import saveIcon from "@/assets/cookeeps/main/save_cookeeps.svg";

// 저장눌렀을때 아이콘 확정되면 수정

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
      <div className="flex h-[20px] items-center gap-1 rounded-full bg-[#202020] px-3">
        <span className="text-[12px] font-medium text-[#32E389]">
          {userName}
        </span>
        <span className="text-[12px] font-medium text-white">님의 레시피</span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center">
        <button
          onClick={onLike}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        >
          <img
            src={likeIcon}
            alt="좋아요"
            className={`h-8 w-8 ${isLiked ? "brightness-100 invert" : ""}`}
          />
        </button>

        <button
          onClick={onBookmark}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        >
          <img
            src={saveIcon}
            alt="저장"
            className={`h-8 w-8 ${isBookmarked ? "brightness-100 invert" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
