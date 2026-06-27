import { likeGray } from "@/assets/index";

interface ItemProps {
  rank: number;
  img: string;
  title: string;
  likes?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

const AllItem = ({
  rank,
  img,
  title,
  likes,
  isSelected = false,
  onSelect,
  onIconClick,
}: ItemProps) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIconClick) onIconClick(e);
  };

  // 랭크별 배경색 및 글자색 결정
  // const getRankStyle = () => {
  //   if (rank === 1) return "bg-(--color-green) text-white";
  //   if (rank === 2 || rank === 3) return "bg-black text-white";
  //   return "bg-gray-200 text-zinc-500"; // 회색 배경일 때 글자색 변경
  // };

  return (
    <div
      onClick={onSelect}
      className={`flex h-12 w-[361px] cursor-pointer items-center justify-between rounded-[6px] px-2 py-[10px] transition-colors ${
        isSelected ? "bg-gray-200" : "bg-[#FAFAFA]"
      }`}
    >
      {/* 순위 배지 */}
      <div
        className={`typo-caption flex h-5 w-[30px] flex-shrink-0 items-center justify-center rounded-[100px] bg-gray-200 font-bold text-zinc-500`} // ${getRankStyle()}
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
          className="mx-4 flex flex-shrink-0 items-center gap-1"
        >
          <img src={likeGray} alt="like" className="w-[13px] flex-shrink-0" />

          {/* 숫자 오른쪽 정렬 */}
          <span className="typo-caption ml-0.5 flex-1 text-right whitespace-nowrap text-zinc-500">
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
};

export default AllItem;
