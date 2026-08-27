import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";
import SearchIcon from "@/assets/fridge/search.svg?react";

import TextField from "@/components/ui/TextField";

interface RecipeSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipeSearchField({
  value,
  onChange,
}: RecipeSearchFieldProps) {
  return (
    <TextField
      value={value}
      placeholder="레시피를 검색해보세요"
      onChange={onChange}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={() => onChange("")}
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
