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
      className={`relative flex h-[90px] w-[90px] flex-col items-center justify-center rounded-[6px] border px-4 py-[13px] ${isSelected ? "border-[var(--color-green-deep)] bg-[var(--color-green-light)]" : "border-[#D1D1D1] bg-white"}`}
    >
      {isCustom && (
        <img
          src={deleteIcon}
          alt="delete"
          className="absolute top-[9px] right-[10px] z-10 h-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e);
          }}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-[2px]">
        <img src={image} className="h-12 w-12" />

        <span className="typo-caption w-[58px] truncate !font-bold whitespace-nowrap">
          {name}
        </span>
      </div>
    </button>
  );
}

export default memo(Item);
