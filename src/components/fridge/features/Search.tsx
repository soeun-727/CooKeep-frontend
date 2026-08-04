import { SearchIcon } from "@/assets/index";

import TextField from "@/components/ui/TextField";

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}
export const Search = ({ placeholder, value, onChange }: SearchProps) => {
  const hasText = value.trim().length > 0;
  return (
    <TextField
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
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
};
