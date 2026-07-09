import BackIcon from "@/assets/back.svg?react";

interface BackHeaderProps {
  title: string;
  onBack: () => void;
}

export default function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    <header className="bg-background fixed top-0 z-50 flex h-10 w-full max-w-[450px] items-center px-4 py-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 items-center justify-center"
      >
        <div className="flex h-10 w-10 items-center justify-start object-contain">
          <BackIcon className="-ml-2 h-full w-full justify-self-start" />
        </div>
      </button>

      <h1 className="typo-l-strong text-gray-80 absolute left-1/2 flex -translate-x-1/2 items-center">
        {title}
      </h1>
    </header>
  );
}
