import { useState } from "react";

import HeartIcon from "@/assets/icons/heart.svg?react";
import KebabIcon from "@/assets/mycookeep/record/options.svg?react";

import RecipeOptionMenu from "@/components/ui/OptionsMenu";

interface RecipeProps {
  isLiked: boolean;
  name: string;
  searchTerm?: string;
  isActive?: boolean;
  onLike?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
}

export default function Recipe({
  isLiked = false,
  name,
  searchTerm = "",
  onLike,
  onRename,
  isActive,
  onDelete,
  onSelect,
}: RecipeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!isMenuOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + 4, left: rect.left - 30 });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-green-deep font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="mx-auto flex w-full items-center justify-between px-3 py-1">
      <button
        onClick={onLike}
        className="flex h-8 w-8 items-center justify-start"
      >
        <HeartIcon
          className={`stroke-gray-10 w-[18px] fill-current stroke-[2px] ${isLiked ? "text-gray-30" : "text-transparent"}`}
        />
      </button>

      <button onClick={onSelect} className="min-w-0 flex-1">
        <span className="typo-l block truncate text-left">
          {highlightText(name, searchTerm)}
        </span>
      </button>

      {isActive && (
        <span className="text-green-deep typo-caption mr-1 pt-[2px] whitespace-nowrap select-none">
          현재 보는 중
        </span>
      )}

      <RecipeOptionMenu
        isOpen={isMenuOpen}
        onToggle={handleToggleMenu}
        onEdit={() => {
          onRename?.();
          setIsMenuOpen(false);
        }}
        onDelete={() => {
          onDelete?.();
          setIsMenuOpen(false);
        }}
        firstOption="이름 바꾸기"
        Icon={KebabIcon}
        iconClassName="text-gray-30 w-full"
        menuStyle={{
          position: "fixed",
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
        }}
      />
    </div>
  );
}
