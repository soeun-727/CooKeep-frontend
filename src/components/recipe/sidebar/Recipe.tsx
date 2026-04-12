import React, { useState, useRef, useEffect } from "react";
import liked from "../../../assets/recipe/liked.svg";
import unliked from "../../../assets/recipe/unliked.svg";
import rename from "../../../assets/recipe/rename.svg";
import deleteIcon from "../../../assets/recipe/delete.svg";

interface RecipeProps {
  isLiked: boolean;
  name: string;
  searchTerm?: string;
  onLike?: () => void;
  onRename?: (newName: string) => void;
  onDelete?: () => void;
  onSelect?: () => void;
}

const Recipe: React.FC<RecipeProps> = ({
  isLiked = false,
  name,
  searchTerm = "",
  onLike,
  onRename,
  onDelete,
  onSelect,
}) => {
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
        <span key={i} className="text-[var(--color-green-deep)] font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="flex w-[277px] h-[34px] items-center justify-between mx-auto">
      <button onClick={onLike} className="px-2 flex-shrink-0">
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
          className="flex-1 min-w-0 mx-2 px-1 typo-body2 border border-stone-300 outline-none bg-white rounded-sm"
        />
      ) : (
        <button onClick={onSelect} className="flex-1 min-w-0">
          <span className="typo-body2 text-left block truncate px-2">
            {highlightText(name, searchTerm)}
          </span>
        </button>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="px-[10px] flex-shrink-0"
      >
        <img src={rename} alt="rename" className="w-[14px]" />
      </button>

      <button onClick={onDelete} className="px-[10px] flex-shrink-0">
        <img src={deleteIcon} alt="delete" className="w-[14px]" />
      </button>
    </div>
  );
};

export default Recipe;
