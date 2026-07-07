import type { IconComponent } from "@/types/icon";
import { memo, useCallback } from "react";

interface TabProps {
  title: string;
  isSelected?: boolean;
  onClick?: (name: string) => void;
  Icon: IconComponent;
  iconColor: string;
}

export default memo(function Tab({
  title,
  isSelected = false,
  onClick,
  Icon,
  iconColor,
}: TabProps) {
  const handleClick = useCallback(() => onClick?.(title), [onClick, title]);
  return (
    <button
      onClick={handleClick}
      className="bg-gray-0 relative flex h-14 flex-1 flex-col items-center justify-center gap-[2px]"
    >
      {isSelected && (
        <div className="bg-green-gradient absolute top-0 left-0 h-[2px] w-full" />
      )}

      <Icon
        style={{ color: iconColor }}
        className="h-[25px] w-[25px]"
        aria-label={title}
      />

      <span
        className={`text-center text-[10px] leading-3 font-semibold tracking-[0.1px] ${
          isSelected ? "text-gray-80" : "text-gray-30"
        }`}
      >
        {title}
      </span>
    </button>
  );
});
