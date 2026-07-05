import { bookmark, like, SearchIcon } from "@/assets/index";

import TextField from "@/components/ui/TextField";

interface ViewListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  type: string;
  description: string;
}

export default function ViewListHeader({
  searchTerm,
  onSearchChange,
  type,
  description,
}: ViewListHeaderProps) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center">
      {/* 검색창 */}
      <div
        className={`mt-12 !w-[361px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] [&_input]:border-none [&_input]:focus:outline-none [&_input::placeholder]:text-gray-50 [&_p]:hidden ${searchTerm ? "[&_input]:bg-gray-0" : "[&_input]:bg-searchbar"}`}
      >
        <TextField
          value={searchTerm}
          placeholder="찾으시는 레시피가 있나요?"
          onChange={(e: any) => {
            const value = e.target ? e.target.value : e;
            onSearchChange(value);
          }}
          rightIcon={<SearchIcon className="h-6 w-6 text-gray-50" />}
        />
      </div>

      {/* 제목 */}
      <div className="bg-gray-80 mt-[29px] flex h-8 w-[137px] items-center justify-center gap-1 rounded-[6px] px-2 py-[2px]">
        <img
          src={type === "좋아요 누른 레시피" ? like : bookmark}
          className="w-[18px]"
        />
        <span className="typo-caption text-gray-0">{type}</span>
      </div>

      {/* 설명 */}
      <span className="typo-caption mt-[6px] text-gray-50">{description}</span>
    </div>
  );
}
