import { useEffect, useState } from "react";
import { getWeeklyRanking, RecipeRankItem } from "../../../api/cookeeps";
import tempImage from "../../../assets/cookeeps/main/temp_recipe_cookeeps.svg";
import { likeGray } from "../../../assets";
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

  const top3 = Array.from({ length: 3 }, (_, i) => {
    return (
      recipes[i] || {
        dailyRecipeId: i,
        rank: i + 1,
        title: "레시피가 없습니다",
        likeCount: 0,
        recipeImageUrl: tempImage,
        nickname: "",
      }
    );
  });

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-[#32E389] text-white";
    if (rank === 2 || rank === 3) return "bg-black text-white";
    return "bg-gray-200 text-gray-500";
  };

  return (
    <div className="mt-[18px] flex justify-center">
      <div className="w-[361px] flex flex-col  ">
        {top3.map((item) => (
          <div
            key={item.dailyRecipeId}
            onClick={() =>
              navigate(`/cookeeps/${item.dailyRecipeId}?tab=weekly`)
            }
            className="flex flex-col gap-[12px] p-[10px_8px] rounded-[6px] cursor-pointer"
          >
            {/* 1. 제목 + 좋아요 */}
            <div className="flex items-center gap-[14px]">
              {/* 순위 */}
              <div
                className={`w-[30px] h-[20px] flex items-center justify-center rounded-full text-[12px] font-semibold ${getRankStyle(item.rank)}`}
              >
                {item.rank}
              </div>

              {/* 제목 + 좋아요 */}
              <div className="flex justify-between items-center flex-1">
                <p className="truncate text-[14px] text-[#202020] font-medium">
                  {item.title}
                </p>

                <div className="flex items-center gap-[4px]">
                  <img src={likeGray} className="w-[18px] h-[18px]" />
                  <span className="text-[12px] text-[#7D7D7D]">
                    {item.likeCount}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. 이미지 */}
            <div
              className="h-[160px] rounded-[6px] bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.4) 0%, rgba(17,17,17,0) 24%), url(${item.recipeImageUrl || tempImage})`,
              }}
            >
              {/* 유저 뱃지 */}
              <div className="absolute top-2 left-2 flex items-center h-[20px] px-[12px] rounded-full bg-black/60">
                <span className="text-[#32E389] text-[12px] font-medium">
                  {item.nickname}
                </span>
                <span className="text-white text-[12px] font-medium">
                  님의 레시피
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
