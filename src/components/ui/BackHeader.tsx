import BackIcon from "@/assets/back.svg?react";

interface BackHeaderProps {
  title: string;
  onBack: () => void;
}

export default function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    // <header className="bg-background fixed top-0 z-50 flex h-12 w-full max-w-[450px] items-center px-4 py-4">
    //   <button
    //     type="button"
    //     onClick={onBack}
    //     className="flex h-8 w-8 items-center justify-center"
    //   >
    //     <img src={BackIcon} alt="뒤로가기" />
    //   </button>

    //   <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold">
    //     {title}
    //   </h1>
    // </header>
    <header className="bg-background fixed top-0 z-50 flex h-10 w-full max-w-[450px] items-center justify-between px-4 py-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center"
      >
        <BackIcon className="h-8 w-8" />
      </button>

      <h1 className="typo-l-strong text-gray-80 absolute left-1/2 -translate-x-1/2">
        {title}
      </h1>

      {/* 오른쪽 여백 맞추기 */}
      <div className="h-10 w-10" />
    </header>
  );
}
