import { Search } from "@/components/fridge/features/Search";

interface ShoppingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  showClearButton?: boolean;
}

export default function ShoppingSearchBar({
  value,
  onChange,
  onSubmit,
  showClearButton = false,
}: ShoppingSearchBarProps) {
  return (
    <form
      role="search"
      aria-label="장보기 재료 검색"
      className="w-full px-4 [&_input]:min-w-0 [&>div>div]:h-12 [&>div>div]:items-center"
      onSubmit={event => {
        event.preventDefault();
        if (value.trim()) onSubmit();
      }}
    >
      <Search
        placeholder="필요한 재료를 검색해 보세요! (ex. 고구마, 초코우유...)"
        value={value}
        onChange={onChange}
        onSearch={onSubmit}
        onClear={showClearButton ? () => onChange("") : undefined}
        bgColor={showClearButton ? "bg-gray-0" : undefined}
        rounded="rounded-M"
      />
    </form>
  );
}
