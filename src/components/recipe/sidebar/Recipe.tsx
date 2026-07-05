import { useEffect, useRef, useState } from "react";

import deleteIcon from "@/assets/recipe/delete.svg";
import HeartIcon from "@/assets/recipe/heart.svg?react";
import rename from "@/assets/recipe/rename.svg";

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
        {/* 변경된 부분: isLiked 상태에 따라 fill(채우기) 색상과 테두리 색상을 동적으로 부여 */}
        <HeartIcon
          className={`h-[18px] w-[18px] fill-current stroke-[#EBEBEB] stroke-[2px] ${isLiked ? "text-[#C3C3C3]" : "text-transparent"}`}
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
          className="typo-body2 border-gray-30 bg-gray-0 mx-2 min-w-0 flex-1 rounded-sm border px-1 outline-none"
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
