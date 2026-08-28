import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeRankItem, getWeeklyRanking } from "@/api/cookeeps";
import LikeIcon from "@/assets/cookeeps/like.svg?react";
import defaultRecipeImage from "@/assets/cookeeps/main/default_recipe_image.svg";

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

  if (recipes.length === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className="typo-m text-gray-50">아직 등록된 레시피가 없어요</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-3">
      {top3.map(item => (
        <div
          key={item.dailyRecipeId}
          onClick={() => navigate(`/cookeeps/${item.dailyRecipeId}?tab=weekly`)}
          className="border-gray-10 bg-gray-0 flex h-[132px] cursor-pointer items-end gap-4 self-stretch rounded-2xl border px-3 py-4"
        >
          {/* 이미지 */}
          <img
            src={item.recipeImageUrl || defaultRecipeImage}
            alt={item.title}
            className="h-[100px] w-[100px] flex-shrink-0 rounded-lg object-cover"
          />

          {/* 내용 */}
          <div className="flex flex-1 flex-col items-end self-stretch">
            <div className="flex flex-1 flex-col items-start justify-between self-stretch py-1">
              <div className="flex flex-col items-start gap-0.5 self-stretch">
                <p className="typo-l-strong text-gray-80 line-clamp-1">
                  {item.title}
                </p>
                {/* TODO: 백엔드 수정 후 추가예정 */}
                {/* {item.memo && (
                  <p className="typo-m line-clamp-2 self-stretch text-gray-50">
                    {item.memo}
                  </p>
                )} */}
              </div>

              <div className="flex items-center justify-end gap-2 self-stretch">
                <span className="typo-m line-clamp-1 text-gray-50">
                  {item.nickname}
                </span>
                <div className="flex items-center">
                  <LikeIcon className="text-gray-30 h-5 w-5 fill-current" />
                  <span className="typo-m text-green line-clamp-1">
                    · {item.likeCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
