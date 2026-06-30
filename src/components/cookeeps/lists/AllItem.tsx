// import { likeGray } from "@/assets/index";
import LikeGray from "@/assets/cookeeps/like.svg?react";

interface ItemProps {
  rank: number;
  img: string;
  title: string;
  likes?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

export default function AllItem({
  rank,
  img,
  title,
  likes,
  isSelected = false,
  onSelect,
  onIconClick,
}: ItemProps) {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIconClick) onIconClick(e);
  };

  return (
    <div
      onClick={onSelect}
      className={`w-[361px] h-12 rounded-[6px] flex items-center justify-between px-2 py-[10px] cursor-pointer transition-colors ${
        isSelected ? "bg-gray-200" : "bg-background"
      }`}
    >
      {/* 순위 배지 */}
      <div
        className={`flex items-center justify-center w-[30px] h-5 rounded-[100px] typo-caption flex-shrink-0 font-bold bg-gray-200 text-gray-50 `} // ${getRankStyle()}
      >
        {rank}
      </div>

      <span className="typo-body flex-1 truncate px-[14px] text-left">
        {title}
      </span>

      {/* 우측 아이콘 및 이미지 */}
      <div className="flex flex-shrink-0 items-center">
        {/* 좋아요 영역 */}
        <div
          onClick={handleIconClick}
          className="mx-4 flex flex-shrink-0 items-center"
        >
          <LikeGray className="h-[18px] w-[18px] text-[#C3C3C3]" />

          {/* 숫자 오른쪽 정렬 */}
          <span className="flex-1 text-right ml-0.5 typo-caption text-gray-50 whitespace-nowrap">
            {likes ?? 0}
          </span>
        </div>

        {/* 이미지 (항상 고정 위치) */}
        <img
          src={img}
          alt={title}
          className="h-[42px] w-[65px] flex-shrink-0 rounded-[6px] object-cover"
        />
      </div>
    </div>
  );
}
