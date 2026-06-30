// src/components/headers/ViewAllHeader.tsx
import { searchIcon } from "@/assets/index";

import TextField from "@/components/ui/TextField";

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
    <div className="flex flex-shrink-0 flex-col items-center">
      {/* 검색창 */}
      <div
        className={`mt-12 !w-[361px] [&_p]:hidden
          [&_input]:border-none [&_input]:focus:outline-none
          [&_input::placeholder]:text-gray-50
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          ${searchTerm ? "[&_input]:bg-gray-0" : "[&_input]:bg-searchbar"}`}
      >
        <TextField
          value={searchTerm}
          placeholder="찾으시는 레시피가 있나요?"
          onChange={(e: any) => {
            const value = e.target ? e.target.value : e;
            onSearchChange(value);
          }}
          rightIcon={<img src={searchIcon} />}
        />
      </div>

      {/* 탭 영역 */}
      <div className="mt-[27px] flex w-[361px] items-center">
        {/* 왼쪽 탭 */}
        <button
          onClick={() => onTabChange("weekly")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-t-[6px] border-b-2 py-2 ${
            activeTab === "weekly"
              ? "border-green-deep text-green-deep"
              : "border-transparent text-gray-50"
          }`}
        >
          <span className="truncate text-[14px] leading-[20px] font-semibold">
            이번 주 인기
          </span>
        </button>

        {/* 오른쪽 탭 */}
        <button
          onClick={() => onTabChange("all")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-t-[6px] border-b-2 py-2 ${
            activeTab === "all"
              ? "border-green-deep text-green-deep"
              : "border-transparent text-gray-50"
          }`}
        >
          <span className="truncate text-[14px] leading-[20px] font-semibold">
            모든 레시피 둘러보기
          </span>
        </button>
      </div>
    </div>
  );
}
