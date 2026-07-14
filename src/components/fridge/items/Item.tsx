import React, { memo, useCallback } from "react";

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

export default memo(function Item({
  image,
  name,
  leftDays,
  isSelected = false,
  onSelect,
  onDetail,
  className = "",
  style,
}: ItemProps) {
  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.();
    },
    [onSelect],
  );

  return (
    <div
      onClick={onDetail}
      role="button"
      tabIndex={0}
<<<<<<< HEAD
      className={`relative min-w-[109px] flex h-20 flex-col rounded-[6px] border px-[10px] pt-[10px] shadow-[0px_1px_8px_-2px_rgba(17,17,17,0.25)] ${
=======
      className={`shadow-plant flex h-20 w-[114px] flex-col items-start overflow-hidden rounded-[6px] border pl-[11px] ${
>>>>>>> 355533cc62d81bbd8dd9e2b59905ad80f756442a
        isSelected
          ? "bg-green-light border-emerald-400"
          : "border-gray-10 bg-gray-0"
      } ${className}`}
      style={style}
    >
      <div className="flex flex-col items-start">
        <span className="typo-label text-gray-80 block">{name}</span>
        <span
          className={`typo-caption whitespace-nowrap ${
            leftDays < 3 ? "text-red-600" : "text-gray-50"
          }`}
        >
          {leftDays >= 0 ? `D-${leftDays}` : `D+${Math.abs(leftDays)}`}
        </span>
      </div>

<<<<<<< HEAD
      <button
        onClick={e => {
          e.stopPropagation();
          onSelect?.();
        }}
        className="absolute bottom-0 left-0 z-10 h-8 w-8 flex-shrink-0"
      >
=======
      <div className="flex w-full flex-1 items-end justify-between pb-1.5">
        <button
          onClick={handleSelect}
          className="z-10 -ml-2 flex h-9 w-9 flex-shrink-0 justify-start"
        >
          <img
            src={isSelected ? checkOn : check}
            className="w-full flex-shrink-0 object-contain"
            alt="check"
          />
        </button>

>>>>>>> 355533cc62d81bbd8dd9e2b59905ad80f756442a
        <img
          src={isSelected ? checkOn : check}
          className="w-full flex-shrink-0 object-contain"
          alt="check"
        />
      </button>

      <img
        className="absolute right-[1px] bottom-0 h-10 w-10 flex-shrink-0 object-contain"
        src={image}
        alt={name}
      />
    </div>
  );
});
