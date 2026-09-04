import { useIngredientStore } from "@/stores/useIngredientStore";

import BackIcon from "@/assets/back.svg?react";
import LikeVector from "@/assets/cookeeps/like_vector.svg?react";
import BookmarkVector from "@/assets/cookeeps/bookmark_vector.svg?react";

interface RecipeDetailHeaderProps {
  title: string;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onBack?: () => void;
}

export const RecipeDetailHeader = ({
  title,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onBack,
}: RecipeDetailHeaderProps) => {
  const { viewCategory, setViewCategory } = useIngredientStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (viewCategory) {
      setViewCategory("");
    } else {
      window.history.back();
    }
  };

  return (
    <section className="bg-background flex h-10 w-full flex-shrink-0 items-center justify-between py-2">
      <button
        type="button"
        onClick={handleBack}
        className="flex h-10 w-10 items-center justify-start"
      >
        <BackIcon className="h-5 w-5" />
      </button>

      <p className="typo-l-strong pointer-events-none absolute inset-x-0 text-center">
        {title}
      </p>

      <div className="flex items-center">
        <button
          onClick={onLike}
          className="flex aspect-square h-10 w-10 items-center justify-end"
        >
          <LikeVector
            className={`text-gray-30 h-[21px] w-6 stroke-2 ${
              isLiked ? "fill-gray-30" : "fill-none"
            }`}
          />
        </button>

        <button
          onClick={onBookmark}
          className="flex aspect-square h-10 w-10 items-center justify-end"
        >
          <BookmarkVector
            className={`text-gray-30 h-[21px] w-[22px] stroke-2 ${
              isBookmarked ? "fill-gray-30" : "fill-none"
            }`}
          />
        </button>
      </div>
    </section>
  );
};
