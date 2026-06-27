import { useEffect, useState } from "react";
import { getWeeklyRanking, RecipeRankItem } from "@api/cookeeps";
import tempImage from "@assets/cookeeps/main/temp_recipe_cookeeps.svg";
import { likeGray } from "@/assets";
// import LikeGray from "@assets/cookeeps/like.svg?react";
import { useNavigate } from "react-router-dom";

export default function WeeklyTopRecipesTab() {
  const [recipes, setRecipes] = useState<RecipeRankItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getWeeklyRanking();
        setRecipes(data.recipeRanking || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const top3 = recipes.slice(0, 3);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-[#32E389] text-white";
    if (rank === 2 || rank === 3) return "bg-black text-white";
    return "bg-gray-200 text-gray-500";
  };

  return (
    <div className="mt-[18px] flex justify-center">
      <div className="flex w-[361px] flex-col">
        {recipes.length === 0 ? (
          // 레시피 없을 때
          <div className="flex h-[200px] items-center justify-center text-[14px] text-[#7D7D7D]">
            아직 등록된 레시피가 없어요
          </div>
        ) : (
          // 레시피 있을 때
          top3.map((item) => (
            <div
              key={item.dailyRecipeId}
              onClick={() =>
                navigate(`/cookeeps/${item.dailyRecipeId}?tab=weekly`)
              }
              className="flex cursor-pointer flex-col gap-[12px] rounded-[6px] p-[10px_8px]"
            >
              {/* 1. 제목 + 좋아요 */}
              <div className="flex items-center gap-[14px]">
                {/* 순위 */}
                <div
                  className={`flex h-[20px] w-[30px] items-center justify-center rounded-full text-[12px] font-semibold ${getRankStyle(item.rank)}`}
                >
                  {item.rank}
                </div>

                {/* 제목 + 좋아요 */}
                <div className="flex flex-1 items-center justify-between">
                  <p className="truncate text-[14px] font-medium text-[#202020]">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-[4px]">
                    <img src={likeGray} className="h-[18px] w-[18px]" />
                    {/* <LikeGray className="w-[18px] h-[18px]" /> */}
                    <span className="text-[12px] text-[#7D7D7D]">
                      {item.likeCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. 이미지 */}
              <div
                className="relative h-[160px] rounded-[6px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.recipeImageUrl || tempImage})`,
                }}
              >
                {/* 유저 뱃지 */}
                <div className="absolute top-2 left-2 flex h-[20px] items-center gap-[4px] rounded-full bg-black/60 px-[12px]">
                  <span className="text-[12px] font-medium text-[#32E389]">
                    {item.nickname}
                  </span>
                  <span className="text-[12px] font-medium text-white">
                    님의 레시피
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
