import { memo, useCallback } from "react";

import type { IconComponent } from "@/types/icon";

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
      <Icon
        style={{ color: iconColor }}
        className="h-6 w-6"
        aria-label={title}
      />

      <span
        className={`typo-caption-strong ${isSelected ? "text-green" : "text-gray-30"}`}
      >
        {title}
      </span>
    </button>
  );
});
