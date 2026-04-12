// src/components/auth/AuthHeader.tsx
import { mainLogo } from "../../assets";

const AuthHeader = () => {
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
      <img src={mainLogo} alt="CooKeep logo" className="w-24 h-[18px]" />

      <p className="flex items-center gap-[6px] typo-label">
        <span className="text-[#7D7D7D]">맛있는 습관이 이어지는 곳,</span>
        <span className="text-[var(--color-green-deep)]">쿠킵</span>
      </p>
    </header>
  );
};

export default AuthHeader;
