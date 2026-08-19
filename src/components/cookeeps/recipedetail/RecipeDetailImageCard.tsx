import defaultRecipeImage from "@/assets/cookeeps/main/default_recipe_image_full.svg";

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
    </div>
  );
}