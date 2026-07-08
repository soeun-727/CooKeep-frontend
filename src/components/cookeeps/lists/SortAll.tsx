import sortIcon from "@/assets/fridge/sort.svg";

import { COOKEEPS_SORT_OPIONS } from "@/constants/cookeeps";

interface SortProps {
  currentOrder: string;
  onSortChange: (order: string) => void;
}

export default function SortAll({ currentOrder, onSortChange }: SortProps) {
  const handleClick = () => {
    const currentIndex = COOKEEPS_SORT_OPIONS.indexOf(currentOrder);
    const nextIndex = (currentIndex + 1) % COOKEEPS_SORT_OPIONS.length;
    onSortChange(COOKEEPS_SORT_OPIONS[nextIndex]);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-0 shadow-hover inline-flex items-center gap-[2px] rounded-full px-[20px] py-[8px]"
    >
      <span className="text-[12px] leading-[16px] font-medium text-gray-50">
        {currentOrder}
      </span>
      <img src={sortIcon} className="h-[16px] w-[16px]" />
    </button>
  );
}
