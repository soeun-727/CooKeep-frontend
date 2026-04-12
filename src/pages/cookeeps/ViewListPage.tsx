import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ListItem from "../../components/cookeeps/lists/ListItem";
import DoublecheckModal from "../../components/ui/DoublecheckModal";
import {
  getMyLikedRecipes,
  getMyBookmarkedRecipes,
  MyRecipeListItem,
  toggleRecipeBookmark,
  toggleRecipeLike,
} from "../../api/myRecipe";
import temp from "../../assets/cookeeps/main/temp_recipe_cookeeps.svg";

interface Props {
  type: string;
}

interface OutletContext {
  searchTerm: string;
}

export default function ViewListPage({ type }: Props) {
  const { searchTerm } = useOutletContext<OutletContext>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [recipes, setRecipes] = useState<MyRecipeListItem[]>([]);
  const [, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (pageNum: number) => {
    if (isLoading || (isLast && pageNum !== 0)) return;
    setIsLoading(true);

    try {
      let data;
      if (type === "좋아요 누른 레시피") {
        data = await getMyLikedRecipes(pageNum, 10);
      } else {
        data = await getMyBookmarkedRecipes(pageNum, 10);
      }

      if (data && data.content) {
        setRecipes((prev) =>
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
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => {
          const next = prev + 1;
          fetchData(next);
          return next;
        });
      }
    });
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [isLoading, isLast, recipes]);

  const filteredData = recipes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const selectedItem = recipes.find(
    (item) => item.dailyRecipeId === selectedId,
  );

  const handleConfirmDelete = async () => {
    if (selectedId === null) return;

    try {
      if (type === "좋아요 누른 레시피") {
        await toggleRecipeLike(selectedId);
      } else {
        await toggleRecipeBookmark(selectedId);
      }
      setRecipes((prev) => prev.filter((r) => r.dailyRecipeId !== selectedId));
    } catch (error) {
      alert("처리에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="w-[361px] mx-auto mt-[18px] pb-10 flex flex-col items-center">
        {filteredData.length > 0
          ? filteredData.map((item) => (
              <ListItem
                key={item.dailyRecipeId}
                type={type}
                img={item.recipeImageUrl || temp}
                title={item.title}
                likes={item.likeCount}
                isSelected={selectedId === item.dailyRecipeId}
                onSelect={() => setSelectedId(item.dailyRecipeId)}
                onIconClick={() => {
                  setSelectedId(item.dailyRecipeId);
                  setIsModalOpen(true);
                }}
              />
            ))
          : !isLoading && (
              <p className="mt-10 text-zinc-400 typo-body text-center">
                {searchTerm ? "검색 결과가 없습니다." : "목록이 비어 있습니다."}
              </p>
            )}
        <div ref={loadMoreRef} className="h-10" />
      </div>

      {isModalOpen && (
        <DoublecheckModal
          title={selectedItem ? selectedItem.title : ""}
          description={
            type === "좋아요 누른 레시피"
              ? "좋아요를 취소하시겠어요?"
              : "북마크 목록에서 삭제할까요?"
          }
          onClose={() => {
            setIsModalOpen(false);
            setSelectedId(null);
          }}
          onConfirm={handleConfirmDelete}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}
