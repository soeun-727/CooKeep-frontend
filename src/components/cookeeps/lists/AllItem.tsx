import { likeGray } from "../../../assets";

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
      className={`w-[361px] h-12 rounded-[6px] flex items-center justify-between px-2 py-[10px] cursor-pointer transition-colors ${
        isSelected ? "bg-gray-200" : "bg-[#FAFAFA]"
      }`}
    >
      {/* 순위 배지 */}
      <div
        className={`flex items-center justify-center w-[30px] h-5 rounded-[100px] typo-caption flex-shrink-0 font-bold bg-gray-200 text-zinc-500 `} // ${getRankStyle()}
      >
        {rank}
      </div>

      <span className="flex-1 px-[14px] truncate typo-body text-left">
        {title}
      </span>

      {/* 우측 아이콘 및 이미지 */}
      <div className="flex items-center flex-shrink-0">
        {/* 좋아요 영역 */}
        <div
          onClick={handleIconClick}
          className="flex items-center gap-1 flex-shrink-0 mx-4"
        >
          <img src={likeGray} alt="like" className="w-[13px] flex-shrink-0" />

          {/* 숫자 오른쪽 정렬 */}
          <span className="flex-1 text-right ml-0.5 typo-caption text-zinc-500 whitespace-nowrap">
            {likes ?? 0}
          </span>
        </div>

        {/* 이미지 (항상 고정 위치) */}
        <img
          src={img}
          alt={title}
          className="w-[65px] h-[42px] rounded-[6px] object-cover flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default AllItem;
