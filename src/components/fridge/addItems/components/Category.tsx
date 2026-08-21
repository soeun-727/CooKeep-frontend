import { type ComponentType, type SVGProps, memo } from "react";

interface CategoryProps {
  image: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

function Category({
  image: Image,
  name,
  isSelected = false,
  onSelect,
}: CategoryProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-S flex h-12 px-4 py-2 ${isSelected ? "bg-gray-200" : "bg-gray-0"}`}
    >
      <div className="flex items-center justify-center gap-[6px]">
        <Image className="h-5 w-5" />
        <span className="typo-label whitespace-nowrap text-gray-50">
          {name}
        </span>
      </div>
    </button>
  );
}

export default memo(Category);
