import sortIcon from "../../../assets/fridge/sort.svg";

interface SortProps {
  currentOrder: string;
  onSortChange: (order: string) => void;
}

export default function SortAll({ currentOrder, onSortChange }: SortProps) {
  const options = ["좋아요 순", "최신 순", "오래된 순"];

  const handleClick = () => {
    const currentIndex = options.indexOf(currentOrder);
    const nextIndex = (currentIndex + 1) % options.length;
    onSortChange(options[nextIndex]);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-[2px] px-[20px] py-[8px] rounded-full bg-white shadow-[0_-36px_30.6px_rgba(0,0,0,0.05)]"
    >
      <span className="text-[12px] text-[#7D7D7D] font-medium leading-[16px]">
        {currentOrder}
      </span>
      <img src={sortIcon} className="w-[16px] h-[16px]" />
    </button>
  );
}
