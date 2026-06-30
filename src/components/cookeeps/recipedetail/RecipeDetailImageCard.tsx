import tempRecipeImage from "@/assets/cookeeps/main/temp_recipe_cookeeps.svg";
import tempIcon from "@/assets/recipe/main/temp_recipe_title.svg";

interface RecipeDetailImageCardProps {
  images?: string[];
  title: string;
}

export default function RecipeDetailImageCard({
  images,
  title,
}: RecipeDetailImageCardProps) {
  const imageSrc = images && images.length > 0 ? images[0] : tempRecipeImage;

  return (
    <div className="mx-auto flex w-full max-w-[450px] flex-col items-start">
      {/* 이미지 영역 */}
      <div className="h-[153px] w-full overflow-hidden rounded-t-[6px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
        <img
          src={imageSrc}
          alt="레시피 이미지"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 제목 영역 */}
      <div className="flex w-full items-center justify-center self-stretch rounded-b-[6px] bg-white px-3 py-[12px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
        <div className="flex w-full items-center gap-2 px-2">
          {/* 아이콘 */}
          <img
            src={tempIcon}
            alt="레시피 아이콘"
            className="aspect-square h-[36px] w-[36px] flex-shrink-0"
          />

          {/* 제목 */}
          <h2 className="flex-1 text-[18px] leading-[26px] font-semibold text-[#202020]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
