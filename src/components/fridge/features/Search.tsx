import { useIngredientStore } from "@/stores/useIngredientStore";

import { SearchIcon } from "@/assets/index";

import TextField from "@/components/ui/TextField";
import { memo, useCallback, useMemo } from "react";

//재료 검색
export default memo(function Search() {
  const { searchTerm, setSearchTerm, setViewCategory } = useIngredientStore();
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      if (value.trim().length > 0) {
        setViewCategory(null);
      }
    },
    [setSearchTerm, setViewCategory],
  );

  const hasText = searchTerm.trim().length > 0;

  const rightIcon = useMemo(
    () => (
      <div className="flex items-center justify-center transition-opacity duration-200">
        <SearchIcon
          aria-label="search"
          className={`h-6 w-6 ${hasText ? "text-gray-80 cursor-pointer" : "cursor-default text-gray-50"}`}
        />
      </div>
    ),
    [hasText],
  );

  return (
    <div className="w-full pt-1 pb-[26px]">
      <div className="mx-auto w-[361px] transition-all duration-200">
        <div
          className={`shadow-search relative w-full overflow-hidden rounded-[6px] [&_input]:w-full [&_input]:border-none [&_input]:outline-none [&_input::placeholder]:text-gray-50 [&_p]:hidden ${hasText ? "[&_input]: bg-gray-0" : "[&_input]:bg-searchbar"} `}
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            onChange={handleSearch}
            rightIcon={rightIcon}
          />
        </div>
      </div>
    </div>
  );
});
