import type { IconComponent } from "@/types/icon";

interface TabProps {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  Icon: IconComponent;
  iconColor: string;
}

export default function Tab({
  title,
  isSelected = false,
  onClick,
  Icon,
  iconColor,
}: TabProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-0 flex w-full flex-col items-center gap-1 px-4 py-2"
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
}
