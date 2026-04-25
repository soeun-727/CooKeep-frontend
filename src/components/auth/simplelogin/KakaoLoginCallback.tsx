import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { loadingChar } from "../../../assets";

export default function KakaoLoginCallback() {
  const navigate = useNavigate();
  const loginSocial = useAuthStore((state) => state.loginSocial);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      // 환경 변수 로드
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

      if (!code || hasCalledAPI.current) return;
      hasCalledAPI.current = true;

      try {
        // 주소를 직접 넣지 않고 환경 변수를 조합하여 호출
        const res = await fetch(
          `${BASE_URL}/api/auth/login/kakao?code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("서버 응답 에러 상세:", errorText);
          throw new Error(`서버 에러 발생: ${res.status}`);
        }

        const response = await res.json();

        if (response.status === "OK" || response.status === 200) {
          const { data } = response;

          loginSocial({
            userId: data.userId,
            accessToken: data.accessToken || "",
            refreshToken: data.refreshToken || "",
            nextStep: data.nextStep,
            userStatus: data.userStatus,
            isRewarded: data.isRewarded,
          });

          if (data.userStatus === "BLOCKED") {
            alert("서비스 이용이 제한된 계정입니다.");
            navigate("/login");
            return;
          }

          if (data.nextStep === "TERMS") {
            navigate("/simplelogin", { replace: true });
          } else if (data.nextStep === "ONBOARDING") {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/fridge", { replace: true });
          }
        }
      } catch (err) {
        console.error("로그인 에러:", err);
        if (hasCalledAPI.current) {
          alert("로그인 처리 중 오류가 발생했습니다.");
        }
      }
    };

    handleLogin();
  }, [navigate, loginSocial]);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-50">
      <img className="opacity-70 w-30 p-5" src={loadingChar} alt="loading" />
      <div className="typo-body2 text-zinc-500">로그인 중...</div>
    </div>
  );
}
