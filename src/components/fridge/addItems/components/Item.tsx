import { memo } from "react";

import DeleteIcon from "@/assets/icons/delete.svg?react";

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
      className={`rounded-S relative flex h-[90px] w-[90px] flex-col items-center justify-center border px-4 py-[13px] ${isSelected ? "bg-green-light border-green-deep" : "bg-gray-0 border-gray-10"}`}
    >
      {isCustom && (
        <DeleteIcon
          aria-label="delete"
          role="img"
          className="absolute top-[9px] right-[10px] z-10 h-3 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onDelete?.(e);
          }}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-[2px]">
        <img src={image} className="h-12 w-12" />

        <span
          className={`typo-m-strong w-[58px] truncate whitespace-nowrap ${isSelected ? "text-green-deep" : "text-gray-80"}`}
        >
          {name}
        </span>
      </div>
    </button>
  );
}

export default memo(Item);
