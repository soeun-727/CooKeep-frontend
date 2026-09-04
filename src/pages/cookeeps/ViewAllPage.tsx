import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { AllRecipeItem, getAllRecipes } from "@/api/cookeeps";

import SortAll from "@/components/cookeeps/lists/SortAll";
import WeeklyTopRecipesTab from "@/components/cookeeps/lists/WeeklyTopRecipesTab";
import RecipeListItem from "@/components/cookeeps/recipe/RecipeListItem";

export default function ViewAllPage() {
  const navigate = useNavigate();

  const { searchTerm, sortOrder, setSortOrder, activeTab } = useOutletContext<{
    searchTerm: string;
    sortOrder: string;
    setSortOrder: (order: string) => void;
    activeTab: "weekly" | "all";
  }>();

  const [recipes, setRecipes] = useState<AllRecipeItem[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  // 2. 정렬 매핑 함수
  const getApiFilter = (order: string) => {
    if (order === "좋아요 순") return "likes";
    if (order === "최신 순") return "latest";
    if (order === "오래된 순") return "oldest";
    return "likes";
  };

  // 3. 데이터 페칭 함수
  const fetchRecipes = useCallback(
    async (currentPage: number, isNewFilter: boolean) => {
      // 로딩 중이거나 이미 마지막 페이지인데 추가 로드를 하려는 경우 차단
      if (isLoading || (currentPage > 0 && isLast)) return;

      setIsLoading(true);
      try {
        const apiFilter = getApiFilter(sortOrder);
        const data = await getAllRecipes(apiFilter, currentPage);

        setRecipes(prev =>
          isNewFilter ? data.content : [...prev, ...data.content],
        );
        setIsLast(data.last);
      } catch (error) {
        console.error("레시피 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [sortOrder, isLoading, isLast],
  );

  // 4. 정렬 순서 변경 감지
  useEffect(() => {
    setPage(0);
    setIsLast(false);
    setRecipes([]); //추가
    fetchRecipes(0, true);
  }, [sortOrder]);

  // 5. 페이지 번호 변경 감지
  useEffect(() => {
    if (page > 0) {
      fetchRecipes(page, false);
    }
  }, [page]);

  // 6. 무한 스크롤 관찰
  useEffect(() => {
    if (!observerTarget.current || isLast || isLoading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLast && !isLoading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [isLast, isLoading]);

  // 7. 검색어 필터링
  const filteredData = recipes.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (activeTab === "weekly") {
    return <WeeklyTopRecipesTab />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 pb-10">
      {/* TODO: navbar 바뀌면 다시 수정해야할 수도? */}
      <div className="fixed bottom-[calc(74px+env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 justify-center">
        <SortAll currentOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      {filteredData.length > 0 ? (
        <div className="flex w-full flex-col items-center gap-4 pt-1.5 pl-[5px]">
          {filteredData.map((item, index) => (
            <RecipeListItem
              key={item.dailyRecipeId}
              rank={index + 1}
              title={item.title}
              subtitle={item.nickname}
              image={item.recipeImageUrl ?? undefined}
              badge={{ type: "like", likes: item.likeCount }}
              onSelect={() =>
                navigate(`/cookeeps/${item.dailyRecipeId}?tab=${activeTab}`)
              }
            />
          ))}

          {/* 무한 스크롤 트리거 */}
          <div
            ref={observerTarget}
            className="flex h-10 w-full items-center justify-center"
          >
            {isLoading && (
              <div className="border-semantic-positive h-5 w-5 animate-spin rounded-full border-b-2" />
            )}
          </div>
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-30 typo-l mt-10 text-center">
            검색 결과가 없습니다.
          </p>
        )
      )}
    </div>
  );
}
