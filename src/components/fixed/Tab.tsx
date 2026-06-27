interface TabProps {
  image: string;
  selectedImage: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}
const Tab: React.FC<TabProps> = ({
  image,
  selectedImage,
  title,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex h-14 flex-1 flex-col items-center justify-center gap-[2px] transition-all ${
        isSelected
          ? "bg-white shadow-[inset_0_0_2px_0_rgba(17,17,17,0.1)]"
          : "border-t-transparent bg-white"
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-400 to-green-500" />
      )}
      <img
        className="h-[25px] w-[25px]"
        src={isSelected ? selectedImage : image}
        alt={title}
      />
      <span
        className={`text-center font-["Pretendard"] text-[10px] leading-3 font-semibold tracking-[0.1px] ${
          isSelected ? "text-[#202020]" : "text-stone-300"
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default Tab;
