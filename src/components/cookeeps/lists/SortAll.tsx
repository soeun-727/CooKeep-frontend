import sortIcon from "@/assets/fridge/sort.svg";

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
      className="bg-gray-0 inline-flex items-center gap-[2px] rounded-full px-[20px] py-[8px] shadow-[0_-36px_30.6px_rgba(0,0,0,0.05)]"
    >
      <span className="text-[12px] leading-[16px] font-medium text-gray-50">
        {currentOrder}
      </span>
      <img src={sortIcon} className="h-[16px] w-[16px]" />
    </button>
  );
}
