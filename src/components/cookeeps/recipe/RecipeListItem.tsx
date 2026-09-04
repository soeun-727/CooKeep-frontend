import { MouseEvent, useEffect, useRef, useState } from "react";

import LikeIcon from "@/assets/cookeeps/like.svg?react";
import BookmarkIcon from "@/assets/cookeeps/bookmark.svg?react";
import DotsVerticalIcon from "@/assets/cookeeps/dots_vertical.svg?react";
import defaultRecipeImage from "@/assets/cookeeps/main/default_recipe_image.svg";

type Badge = { type: "like"; likes: number } | { type: "bookmark" };

interface RecipeListItemProps {
  rank?: number; // 있으면 순위뱃지 표시
  title: string;
  subtitle?: string; // 유저이름
  image?: string;
  badge: Badge; // 좋아요 수 or 북마크 아이콘
  onDelete?: (e: MouseEvent) => void; // 있으면 케밥 버튼 렌더링
  onSelect?: () => void;
}

export default function RecipeListItem({
  rank,
  title,
  subtitle,
  image,
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

  const displayImage = image || defaultRecipeImage;

  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 self-stretch rounded-2xl ${onSelect ? "cursor-pointer" : ""}`}
    >
      {/* 사진 + 순위뱃지 */}
      <div className="relative flex-shrink-0">
        <img
          src={displayImage}
          alt={title}
          className="h-[60px] w-[60px] rounded-lg object-cover"
        />
        {rank !== undefined && (
          <div className="bg-gray-80 absolute -top-1.5 -left-[5px] flex h-6 w-6 items-center justify-center rounded-full p-1">
            <span className="typo-caption-strong text-gray-0">{rank}</span>
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1">
        <p className="typo-l-strong text-gray-80 line-clamp-1">{title}</p>

        {subtitle && <p className="typo-m text-gray-50">{subtitle}</p>}
      </div>

      {/* 우측: 배지(표시용) + 케밥(삭제 액션, 있을 때만) */}
      <div className="flex flex-shrink-0 items-center gap-1">
        {badge.type === "like" && (
          <div className="flex items-center">
            <LikeIcon className="text-gray-30 h-6 w-6 fill-current" />
            <span className="typo-l text-green line-clamp-1">
              · {badge.likes}
            </span>
          </div>
        )}

        {badge.type === "bookmark" && (
          <BookmarkIcon className="text-gray-30 h-6 w-6 fill-current" />
        )}

        {onDelete && (
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
                className="border-gray-10 shadow-container absolute top-full right-1 z-10 mt-1 flex w-[124px] flex-col items-center rounded-2xl border bg-white/90 py-2 backdrop-blur-[1px]"
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
