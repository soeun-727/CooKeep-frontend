import { likeGray, bookmarkGray } from "../../../assets";

interface ItemProps {
  type: string;
  img: string;
  title: string;
  likes?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

const ListItem: React.FC<ItemProps> = ({
  type,
  img,
  title,
  likes,
  isSelected = false,
  onSelect,
  onIconClick,
}) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onSelect가 실행되지 않도록 방지
    if (onIconClick) onIconClick(e);
  };
  return (
    <div
      onClick={onSelect}
      className={`w-[335px] h-12 rounded-[6px] flex items-center justify-between px-2 py-[10px] ${isSelected ? "bg-gray-200" : "bg-[#FAFAFA]"}`}
    >
      <img
        src={img}
        alt={title}
        className="h-[42px] w-[65px]  rounded-[6px] object-cover"
      />
      <span className="w-[190px] typo-body truncate text-left">{title}</span>
      {type === "좋아요 누른 레시피" ? (
        <button
          onClick={handleIconClick}
          className="flex items-center justify-between w-[38px] active:scale-90 transition-transform"
        >
          <img src={likeGray} alt="like" className="w-4" />
          <span className="typo-caption text-zinc-500">{likes}</span>
        </button>
      ) : (
        <button
          onClick={handleIconClick}
          className="active:scale-90 transition-transform pr-2"
        >
          <img src={bookmarkGray} alt="bookmark" className="w-7" />
        </button>
      )}
    </div>
  );
};

export default ListItem;
