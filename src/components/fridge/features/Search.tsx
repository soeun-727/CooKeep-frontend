import { SearchIcon } from "@/assets/index";
import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";

import TextField from "@/components/ui/TextField";

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  bgColor?: string;
  rounded?: string;
}
export const Search = ({
  placeholder,
  value,
  onChange,
  onSearch,
  onClear,
  bgColor,
  rounded,
}: SearchProps) => {
  const hasText = value.trim().length > 0;
  return (
    <TextField
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      bgColor={bgColor}
      rounded={rounded}
      rightIcon={
        onClear && hasText ? (
          <button
            type="button"
            aria-label="검색어 지우기"
            className="flex items-center justify-center"
            onClick={event => {
              onClear();
              event.currentTarget
                .closest("form")
                ?.querySelector("input")
                ?.focus();
            }}
          >
            <ClearIcon className="h-6 w-6 text-gray-50" />
          </button>
        ) : onSearch ? (
          <button
            type="button"
            aria-label="검색"
            disabled={!hasText}
            onClick={onSearch}
            className="flex items-center justify-center"
          >
            <SearchIcon
              className={`h-6 w-6 ${hasText ? "text-gray-80" : "text-gray-50"}`}
            />
          </button>
        ) : (
          <div className="flex items-center justify-center transition-opacity duration-200">
            <SearchIcon
              aria-label="search"
              className={`h-6 w-6 ${hasText ? "text-gray-80 cursor-pointer" : "cursor-default text-gray-50"}`}
            />
          </div>
        )
      }
    />
  );
};
