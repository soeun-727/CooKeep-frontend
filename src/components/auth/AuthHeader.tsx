// src/components/auth/AuthHeader.tsx
import { useNavigate } from "react-router-dom";
import { mainLogo } from "@/assets/index";

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/", { replace: true }); // 최초 접속 화면 경로
  };

  return (
    <header className="absolute top-0 z-50 flex w-full max-w-[450px] items-center justify-between bg-[#FAFAFA] px-4 py-2">
      <button
        onClick={handleLogoClick}
        className="cursor-pointer border-none bg-transparent p-0"
      >
        <img src={mainLogo} alt="CooKeep logo" className="h-[18px] w-24" />
      </button>

      <p className="typo-label flex items-center gap-[6px]">
        <span className="text-[#7D7D7D]">맛있는 습관이 이어지는 곳,</span>
        <span className="text-[var(--color-green-deep)]">쿠킵</span>
      </p>
    </header>
  );
};

export default AuthHeader;
