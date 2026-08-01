// components/cookeeps/lists/ViewListHeader.tsx
import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";
import SearchIcon from "@/assets/fridge/search.svg?react";

import TextField from "@/components/ui/TextField";

interface ViewListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function ViewListHeader({
  searchTerm,
  onSearchChange,
}: ViewListHeaderProps) {
  return (
    <TextField
      value={searchTerm}
      placeholder="레시피를 검색해보세요"
      onChange={onSearchChange}
      rightIcon={
        searchTerm ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ClearIcon className="h-6 w-6 text-gray-50" />
          </button>
        ) : (
          <SearchIcon className="h-6 w-6 text-gray-50" />
        )
      }
    />
  );
}
