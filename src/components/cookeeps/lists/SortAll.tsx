import SortIcon from "@/assets/fridge/sort.svg?react";

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
      className="shadow-container inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-[1px]"
    >
      <span className="typo-label text-gray-50">{currentOrder}</span>
      <SortIcon className="h-5 w-5 text-gray-50" />
    </button>
  );
}
