// src/components/headers/ViewAllHeader.tsx

import { searchIcon } from "../../../assets";
import TextField from "../../ui/TextField";

interface Props {
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
}: Props) {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      {/* 검색창 */}
      <div
        className={`mt-12 !w-[361px] [&_p]:hidden
          [&_input]:border-none [&_input]:focus:outline-none
          [&_input::placeholder]:text-zinc-500
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          ${searchTerm ? "[&_input]:bg-white" : "[&_input]:bg-[#EBEDF1]"}`}
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
      <div className="w-[361px] flex items-center mt-[27px]">
        {/* 왼쪽 탭 */}
        <button
          onClick={() => onTabChange("weekly")}
          className={`flex-1 flex justify-center items-center py-2 gap-2 border-b-2 rounded-t-[6px] ${
            activeTab === "weekly"
              ? "border-[#1FC16F] text-[#1FC16F]"
              : "border-transparent text-[#7D7D7D]"
          }`}
        >
          <span className="text-[14px] font-semibold leading-[20px] truncate">
            이번 주 인기
          </span>
        </button>

        {/* 오른쪽 탭 */}
        <button
          onClick={() => onTabChange("all")}
          className={`flex-1 flex justify-center items-center py-2 gap-2 border-b-2 rounded-t-[6px] ${
            activeTab === "all"
              ? "border-[#1FC16F] text-[#1FC16F]"
              : "border-transparent text-[#7D7D7D]"
          }`}
        >
          <span className="text-[14px] font-semibold leading-[20px] truncate">
            모든 레시피 둘러보기
          </span>
        </button>
      </div>
    </div>
  );
}
