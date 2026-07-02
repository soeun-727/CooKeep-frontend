import React from "react";

import check from "@/assets/fridge/check.svg";
import checkOn from "@/assets/fridge/check_selected.svg";

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

export default function Item({
  image,
  name,
  leftDays,
  isSelected = false,
  onSelect,
  onDetail,
  className = "",
  style,
}: ItemProps) {
  return (
    <div
      onClick={onDetail}
      role="button"
      tabIndex={0}
      className={`flex h-20 w-[114px] flex-col items-start overflow-hidden rounded-[6px] border pl-[11px] shadow-[0px_1px_8px_-2px_rgba(17,17,17,0.25)] ${
        isSelected
          ? "bg-green-light border-emerald-400"
          : "border-gray-10 bg-gray-0"
      } ${className}`}
      style={style}
    >
      <div className="flex flex-col items-start">
        <span className="typo-caption block w-[85px] truncate pt-[10px] text-left leading-none font-bold">
          {name}
        </span>
        <span
          className={`mt-0.5 text-left text-[10px] leading-tight font-semibold whitespace-nowrap ${
            leftDays < 3 ? "text-red-600" : "text-gray-30"
          }`}
        >
          {leftDays >= 0 ? `D-${leftDays}` : `D+${Math.abs(leftDays)}`}
        </span>
      </div>

      <div className="flex w-full flex-1 items-end justify-between pb-1.5">
        <button
          onClick={e => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="z-10 -ml-2 flex h-9 w-9 flex-shrink-0 justify-start"
        >
          <img
            src={isSelected ? checkOn : check}
            className="w-full flex-shrink-0 object-contain"
            alt="check"
          />
        </button>

        <img
          className="h-10 w-10 flex-shrink-0 -translate-x-1 -translate-y-[3px] object-contain"
          src={image}
          alt={name}
        />
      </div>
    </div>
  );
}
