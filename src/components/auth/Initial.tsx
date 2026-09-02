import { useNavigate } from "react-router-dom";

import Google from "@/assets/login/Google.svg?react";
import Kakao from "@/assets/login/Kakao.svg?react";
import MainLogo from "@/assets/logos/mainLogo.svg?react";
import chars from "@/assets/onboarding/Frame 781.svg";
import confetti from "@/assets/signup/confetti.svg";

const CHAR = [chars];
const INFINITE_CHAR = [...CHAR, ...CHAR];

export default function Initial() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=consent`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    const GOOGLE_AUTH_URL =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=openid email profile` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <div className="bg-background no-scrollbar relative flex min-h-screen flex-col items-center">
      <div className="pointer-events-none absolute top-[3px] right-0 left-0 z-0 flex justify-center">
        <img src={confetti} className="w-86" />
      </div>
      {/* 상단 텍스트 영역 */}
      <div className="mt-[86px] flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <h1 className="flex gap-1 text-[19px] leading-[19.2px] font-semibold">
            <span className="text-green-deep">재료 관리</span>
            <span className="text-gray-80">부터,</span>
            <span className="text-green-deep">요리 기록</span>
            <span className="text-gray-80">까지!</span>
          </h1>
        </div>

        {/* 로고 */}
        <div className="flex flex-col items-center">
          <span className="text-gray-80 text-[12px] leading-[19.2px] font-semibold">
            1인 가구 요리 루틴 플랫폼
          </span>
          <MainLogo aria-label="로고" role="img" className="w-[218px]" />
        </div>
      </div>

      {/* 애니메이션 */}
      <div className="relative my-10 flex min-h-[200px] w-full items-center overflow-hidden">
        <div className="animate-roll-left flex h-50 w-max flex-nowrap items-end">
          {INFINITE_CHAR.map((char, index) => (
            <img
              key={index}
              src={char}
              alt={`character-${index}`}
              className="mr-8 w-[791.5px] min-w-[791.5px] flex-shrink-0 object-contain"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3">
            {/* SNS 로그인 */}
            <span className="typo-m text-gray-50">SNS 계정으로 로그인하기</span>

            <div className="flex items-center justify-center gap-3">
              {/* 간편 로그인 미구현  */}
              <button onClick={handleGoogleLogin}>
                <Google className="h-11 w-11" />
              </button>

              <button onClick={handleKakaoLogin}>
                <Kakao className="h-11 w-11" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[9px]">
            <div className="bg-gray-30 h-[1px] w-[152px]" />

            <span className="typo-caption text-gray-50">또는</span>

            <div className="bg-gray-30 h-[1px] w-[152px]" />
          </div>
          <button onClick={() => navigate("/login")}>
            <span className="typo-m text-gray-50">이메일로 로그인하기</span>
          </button>
        </div>
        <button
          onClick={() => navigate("/guest")}
          className="typo-label text-green-deep mb-[46px]"
        >
          쿠킵이 처음인가요? 둘러보기
        </button>
      </div>
    </div>
  );
}
