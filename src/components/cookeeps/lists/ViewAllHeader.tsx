import ThumbsUpIcon from "@/assets/cookeeps/thumbs_up_icon.svg?react";
import RecipeBookIcon from "@/assets/cookeeps/recipe_book_icon.svg?react";

import RecipeSearchField from "../recipe/RecipeSearchField";

interface ViewAllHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: "weekly" | "all";
  onTabChange: (tab: "weekly" | "all") => void;
}

export default function ViewAllHeader({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
}: ViewAllHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-6">
      <RecipeSearchField value={searchTerm} onChange={onSearchChange} />

      {/* 탭 영역 */}
      <div className="border-gray-10 flex items-center justify-center self-stretch border-b">
        <button
          onClick={() => onTabChange("weekly")}
          className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 ${
            activeTab === "weekly" ? "border-green border-b-2" : ""
          }`}
        >
          <ThumbsUpIcon
            className={`h-5 w-5 ${
              activeTab === "weekly" ? "text-gray-80" : "text-gray-30"
            }`}
          />
          <span
            className={`typo-m-strong line-clamp-1 ${
              activeTab === "weekly" ? "text-gray-80" : "text-gray-30"
            }`}
          >
            이번 주 인기
          </span>
        </button>

        <button
          onClick={() => onTabChange("all")}
          className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 ${
            activeTab === "all" ? "border-green border-b-2" : ""
          }`}
        >
          <RecipeBookIcon
            className={`h-5 w-5 ${
              activeTab === "all" ? "text-gray-80" : "text-gray-30"
            }`}
          />
          <span
            className={`typo-m-strong line-clamp-1 ${
              activeTab === "all" ? "text-gray-80" : "text-gray-30"
            }`}
          >
            모든 레시피 둘러보기
          </span>
        </button>
      </div>
    </div>
  );
}
