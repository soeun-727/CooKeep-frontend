import { useNavigate } from "react-router-dom";

import BackIcon from "@/assets/back.svg?react";

export default function AuthHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="bg-background absolute top-0 z-50 flex w-full items-center justify-between px-4 py-2">
      <button
        type="button"
        onClick={handleBackClick}
        className="flex h-10 w-10 items-center justify-center"
      >
        <BackIcon className="h-8 w-8" />
      </button>

      <p className="typo-label flex items-center gap-[6px]">
        <span className="text-gray-50">맛있는 습관이 이어지는 곳,</span>
        <span className="text-green-deep">쿠킵</span>
      </p>
    </header>
  );
}
