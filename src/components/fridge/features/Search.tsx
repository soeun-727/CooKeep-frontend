import { useIngredientStore } from "@/stores/useIngredientStore";

import { SearchIcon } from "@/assets/index";

import TextField from "@/components/ui/TextField";

//재료 검색
export default function Search() {
  const { searchTerm, setSearchTerm, setViewCategory } = useIngredientStore();
  const handleSearch = (value: string) => {
    setSearchTerm(value);

    // 일단 추가: 검색 시작 시 전체보기 해제
    if (value.trim().length > 0) {
      setViewCategory(null);
    }
  };

  const hasText = searchTerm.trim().length > 0;
  return (
    <TextField
      value={searchTerm}
      type="text"
      placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
      onChange={handleSearch}
      rightIcon={
        <div className="flex items-center justify-center transition-opacity duration-200">
          <SearchIcon
            aria-label="search"
            className={`h-6 w-6 ${hasText ? "text-gray-80 cursor-pointer" : "cursor-default text-gray-50"}`}
          />
        </div>
      }
    />
  );
}
