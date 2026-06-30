import { useNavigate } from "react-router-dom";

import { confetti, mainLogo } from "@/assets/index";
import Google from "@/assets/login/Google.svg";
import Line from "@/assets/login/Horizontal-Line.png";
import Kakao from "@/assets/login/Kakao.svg";
import chars from "@/assets/onboarding/Frame 781.svg";

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
    <div className="flex flex-col items-center bg-background min-h-screen relative">
      <div className="absolute top-[3px] left-0 right-0 flex justify-center pointer-events-none z-0">
        <img src={confetti} className="w-86" />
      </div>
      {/* 상단 텍스트 영역 */}
      <div className="w-full flex flex-col mt-[86px] items-center">
        <h1 className="text-[19px] font-semibold flex gap-1">
          <span className="text-green-deep">재료 관리</span>
          <span className="text-gray-80">부터,</span>
          <span className="text-green-deep">요리 기록</span>
          <span className="text-gray-80">까지!</span>
        </h1>
      </div>

      {/* 로고 */}
      <div className="mt-[23px] flex flex-col items-center">
        <span className="typo-caption">1인 가구 요리 루틴 플랫폼</span>
        <img src={mainLogo} alt="로고" className="w-[218px]" />
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

      {/* <div className="flex-1" /> */}

      {/* <div className="flex flex-col items-center justify-center mb-[34px]"> */}
      <div className="mt-[24px] flex flex-col items-center justify-center">
        {/* SNS 로그인 */}
        <span className="typo-caption text-gray-50">
          SNS 계정으로 로그인하기
        </span>

        <div className="mt-4 flex items-center justify-center gap-3">
          {/* 간편 로그인 미구현  */}
          <button onClick={handleGoogleLogin}>
            <img src={Google} alt="구글 로고" className="" />
          </button>

          <button onClick={handleKakaoLogin}>
            <img src={Kakao} alt="카카오 로고" className="" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[22px] py-[18px]">
          <img src={Line} alt="구분선" />
          <span className="typo-caption text-gray-50">또는</span>
          <img src={Line} alt="구분선" />
        </div>
        <button onClick={() => navigate("/login")}>
          <span className="typo-caption text-gray-50">이메일로 로그인하기</span>
        </button>
        <button
          onClick={() => navigate("/guest")}
          className="mt-5 typo-body !font-bold text-green-deep mb-[50px]"
        >
          쿠킵이 처음인가요? 둘러보기
        </button>
      </div>
    </div>
  );
}
