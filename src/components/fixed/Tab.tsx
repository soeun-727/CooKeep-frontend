interface TabProps {
  image: string;
  selectedImage: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Tab({
  image,
  selectedImage,
  title,
  isSelected = false,
  onClick,
}: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-0 relative flex h-14 flex-1 flex-col items-center justify-center gap-[2px] transition-all ${
        isSelected ? "shadow-[inset_0_0_2px_0_rgba(17,17,17,0.1)]" : ""
      }`}
    >
      {isSelected && (
        <div className="bg-green-gradient absolute top-0 left-0 h-[2px] w-full" />
      )}

      <img
        className="h-[25px] w-[25px]"
        src={isSelected ? selectedImage : image}
        alt={title}
      />

      <span
        className={`text-center text-[10px] leading-3 font-semibold tracking-[0.1px] ${
          isSelected ? "text-gray-80" : "text-gray-30"
        }`}
      >
        {title}
      </span>
    </button>
  );
}
