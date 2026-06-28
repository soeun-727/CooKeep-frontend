// src/components/header/BackHeader.tsx
import BackIcon from "@/assets/back.svg";

interface BackHeaderProps {
  title: string;
  onBack: () => void;
}

export default function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    <header className="fixed top-0 z-50 flex h-12 w-full max-w-[450px] items-center bg-[#FAFAFA] px-4 py-4">
      <button
        type="button"
        onClick={onBack}
        className="flex h-8 w-8 items-center justify-center"
      >
        <img src={BackIcon} alt="뒤로가기" />
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold">
        {title}
      </h1>
    </header>
  );
}
