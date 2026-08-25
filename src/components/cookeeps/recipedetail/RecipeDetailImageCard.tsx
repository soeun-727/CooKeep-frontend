<<<<<<< HEAD
import defaultRecipeImage from "@/assets/cookeeps/main/default_recipe_image_full.svg";
=======
import tempRecipeImage from "@/assets/cookeeps/main/temp_recipe_cookeeps.svg";
import TempIcon from "@/assets/recipe/main/temp_recipe_title.svg?react";
>>>>>>> develop

interface RecipeDetailImageCardProps {
  images?: string[];
}

export default function RecipeDetailImageCard({
  images,
}: RecipeDetailImageCardProps) {
  const imageSrc = images && images.length > 0 ? images[0] : defaultRecipeImage;

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      {/* 이미지 영역 */}
      <div className="shadow-search h-[120px] w-[160px] overflow-hidden rounded-[8px]">
        <img
          src={imageSrc}
          alt="레시피 이미지"
          className="h-full w-full object-cover"
        />
      </div>
<<<<<<< HEAD
=======

      {/* 제목 영역 */}
      <div className="bg-gray-0 shadow-search flex w-full items-center justify-center self-stretch rounded-b-[6px] px-3 py-[12px]">
        <div className="flex w-full items-center gap-2 px-2">
          {/* 아이콘 */}
          <TempIcon
            aria-label="레시피 아이콘"
            role="img"
            className="aspect-square h-[36px] w-[36px] flex-shrink-0"
          />

          {/* 제목 */}
          <h2 className="text-gray-80 flex-1 text-[18px] leading-[26px] font-semibold">
            {title}
          </h2>
        </div>
      </div>
>>>>>>> develop
    </div>
  );
}