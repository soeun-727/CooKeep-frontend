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
      className={`flex h-12 w-[361px] cursor-pointer items-center justify-between rounded-[6px] px-2 py-[10px] transition-colors ${
        isSelected ? "bg-gray-200" : "bg-background"
      }`}
    >
      {/* 순위 배지 */}
      <div
        className={`typo-caption flex h-5 w-[30px] flex-shrink-0 items-center justify-center rounded-[100px] bg-gray-200 font-bold text-gray-50`} // ${getRankStyle()}
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
          <span className="typo-caption ml-0.5 flex-1 text-right whitespace-nowrap text-gray-50">
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
