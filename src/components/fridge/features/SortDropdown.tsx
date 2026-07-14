import { type SortOrder } from "@/stores/useIngredientStore";

interface SortDropdownProps {
  isOpen: boolean;
  onSelect: (option: SortOrder) => void;
}

export const SortDropdown = ({ isOpen, onSelect }: SortDropdownProps) => {
  if (!isOpen) return null;

  const options: SortOrder[] = [
    "유통기한 임박 순",
    "등록 최신 순",
    "등록 오래된 순",
  ];

  return (
    <div className="bg-gray-0 border-gray-10 shadow-add-button absolute top-full right-0 z-50 mt-[3px] flex min-w-31 flex-col items-center justify-center overflow-hidden rounded-[12px] py-2">
      {options.map(option => (
        <div key={option} className="flex w-full flex-col items-center">
          <button
            onClick={() => onSelect(option)}
            className="typo-m text-gray-80 w-full px-3 py-2 text-left whitespace-nowrap"
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
};
