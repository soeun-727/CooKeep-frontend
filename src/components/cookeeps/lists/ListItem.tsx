import { bookmarkGray, likeGray } from "@/assets/index";

interface ItemProps {
  type: string;
  img: string;
  title: string;
  likes?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

export default function ListItem({
  type,
  img,
  title,
  likes,
  isSelected = false,
  onSelect,
  onIconClick,
}: ItemProps) {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onSelect가 실행되지 않도록 방지
    if (onIconClick) onIconClick(e);
  };
  return (
    <div
      onClick={onSelect}
      className={`flex h-12 w-[335px] items-center justify-between rounded-[6px] px-2 py-[10px] ${isSelected ? "bg-gray-200" : "bg-[#FAFAFA]"}`}
    >
      <img
        src={img}
        alt={title}
        className="h-[42px] w-[65px] rounded-[6px] object-cover"
      />
      <span className="typo-body w-[190px] truncate text-left">{title}</span>
      {type === "좋아요 누른 레시피" ? (
        <button
          onClick={handleIconClick}
          className="flex w-[38px] items-center justify-between transition-transform active:scale-90"
        >
          <img src={likeGray} alt="like" className="w-4" />
          <span className="typo-caption text-zinc-500">{likes}</span>
        </button>
      ) : (
        <button
          onClick={handleIconClick}
          className="pr-2 transition-transform active:scale-90"
        >
          <img src={bookmarkGray} alt="bookmark" className="w-7" />
        </button>
      )}
    </div>
  );
}
