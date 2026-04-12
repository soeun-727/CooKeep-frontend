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
        className={`min-w-12 h-8 rounded-[6px] flex
        ${isSelected ? "bg-gray-200" : "bg-white"}`}
      >
        <div className="flex gap-[6px] p-3 items-center justify-center">
          <img src={image} className="w-4 h-4" />
          <span className="font-semibold text-[10px] text-zinc-500 whitespace-nowrap leading-none">
            {name}
          </span>
        </div>
      </button>
    );
  },
);
Category.displayName = "Category";

export default Category;
