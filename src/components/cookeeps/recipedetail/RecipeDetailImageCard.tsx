import tempRecipeImage from "../../../assets/cookeeps/main/temp_recipe_cookeeps.svg";
import tempIcon from "../../../assets/recipe/main/temp_recipe_title.svg";

interface Props {
  images?: string[];
  title: string;
}

export default function RecipeDetailImageCard({ images, title }: Props) {
  const imageSrc = images && images.length > 0 ? images[0] : tempRecipeImage;

  return (
    <div className="flex flex-col items-start w-full max-w-[450px] mx-auto">
      {/* 이미지 영역 */}
      <div
        className="
    w-full
    h-[153px]
    rounded-t-[6px]
    overflow-hidden
    shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
  "
      >
        <img
          src={imageSrc}
          alt="레시피 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 제목 영역 */}
      <div
        className="
          flex justify-center items-center self-stretch
          w-full
          bg-white
          rounded-b-[6px]
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          px-3 py-[12px]
        "
      >
        <div className="flex w-full items-center gap-2 px-2">
          {/* 아이콘 */}
          <img
            src={tempIcon}
            alt="레시피 아이콘"
            className="w-[36px] h-[36px] flex-shrink-0 aspect-square"
          />

          {/* 제목 */}
          <h2
            className="
              flex-1
              text-[#202020]
              text-[18px]
              font-semibold
              leading-[26px]
            "
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
