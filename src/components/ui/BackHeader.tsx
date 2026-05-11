// src/components/header/BackHeader.tsx
import BackIcon from "../../assets/back.svg";

type BackHeaderProps = {
  title: string;
  onBack: () => void;
};

const BackHeader = ({ title, onBack }: BackHeaderProps) => {
  return (
    <header
      className="
    fixed top-0 z-50
    w-full max-w-[450px]
    h-12
    flex items-center
    px-4 py-4
    bg-[#FAFAFA]
  "
    >
      <button
        type="button"
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center"
      >
        <img src={BackIcon} alt="뒤로가기" />
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold">
        {title}
      </h1>
    </header>
  );
};

export default BackHeader;
