// src/components/headers/ViewListHeader.tsx
import { searchIcon, like, bookmark } from "../../../assets";
import TextField from "../../ui/TextField";

interface Props {
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

      {/* 제목 */}
      <div className="w-[137px] h-8 rounded-[6px] py-[2px] px-2 flex gap-1 bg-black items-center justify-center mt-[29px]">
        <img
          src={type === "좋아요 누른 레시피" ? like : bookmark}
          className="w-[18px]"
        />
        <span className="typo-caption text-white">{type}</span>
      </div>

      {/* 설명 */}
      <span className="typo-caption text-zinc-500 mt-[6px]">{description}</span>
    </div>
  );
}
