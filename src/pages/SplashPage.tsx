import { useEffect, useState } from "react";

import { logoBlack, logoChar, logoWhite } from "@/assets/index";

export default function SplashPage() {
  const [step, setStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500), // 캐릭터 등장
      setTimeout(() => setStep(2), 1500), // 배경 확장
      setTimeout(() => setStep(3), 1800), // 로고 흰색
      setTimeout(() => setStep(4), 2000), // 캐릭터 숨김 + 로고 중앙
      setTimeout(() => setStep(5), 2700), // 슬로건 등장
      setTimeout(() => setStep(6), 5000), // 유지
      setTimeout(() => setIsFadingOut(true), 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`
    fixed inset-0 flex justify-center z-[9999] overflow-hidden
    transition-colors duration-700
    ${step >= 2 ? "bg-emerald-400" : "bg-background"}
  `}
    >
      <div
        className={`relative flex h-full w-full max-w-[450px] items-center justify-center transition-opacity duration-500 ease-in-out ${isFadingOut ? "opacity-0" : "opacity-100"} ${isFadingOut ? "" : "pointer-events-auto"} `}
      >
        {/* safe-area 필요하면 overlay로만 */}
        <div className="absolute top-0 right-0 left-0 h-[env(safe-area-inset-top)]" />

        {/* 원형 배경 */}
        <div
          className={`absolute top-1/2 left-1/2 z-10 h-[300vmax] w-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 transition-all duration-700 ease-out ${step >= 2 ? "scale-100" : "scale-0"} `}
        />

        <div className="relative flex items-center justify-center">
          {/* 캐릭터 */}
          <img
            src={logoChar}
            className={`absolute right-full z-30 transition-all duration-500 ${
              step === 0
                ? "-translate-x-6 opacity-0"
                : step < 4
                  ? "translate-x-0 opacity-100"
                  : "opacity-0"
            } `}
          />

          {/* 로고 컨테이너 */}
          <div
            className={`relative z-30 transition-all duration-500 ${
              step === 0
                ? "translate-x-0"
                : step < 4
                  ? "translate-x-4"
                  : "translate-x-0"
            } `}
          >
            {/* 검은 로고 */}
            <img
              src={logoBlack}
              className={`absolute inset-0 transition-opacity duration-200 ${step >= 3 ? "opacity-0" : "opacity-100"} `}
            />

            {/* 흰 로고 */}
            <img
              src={logoWhite}
              className={`transition-opacity duration-200 ${step >= 3 ? "opacity-100" : "opacity-0"} `}
            />
          </div>
        </div>

        {/* 슬로건 */}
        <div
          className={`absolute bottom-0 z-30 w-full pb-8 text-center text-xs leading-5 font-semibold text-green-100 transition-all duration-700 ease-out ${step >= 5 ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} `}
        >
          맛있는 습관이 이어지는 곳, 쿠킵
        </div>
      </div>
    </div>
  );
}
