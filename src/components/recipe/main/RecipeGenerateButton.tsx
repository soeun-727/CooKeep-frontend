import ArrowIcon from "@/assets/cookeeps/arrow.svg?react";

interface RecipeGenerateButtonProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

export default function RecipeGenerateButton({
  image,
  title,
  description,
  onClick,
}: RecipeGenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-L border-gray-10 flex w-full items-center gap-3 border px-3 py-4"
    >
      <div className="h-25 w-25">
        <img src={image} alt="image" className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-1 text-start">
        <div className="typo-l-strong text-gray-80">{title}</div>
        <div className="typo-m whitespace-pre-wrap text-gray-50">
          {description}
        </div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center">
        <ArrowIcon className="text-gray-30 w-2" />
      </div>
    </button>
  );
}
