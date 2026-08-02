import { useState } from "react";

import ArrowIcon from "@/assets/icons/arrow_right.svg?react";

interface RecipeGenerateButtonProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function RecipeGenerateButton({
  image,
  title,
  description,
  onClick,
  disabled = false,
}: RecipeGenerateButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
      setIsClicked(false);
    }, 250);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`bg-gray-0 rounded-L flex w-full items-center gap-3 border px-3 py-4 ${isClicked ? "bg-green-light border-green-deep" : "border-gray-10"}`}
    >
      <div className="h-25 w-25">
        <img src={image} alt="image" className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-1 text-start">
        <div
          className={`typo-l-strong ${isClicked ? "text-green-deep" : "text-gray-80"}`}
        >
          {title}
        </div>
        <div className="typo-m whitespace-pre-wrap text-gray-50">
          {description}
        </div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center">
        <ArrowIcon
          className={`w-2 ${isClicked ? "text-green-deep" : "text-gray-30"}`}
        />
      </div>
    </button>
  );
}
