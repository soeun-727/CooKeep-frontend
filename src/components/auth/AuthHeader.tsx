// src/components/auth/AuthHeader.tsx
import { useNavigate } from "react-router-dom";
import { mainLogo } from "../../assets";

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/", { replace: true }); // 최초 접속 화면 경로
  };

  return (
    <header
      className="
        absolute top-0 z-50
        w-full max-w-[450px]
        flex items-center justify-between
        px-4 py-2 
        bg-[#FAFAFA]
      "
    >
      <button
        onClick={handleLogoClick}
        className="cursor-pointer p-0 border-none bg-transparent"
      >
        <img src={mainLogo} alt="CooKeep logo" className="w-24 h-[18px]" />
      </button>

      <p className="flex items-center gap-[6px] typo-label">
        <span className="text-[#7D7D7D]">맛있는 습관이 이어지는 곳,</span>
        <span className="text-[var(--color-green-deep)]">쿠킵</span>
      </p>
    </header>
  );
};

export default AuthHeader;
