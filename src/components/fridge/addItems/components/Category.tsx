import React from "react";

interface CategoryProps {
  image: string;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

const Category: React.FC<CategoryProps> = React.memo(
  ({ image, name, isSelected = false, onSelect }) => {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex h-8 min-w-12 rounded-[6px] ${isSelected ? "bg-gray-200" : "bg-white"}`}
      >
        <div className="flex items-center justify-center gap-[6px] p-3">
          <img src={image} className="h-4 w-4" />
          <span className="text-[10px] leading-none font-semibold whitespace-nowrap text-zinc-500">
            {name}
          </span>
        </div>
      </button>
    );
  },
);
Category.displayName = "Category";

export default Category;
