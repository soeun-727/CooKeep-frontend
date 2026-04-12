import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import RecipeDetailUserMeta from "../../components/cookeeps/recipedetail/RecipeDetailUserMeta";
import RecipeDetailImageCard from "../../components/cookeeps/recipedetail/RecipeDetailImageCard";
import RecipeDetailContentSection from "../../components/cookeeps/recipedetail/RecipeDetailContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import RecipeDetailMemo from "../../components/cookeeps/recipedetail/RecipeDetailMemo";
import { useEffect, useState } from "react";
import {
  getWeeklyRecipeDetail,
  WeeklyRecipeDetailResponse,
} from "../../api/cookeeps";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import {
  checkRecipeBookmarkStatus,
  checkRecipeLikeStatus,
} from "../../api/myRecipe";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const records = useCookeepRecordStore((state) => state.records);
  const updateRecordLike = useCookeepRecordStore(
    (state) => state.updateRecordLike,
  );
  const updateRecordBookmark = useCookeepRecordStore(
    (state) => state.updateRecordBookmark,
  );
  const [recipe, setRecipe] = useState<WeeklyRecipeDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeRecord = records.find((r) => String(r.dailyRecipeId) === id);
  // 화면에 보여줄 데이터 (스토어에 있으면 스토어꺼, 없으면 서버에서 받아온 상세 데이터 사용)
  const isLiked = storeRecord ? storeRecord.liked : recipe?.liked;
  const isBookmarked = storeRecord
    ? storeRecord.bookmarked
    : recipe?.bookmarked;

  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    if (!id || !recipe) return;

    try {
      // 1. 스토어 업데이트 및 서버 데이터 받아오기
      const updatedData = await updateRecordLike(id);

      // 2. ✅ 로컬 상태를 서버에서 준 정확한 값으로 업데이트
      // 만약 updatedData가 없으면(스토어 로직상) 기존처럼 반전 처리
      if (updatedData) {
        setRecipe((prev) =>
          prev
            ? {
                ...prev,
                liked: updatedData.liked,
                likeCount: updatedData.likeCount,
              }
            : null,
        );
      } else {
        // 스토어에 records가 없는 경우(상세페이지 직접 진입 등) 대비한 fallback
        setRecipe((prev) => {
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

  // 북마크 토글 핸들러
  const handleBookmarkToggle = async () => {
    if (!id || !recipe) return;

    try {
      // 1. 스토어 업데이트 및 서버 데이터 받아오기
      const updatedData = await updateRecordBookmark(id);

      // 2. ✅ 로컬 상태 동기화
      if (updatedData) {
        setRecipe((prev) =>
          prev ? { ...prev, bookmarked: updatedData.bookmarked } : null,
        );
      } else {
        setRecipe((prev) =>
          prev ? { ...prev, bookmarked: !prev.bookmarked } : null,
        );
      }
    } catch (error) {
      console.error("북마크 업데이트 실패:", error);
    }
  };

  // RecipeDetailPage.tsx 수정 로직

  useEffect(() => {
    if (!id) return;

    const fetchFullDetail = async () => {
      try {
        setIsLoading(true);

        // 1. 세 가지 API를 동시에 호출하여 시간을 단축합니다.
        const [detailData, likeStatus, bookmarkStatus] = await Promise.all([
          getWeeklyRecipeDetail(id),
          checkRecipeLikeStatus(Number(id)),
          checkRecipeBookmarkStatus(Number(id)),
        ]);

        // 2. 서버에서 받은 상세 데이터에 실시간 상태값들을 합칩니다.
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

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  if (!recipe)
    return (
      <div className="min-h-screen flex items-center justify-center">
        레시피를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0">
        <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
      </div>
      <div className="mx-auto w-full max-w-[450px] px-4">
        {/* 헤더 */}

        <div className="flex flex-col mx-auto pt-[51px]">
          {/* 유저 메타 */}
          <RecipeDetailUserMeta
            userName={recipe.nickname}
            isLiked={!!isLiked}
            isBookmarked={!!isBookmarked} // 👈 이제 이 값이 변하면서 자식을 다시 그립니다.
            onLike={handleLikeToggle}
            onBookmark={handleBookmarkToggle}
          />

          {/* 메인 콘텐츠 */}
          <div className="flex flex-col items-start gap-4 self-stretch w-full">
            <div className="flex flex-col items-center gap-[10px] w-full">
              <div className="flex flex-col items-start self-stretch w-full">
                <RecipeDetailImageCard
                  images={recipe.recipeImageUrl ? [recipe.recipeImageUrl] : []}
                  title={recipe.title}
                />
              </div>

              {/* 레시피 내용 섹션 */}
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

          {/* 메모 */}
          <div className="flex flex-col items-center gap-2 w-full mt-4 pb-25">
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
