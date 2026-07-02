import { memo } from "react";

interface CategoryProps {
  image: string;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

function Category({
  image,
  name,
  isSelected = false,
  onSelect,
}: CategoryProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-8 min-w-12 rounded-[6px] ${isSelected ? "bg-gray-200" : "bg-gray-0"}`}
    >
      <div className="flex items-center justify-center gap-[6px] p-3">
        <img src={image} className="h-4 w-4" />
        <span className="text-[10px] leading-none font-semibold whitespace-nowrap text-gray-50">
          {name}
        </span>
      </div>
    </button>
  );
}

export default memo(Category);
