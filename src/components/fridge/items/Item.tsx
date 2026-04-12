import React from "react";
import check from "../../../assets/fridge/check.svg";
import checkOn from "../../../assets/fridge/check_selected.svg";

interface ItemProps {
  image: string;
  name: string;
  leftDays: number;

  isSelected?: boolean;
  onSelect?: () => void;
  onDetail?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Item: React.FC<ItemProps> = ({
  image,
  name,
  leftDays,
  isSelected = false,
  onSelect,
  onDetail,
  className = "",
  style,
}) => {
  return (
    <div
      onClick={onDetail}
      role="button"
      tabIndex={0}
      className={`w-[114px] h-20 rounded-[6px] border flex flex-col 
        items-start shadow-[0px_1px_8px_-2px_rgba(17,17,17,0.25)] overflow-hidden pl-[11px] ${
          isSelected
            ? "border-emerald-400 bg-[var(--color-green-light)]"
            : "border-[#D1D1D1] bg-white"
        } ${className}`}
      style={style}
    >
      <div className="flex flex-col items-start">
        <span className="w-[85px] pt-[10px] text-left truncate typo-caption font-bold block leading-none">
          {name}
        </span>
        <span
          className={`text-left text-[10px] font-semibold leading-tight whitespace-nowrap mt-0.5 ${
            leftDays < 3 ? "text-red-600" : "text-stone-300"
          }`}
        >
          {leftDays >= 0 ? `D-${leftDays}` : `D+${Math.abs(leftDays)}`}
        </span>
      </div>

      <div className="flex justify-between items-end w-full flex-1 pb-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="flex-shrink-0 z-10 w-9 h-9 -ml-2 flex justify-start"
        >
          <img
            src={isSelected ? checkOn : check}
            className="w-full object-contain flex-shrink-0"
            alt="check"
          />
        </button>

        <img
          className="w-10 h-10 object-contain flex-shrink-0 -translate-x-1 -translate-y-[3px]"
          src={image}
          alt={name}
        />
      </div>
    </div>
  );
};

export default Item;
