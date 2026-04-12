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
      className={`relative gap-[2px] flex flex-1 flex-col items-center justify-center transition-all h-14 ${
        isSelected
          ? "bg-white shadow-[inset_0_0_2px_0_rgba(17,17,17,0.1)]"
          : "bg-white border-t-transparent"
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-green-500" />
      )}
      <img
        className="w-[25px] h-[25px]"
        src={isSelected ? selectedImage : image}
        alt={title}
      />
      <span
        className={`font-semibold font-["Pretendard"] text-[10px] leading-3 tracking-[0.1px] text-center ${
          isSelected ? "text-[#202020]" : "text-stone-300"
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default Tab;
