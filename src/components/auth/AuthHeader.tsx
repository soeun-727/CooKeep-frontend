import { useNavigate } from "react-router-dom";

import BackIcon from "@/assets/back.svg?react";

export default function AuthHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-between py-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center"
      >
        <BackIcon className="h-5 w-5" />
      </button>

      <p className="typo-label flex items-center gap-[6px]">
        <span className="text-gray-50">맛있는 습관이 이어지는 곳,</span>
        <span className="text-green-deep">쿠킵</span>
      </p>
    </header>
  );
}
