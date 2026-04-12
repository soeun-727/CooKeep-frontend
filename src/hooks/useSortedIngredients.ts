import { useMemo } from "react";
import { useIngredientStore } from "../stores/useIngredientStore";

export function useSortedIngredients() {
  const { ingredients, searchTerm, viewCategory, sortOrder } =
    useIngredientStore();

  // 1. 검색어 필터링 (검색 결과 뷰에서 사용)
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [ingredients, searchTerm]);

  // 2. 카테고리 필터 및 정렬 (카테고리 상세 뷰에서 사용)
  const sortedIngredients = useMemo(() => {
    // 검색 필터가 적용된 상태에서 카테고리 필터링
    const categoryFiltered =
      viewCategory === null
        ? filteredIngredients
        : filteredIngredients.filter((item) => item.category === viewCategory);

    // 정렬 로직 적용
    return [...categoryFiltered].sort((a, b) => {
      if (sortOrder === "유통기한 임박 순") {
        return a.dDay - b.dDay;
      }
      if (sortOrder === "등록 오래된 순") {
        return a.id - b.id;
      }
      // 기본값: 등록 최신 순
      return b.id - a.id;
    });
  }, [filteredIngredients, viewCategory, sortOrder]);

  return { filteredIngredients, sortedIngredients };
}
