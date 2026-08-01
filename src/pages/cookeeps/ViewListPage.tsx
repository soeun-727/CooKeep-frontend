import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import {
  MyRecipeListItem,
  getMyBookmarkedRecipes,
  getMyLikedRecipes,
  toggleRecipeBookmark,
  toggleRecipeLike,
} from "@/api/myRecipe";

import RecipeListItem from "@/components/cookeeps/recipe/RecipeListItem";
import ConfirmModal from "@/components/fridge/modals/ConfirmModal";

interface ViewListPageProps {
  type: string;
}

interface OutletContext {
  searchTerm: string;
}

export default function ViewListPage({ type }: ViewListPageProps) {
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext<OutletContext>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [recipes, setRecipes] = useState<MyRecipeListItem[]>([]);
  const [, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const isLiked = type === "좋아요 누른 레시피";

  const fetchData = async (pageNum: number) => {
    if (isLoading || (isLast && pageNum !== 0)) return;
    setIsLoading(true);

    try {
      const data = isLiked
        ? await getMyLikedRecipes(pageNum, 10)
        : await getMyBookmarkedRecipes(pageNum, 10);

      if (data && data.content) {
        setRecipes(prev =>
          pageNum === 0 ? data.content : [...prev, ...data.content],
        );
        setIsLast(data.last);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRecipes([]); // 타입 변경 시 초기화
    setPage(0);
    setIsLast(false);
    fetchData(0);
  }, [type]);

  /** 무한 스크롤 감지 */
  useEffect(() => {
    if (isLoading || isLast) return;
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => {
          const next = prev + 1;
          fetchData(next);
          return next;
        });
      }
    });
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [isLoading, isLast, recipes]);

  const filteredData = recipes.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const selectedItem = recipes.find(item => item.dailyRecipeId === selectedId);

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;

    try {
      if (type === "좋아요 누른 레시피") {
        await toggleRecipeLike(selectedId);
      } else {
        await toggleRecipeBookmark(selectedId);
      }
      setRecipes(prev => prev.filter(r => r.dailyRecipeId !== selectedId));
    } catch {
      alert("처리에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-4 pb-10">
        {filteredData.length > 0
          ? filteredData.map(item => (
              <RecipeListItem
                key={item.dailyRecipeId}
                title={item.title}
                // subtitle={item.nickname} // 백엔드 필드 추가되면 연결
                image={item.recipeImageUrl ?? undefined}
                badge={
                  isLiked
                    ? { type: "like", likes: item.likeCount }
                    : { type: "bookmark" }
                }
                onSelect={() => navigate(`/cookeeps/${item.dailyRecipeId}`)}
                onDelete={() => {
                  setSelectedId(item.dailyRecipeId);
                  setIsModalOpen(true);
                }}
              />
            ))
          : !isLoading && (
              <p className="text-gray-30 typo-body mt-10 text-center">
                {searchTerm ? "검색 결과가 없습니다." : "목록이 비어 있습니다."}
              </p>
            )}
        <div ref={loadMoreRef} className="h-10" />
      </div>

      {isModalOpen && selectedItem && (
        <ConfirmModal
          title={
            isLiked
              ? "좋아요한 레시피에서 삭제하시겠어요?"
              : "저장한 레시피에서 삭제하시겠어요?"
          }
          subtitle={selectedItem.title}
          buttonTexts={["네", "아니오"]}
          buttonVariants={["gray", "black"]}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedId(null);
          }}
        />
      )}
    </>
  );
}
