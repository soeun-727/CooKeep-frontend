import { useEffect, useState } from "react";

import { logoBlack, logoWhite } from "@/assets/index";

export default function SplashPage() {
  const [step, setStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300), // 배경 확장 + 로고 흰색
      setTimeout(() => setStep(2), 1300), // 슬로건 등장
      setTimeout(() => setIsFadingOut(true), 4500), // 유지 후 페이드아웃
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-center overflow-hidden transition-colors duration-700 ${step >= 1 ? "bg-emerald-400" : "bg-background"} `}
    >
      <div
        className={`relative flex h-full w-full max-w-[450px] items-center justify-center transition-opacity duration-500 ease-in-out ${isFadingOut ? "opacity-0" : "opacity-100"} ${isFadingOut ? "" : "pointer-events-auto"} `}
      >
        {/* safe-area 필요하면 overlay로만 */}
        <div className="absolute top-0 right-0 left-0 h-[env(safe-area-inset-top)]" />

        {/* 원형 배경 */}
        <div
          className={`absolute top-1/2 left-1/2 z-10 h-[300vmax] w-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 duration-700 ease-out ${step >= 1 ? "scale-100" : "scale-0"} `}
        />

        {/* 로고 */}
        <div className="relative z-30 flex items-center justify-center">
          {/* 흰 로고 */}
          <img
            src={logoWhite}
            className={`transition-opacity duration-200 ${step >= 1 ? "opacity-100" : "opacity-0"} `}
          />
        </div>

        {/* 슬로건 */}
        <div
          className={`absolute bottom-0 z-30 w-full pb-8 text-center text-xs leading-5 font-semibold text-green-100 duration-700 ease-out ${step >= 2 ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} `}
        >
          맛있는 습관이 이어지는 곳, 쿠킵
        </div>
      </div>
    </div>
  );
}
