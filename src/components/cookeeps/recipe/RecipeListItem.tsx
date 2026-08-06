// components/cookeeps/RecipeListItem.tsx
import { MouseEvent, useEffect, useRef, useState } from "react";

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
  onSelect,
}: RecipeListItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutside = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [isMenuOpen]);

  const handleKebabClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDelete?.(e);
  };

  // 사진 우선순위: placeholder면 빈 슬롯 이미지, 아니면 실제 이미지, 없으면 기본 이미지
  const displayImage = isPlaceholder
    ? emptySlotImage
    : image || defaultRecipeImage;

  return (
    <div
      onClick={!isPlaceholder ? onSelect : undefined}
      className={`flex items-center gap-3 self-stretch rounded-2xl ${onSelect && !isPlaceholder ? "cursor-pointer" : ""}`}
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
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 self-stretch">
        <p className="typo-l-strong text-gray-80 line-clamp-1 self-stretch">
          {title}
        </p>

        {!isPlaceholder && subtitle && (
          <p className="typo-m self-stretch text-gray-50">{subtitle}</p>
        )}
      </div>

      {/* 우측: 배지(표시용) + 케밥(삭제 액션, 있을 때만) */}
      <div className="flex flex-shrink-0 items-center gap-1">
        {badge.type === "like" && (
          <div className="flex items-center">
            <LikeIcon
              className={`h-6 w-6 fill-current ${isPlaceholder ? "text-gray-30" : "text-gray-30"}`}
            />
            <span
              className={`typo-l line-clamp-1 ${isPlaceholder ? "text-gray-30" : "text-green"}`}
            >
              · {badge.likes}
            </span>
          </div>
        )}

        {!isPlaceholder && badge.type === "bookmark" && (
          <BookmarkIcon className="text-gray-30 h-6 w-6" />
        )}

        {!isPlaceholder && onDelete && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleKebabClick}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center transition-transform active:scale-90"
            >
              <DotsVerticalIcon className="text-gray-30 h-6 w-6" />
            </button>

            {isMenuOpen && (
              <div
                onClick={e => e.stopPropagation()}
                className="border-gray-10 absolute top-full right-1 z-10 mt-1 flex w-[124px] flex-col items-center rounded-2xl border bg-white/90 py-2 shadow-[0_4px_16px_0_rgba(17,17,17,0.10)] backdrop-blur-[1px]"
              >
                <button
                  onClick={handleDeleteClick}
                  className="typo-m text-semantic-negative flex h-9 w-full items-center gap-2 rounded-b-2xl px-3 py-2"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
