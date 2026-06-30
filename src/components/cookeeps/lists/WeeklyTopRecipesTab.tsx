import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeRankItem, getWeeklyRanking } from "@/api/cookeeps";
import { likeGray } from "@/assets";

import tempImage from "@/assets/cookeeps/main/temp_recipe_cookeeps.svg";

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
    if (rank === 1) return "bg-green text-gray-0";
    if (rank === 2 || rank === 3) return "bg-gray-80 text-gray-0";
    return "bg-gray-200 text-gray-500";
  };

  return (
    <div className="mt-[18px] flex justify-center">
      <div className="flex w-[361px] flex-col">
        {recipes.length === 0 ? (
          // 레시피 없을 때
          <div className="h-[200px] flex items-center justify-center text-[14px] text-gray-50">
            아직 등록된 레시피가 없어요
          </div>
        ) : (
          // 레시피 있을 때
          top3.map(item => (
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
                <div className="flex justify-between items-center flex-1">
                  <p className="truncate text-[14px] text-gray-80 font-medium">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-[4px]">
                    <img src={likeGray} className="w-[18px] h-[18px]" />
                    <span className="text-[12px] text-gray-50">
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
                <div className="absolute top-2 left-2 flex items-center h-[20px] gap-[4px]  px-[12px] rounded-full bg-gray-80">
                  <span className="text-green text-[12px] font-medium">
                    {item.nickname}
                  </span>
                  <span className="text-gray-0 text-[12px] font-medium ">
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
