import { useEffect, useRef, useState } from "react";
import KebabIcon from "@/assets/mycookeep/record/options.svg?react";
import HeartIcon from "@/assets/recipe/heart.svg?react";
import RecipeOptionMenu from "@/components/ui/OptionsMenu";

interface RecipeProps {
  isLiked: boolean;
  name: string;
  searchTerm?: string;
  isActive?: boolean;
  onLike?: () => void;
  onRename?: (newName: string) => void;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleFinishRename = () => {
    if (editValue.trim() !== "" && editValue !== name) {
      onRename?.(editValue);
    }
    setIsEditing(false);
  };

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMenuOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 30,
      });
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
      <button onClick={onLike} className="h-8 w-8 flex-shrink-0">
        <HeartIcon
          className={`stroke-gray-10 h-4 w-[18px] fill-current stroke-[2px] ${isLiked ? "text-gray-30" : "text-transparent"}`}
        />
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={handleFinishRename}
          onKeyDown={e => {
            if (e.key === "Enter") handleFinishRename();
            if (e.key === "Escape") {
              setEditValue(name);
              setIsEditing(false);
            }
          }}
          className="typo-l border-gray-30 bg-gray-0 mx-2 min-w-0 flex-1 rounded-sm border px-1 outline-none"
        />
      ) : (
        <button onClick={onSelect} className="min-w-0 flex-1">
          <span className="typo-l block truncate text-left">
            {highlightText(name, searchTerm)}
          </span>
        </button>
      )}
      {isActive && (
        <span className="text-green-deep typo-caption pt-[2px] whitespace-nowrap select-none">
          현재 보는 중
        </span>
      )}
      <RecipeOptionMenu
        isOpen={isMenuOpen}
        onToggle={handleToggleMenu}
        onEdit={() => {
          setIsEditing(true);
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
