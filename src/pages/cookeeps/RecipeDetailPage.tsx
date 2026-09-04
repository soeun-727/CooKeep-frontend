import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import LoadingScreen from "@/components/ui/LoadingScreen";
import { RecipeDetailHeader } from "@/components/cookeeps/recipedetail/RecipeDetailHeader";

export default function RecipeDetailPage() {
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

    const prevLiked = recipe.liked;
    const prevCount = recipe.likeCount;

    setRecipe(prev =>
      prev
        ? {
            ...prev,
            liked: !prev.liked,
            likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
          }
        : prev,
    );

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
            : prev,
        );
      }
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      setRecipe(prev =>
        prev ? { ...prev, liked: prevLiked, likeCount: prevCount } : prev,
      );
    }
  };

  const handleBookmarkToggle = async () => {
    if (!id || !recipe) return;

    const prevBookmarked = recipe.bookmarked;

    setRecipe(prev =>
      prev ? { ...prev, bookmarked: !prev.bookmarked } : prev,
    );

    try {
      const updatedData = await updateRecordBookmark(id);

      if (updatedData) {
        setRecipe(prev =>
          prev ? { ...prev, bookmarked: updatedData.bookmarked } : prev,
        );
      }
    } catch (error) {
      console.error("북마크 업데이트 실패:", error);
      setRecipe(prev =>
        prev ? { ...prev, bookmarked: prevBookmarked } : prev,
      );
      alert("본인의 레시피는 북마크할 수 없습니다.");
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
    <div className="flex min-h-screen w-full flex-col items-center gap-3 px-4">
      <div className="sticky top-0 w-full">
        <RecipeDetailHeader
          title="레시피 보기"
          isLiked={!!isLiked}
          isBookmarked={!!isBookmarked}
          onLike={handleLikeToggle}
          onBookmark={handleBookmarkToggle}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3 pb-25">
        <RecipeDetailImageCard
          images={recipe.recipeImageUrl ? [recipe.recipeImageUrl] : []}
        />

        <div className="flex w-full flex-col items-start gap-6">
          <RecipeDetailUserMeta
            userName={recipe.nickname}
            category={recipe.category}
            title={recipe.title}
            usedItems={recipe.content.ingredients.user_ingredients.length}
          />

          <div className="flex w-full flex-col items-start gap-3">
            {recipe.description && (
              <RecipeDetailMemo memo={recipe.description} />
            )}

            <RecipeDetailContentSection
              recipe={{
                ingredients: {
                  user_ingredients: recipe.content.ingredients.user_ingredients,
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
      </div>
    </div>
  );
}
