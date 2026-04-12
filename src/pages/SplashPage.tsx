import { useEffect, useState } from "react";
import { logoBlack, logoChar, logoWhite } from "../assets";

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
    <div className="fixed inset-0 flex justify-center bg-transparent z-[9999] pointer-events-none">
      <div
        className={`
          relative w-full max-w-[450px] h-full overflow-hidden bg-[#FAFAFA]
          transition-opacity duration-500 ease-in-out flex items-center justify-center
          ${isFadingOut ? "opacity-0" : "opacity-100"}
          ${isFadingOut ? "" : "pointer-events-auto"} // 페이드아웃 전에는 클릭 방지
        `}
      >
        {/* 원형 배경 */}
        <div
          className={`
          absolute
          w-[300vmax] h-[300vmax]
          rounded-full
          bg-emerald-400
          z-10
          left-1/2 top-1/2
          -translate-y-1/2
          transition-all duration-700 ease-out
          ${step >= 2 ? "scale-100 -translate-x-1/2" : "scale-0 -translate-x-1/2"}
        `}
        />

        <div className="relative flex items-center justify-center">
          {/* 캐릭터 */}
          <img
            src={logoChar}
            className={`
            absolute right-full
            z-30
            transition-all duration-500
            ${
              step === 0
                ? "opacity-0 -translate-x-6"
                : step < 4
                  ? "opacity-100 translate-x-0"
                  : "opacity-0"
            }
          `}
          />

          {/* 로고 컨테이너 */}
          <div
            className={`
            relative z-30
            transition-all duration-500
            ${
              step === 0
                ? "translate-x-0"
                : step < 4
                  ? "translate-x-4"
                  : "translate-x-0"
            }
          `}
          >
            {/* 검은 로고 */}
            <img
              src={logoBlack}
              className={`
              absolute inset-0
              transition-opacity duration-200
              ${step >= 3 ? "opacity-0" : "opacity-100"}
            `}
            />

            {/* 흰 로고 */}
            <img
              src={logoWhite}
              className={`
              transition-opacity duration-200
              ${step >= 3 ? "opacity-100" : "opacity-0"}
            `}
            />
          </div>
        </div>

        {/* 슬로건 */}
        <div
          className={`
          absolute bottom-0
          z-30
          w-full
          pb-8
          text-center
          text-green-100 text-xs font-semibold leading-5
          transition-all duration-700 ease-out
          ${step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
        >
          맛있는 습관이 이어지는 곳, 쿠킵
        </div>
      </div>
    </div>
  );
}
