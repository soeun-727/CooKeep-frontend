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
      className={`bg-gray-0 relative flex h-14 flex-1 flex-col items-center justify-center gap-[2px] transition-all ${
        isSelected ? "shadow-[inset_0_0_2px_0_rgba(17,17,17,0.1)]" : ""
      }`}
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
}
