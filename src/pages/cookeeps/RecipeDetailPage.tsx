import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  WeeklyRecipeDetailResponse,
  getWeeklyRecipeDetail,
} from "@/api/cookeeps";
import {
  checkRecipeBookmarkStatus,
  checkRecipeLikeStatus,
} from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

import RecipeDetailContentSection from "@/components/cookeeps/recipedetail/RecipeDetailContentSection";
import RecipeDetailImageCard from "@/components/cookeeps/recipedetail/RecipeDetailImageCard";
import RecipeDetailMemo from "@/components/cookeeps/recipedetail/RecipeDetailMemo";
import RecipeDetailUserMeta from "@/components/cookeeps/recipedetail/RecipeDetailUserMeta";
import RecipeDetailYoutube from "@/components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import BackHeader from "@/components/ui/BackHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const records = useCookeepRecordStore(state => state.records);
  const updateRecordLike = useCookeepRecordStore(
    state => state.updateRecordLike,
  );
  const updateRecordBookmark = useCookeepRecordStore(
    state => state.updateRecordBookmark,
  );
  const [recipe, setRecipe] = useState<WeeklyRecipeDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeRecord = records.find(r => String(r.dailyRecipeId) === id);
  const isLiked = storeRecord ? storeRecord.liked : recipe?.liked;
  const isBookmarked = storeRecord
    ? storeRecord.bookmarked
    : recipe?.bookmarked;

  const handleLikeToggle = async () => {
    if (!id || !recipe) return;

    try {
      const updatedData = await updateRecordLike(id);

      if (updatedData) {
        setRecipe(prev =>
          prev
            ? {
                ...prev,
                liked: updatedData.liked,
                likeCount: updatedData.likeCount,
              }
            : null,
        );
      } else {
        setRecipe(prev => {
          if (!prev) return prev;
          const nextLiked = !prev.liked;
          return {
            ...prev,
            liked: nextLiked,
            likeCount: nextLiked ? prev.likeCount + 1 : prev.likeCount - 1,
          };
        });
      }
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!id || !recipe) return;

    try {
      const updatedData = await updateRecordBookmark(id);

      if (updatedData) {
        setRecipe(prev =>
          prev ? { ...prev, bookmarked: updatedData.bookmarked } : null,
        );
      } else {
        setRecipe(prev =>
          prev ? { ...prev, bookmarked: !prev.bookmarked } : null,
        );
      }
    } catch (error) {
      console.error("북마크 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setRecipe(null);

    const fetchFullDetail = async () => {
      try {
        const [detailData, likeStatus, bookmarkStatus] = await Promise.all([
          getWeeklyRecipeDetail(id),
          checkRecipeLikeStatus(Number(id)),
          checkRecipeBookmarkStatus(Number(id)),
        ]);

        setRecipe({
          ...detailData,
          liked: likeStatus.liked,
          likeCount: likeStatus.likeCount,
          bookmarked: bookmarkStatus.bookmarked,
        });
      } catch (error) {
        console.error("데이터 통합 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullDetail();
  }, [id]);

  if (isLoading || !recipe) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0">
        <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
      </div>
      <div className="mx-auto w-full max-w-[450px] px-4">
        <div className="mx-auto flex flex-col pt-[51px]">
          <RecipeDetailUserMeta
            userName={recipe.nickname}
            isLiked={!!isLiked}
            isBookmarked={!!isBookmarked}
            onLike={handleLikeToggle}
            onBookmark={handleBookmarkToggle}
          />

          <div className="flex w-full flex-col items-start gap-4 self-stretch">
            <div className="flex w-full flex-col items-center gap-[10px]">
              <div className="flex w-full flex-col items-start self-stretch">
                <RecipeDetailImageCard
                  images={recipe.recipeImageUrl ? [recipe.recipeImageUrl] : []}
                  title={recipe.title}
                />
              </div>

              <RecipeDetailContentSection
                recipe={{
                  ingredients: {
                    user_ingredients:
                      recipe.content.ingredients.user_ingredients,
                    optional_ingredients:
                      recipe.content.ingredients.optional_ingredients,
                    additional_ingredients:
                      recipe.content.ingredients.additional_ingredients,
                  },
                  steps: recipe.content.steps,
                }}
              />
              {recipe.content.youtubeReferences &&
                recipe.content.youtubeReferences.length > 0 && (
                  <RecipeDetailYoutube
                    videos={recipe.content.youtubeReferences}
                    tags={recipe.content.youtubeSearchQueries ?? []}
                  />
                )}
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col items-center gap-2 pb-25">
            {recipe.description && (
              <RecipeDetailMemo
                userName={recipe.nickname}
                memo={recipe.description}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
