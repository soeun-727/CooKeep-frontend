// components/cookeeps/RecipeListItem.tsx
import { MouseEvent } from "react";

import LikeIcon from "@/assets/cookeeps/like.svg?react";
import BookmarkIcon from "@/assets/cookeeps/bookmark.svg?react";
import DotsVerticalIcon from "@/assets/cookeeps/dots_vertical.svg?react";
import defaultRecipeImage from "@/assets/cookeeps/main/default_recipe_image.svg";
import emptySlotImage from "@/assets/cookeeps/main/temp_recipe_cookeeps_empty.svg";

type Badge = { type: "like"; likes: number } | { type: "bookmark" };

interface RecipeListItemProps {
  rank?: number; // 있으면 순위뱃지 표시
  title: string;
  subtitle?: string; // 유저이름 (placeholder일 땐 비움)
  image?: string;
  isPlaceholder?: boolean; // "레시피를 등록해주세요" 상태
  badge: Badge; // 항상 표시용 (좋아요 수 or 북마크 아이콘)
  onDelete?: (e: MouseEvent) => void; // 있으면 케밥 버튼 렌더링
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function RecipeListItem({
  rank,
  title,
  subtitle,
  image,
  isPlaceholder = false,
  badge,
  onDelete,
  isSelected = false,
  onSelect,
}: RecipeListItemProps) {
  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete?.(e);
  };

  // 사진 우선순위: placeholder면 빈 슬롯 이미지, 아니면 실제 이미지, 없으면 기본 이미지
  const displayImage = isPlaceholder
    ? emptySlotImage
    : image || defaultRecipeImage;

  return (
    <div
      onClick={!isPlaceholder ? onSelect : undefined}
      className={`flex items-center gap-3 self-stretch rounded-2xl ${
        isSelected ? "bg-gray-10" : ""
      } ${onSelect && !isPlaceholder ? "cursor-pointer" : ""}`}
    >
      {/* 사진 + 순위뱃지 */}
      <div className="relative flex-shrink-0">
        <img
          src={displayImage}
          alt={title}
          className="h-[60px] w-[60px] rounded-lg object-cover"
        />
        {rank !== undefined && !isPlaceholder && (
          <div className="bg-gray-80 absolute -top-1.5 -left-[5px] flex h-6 w-6 items-center justify-center rounded-full p-1">
            <span className="typo-caption-strong text-gray-0">{rank}</span>
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div
        className={`flex min-w-0 flex-1 flex-col items-start self-stretch ${
          isPlaceholder ? "justify-between" : "justify-center gap-1"
        }`}
      >
        <p className="typo-l-strong text-gray-80 line-clamp-1 self-stretch">
          {title}
        </p>

        {!isPlaceholder && subtitle && (
          <p className="typo-m self-stretch text-gray-50">{subtitle}</p>
        )}

        {isPlaceholder && (
          <div className="flex items-center">
            <LikeIcon className="text-gray-30 h-6 w-6" />
            <span className="typo-l-strong text-gray-30 line-clamp-1">· 0</span>
          </div>
        )}
      </div>

      {/* 우측: 배지(표시용) + 케밥(삭제 액션, 있을 때만) */}
      {!isPlaceholder && (
        <div className="flex flex-shrink-0 items-center gap-1">
          {badge.type === "like" && (
            <div className="flex items-center">
              <LikeIcon className="text-gray-30 h-6 w-6" />
              <span className="typo-l text-green line-clamp-1">
                · {badge.likes}
              </span>
            </div>
          )}

          {badge.type === "bookmark" && (
            <BookmarkIcon className="text-gray-30 h-6 w-6" />
          )}

          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center transition-transform active:scale-90"
            >
              <DotsVerticalIcon className="text-gray-30 h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
