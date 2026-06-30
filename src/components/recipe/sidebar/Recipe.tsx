import { useState, useRef, useEffect } from "react";
import liked from "@/assets/recipe/liked.svg";
import unliked from "@/assets/recipe/unliked.svg";
import rename from "@/assets/recipe/rename.svg";
import deleteIcon from "@/assets/recipe/delete.svg";

interface RecipeProps {
  isLiked: boolean;
  name: string;
  searchTerm?: string;
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
  onDelete,
  onSelect,
}: RecipeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="mx-auto flex h-[34px] w-[277px] items-center justify-between">
      <button onClick={onLike} className="flex-shrink-0 px-2">
        <img src={isLiked ? liked : unliked} alt="like" className="w-[18px]" />
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleFinishRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFinishRename();
            if (e.key === "Escape") {
              setEditValue(name);
              setIsEditing(false);
            }
          }}
          className="flex-1 min-w-0 mx-2 px-1 typo-body2 border border-gray-30 outline-none bg-gray-0 rounded-sm"
        />
      ) : (
        <button onClick={onSelect} className="min-w-0 flex-1">
          <span className="typo-body2 block truncate px-2 text-left">
            {highlightText(name, searchTerm)}
          </span>
        </button>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="flex-shrink-0 px-[10px]"
      >
        <img src={rename} alt="rename" className="w-[14px]" />
      </button>

      <button onClick={onDelete} className="flex-shrink-0 px-[10px]">
        <img src={deleteIcon} alt="delete" className="w-[14px]" />
      </button>
    </div>
  );
}
