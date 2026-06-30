import { memo } from "react";

import deleteIcon from "@/assets/recipe/delete.svg";

interface ItemProps {
  image: string;
  name: string;
  isSelected?: boolean;
  isCustom?: boolean;
  onSelect?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

function Item({
  image,
  name,
  isSelected = false,
  isCustom = false,
  onSelect,
  onDelete,
}: ItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col w-[90px] h-[90px] rounded-[6px] border items-center justify-center px-4 py-[13px]
        ${isSelected ? "bg-green-light border-green-deep" : "bg-gray-0 border-gray-10"}`}>
      {isCustom && (
        <img
          src={deleteIcon}
          alt="delete"
          className="absolute right-[10px] top-[9px] h-3 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e);
          }}
        />
      )}
      <div className="flex flex-col gap-[2px] items-center justify-center">
        <img src={image} className="w-12 h-12" />

        <span className="typo-caption !font-bold truncate whitespace-nowrap w-[58px]">
          {name}
        </span>
      </div>
    </button>
  );
}

export default memo(Item);