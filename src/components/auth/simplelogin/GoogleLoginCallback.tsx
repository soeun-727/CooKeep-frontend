import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { loadingChar } from "../../../assets";

export default function GoogleLoginCallback() {
  const navigate = useNavigate();
  const loginSocial = useAuthStore((state) => state.loginSocial);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      // 환경 변수 활용
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || "";

      if (!code || hasCalledAPI.current) return;
      hasCalledAPI.current = true;

      try {
        // 직접적인 주소 노출 제거
        const res = await fetch(
          `${BASE_URL}/api/auth/login/google?code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        );

        if (!res.ok) throw new Error();

        const { data } = await res.json();

        loginSocial({
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          nextStep: data.nextStep,
          userStatus: data.userStatus,
        });

        if (data.userStatus === "BLOCKED") {
          alert("차단된 계정입니다.");
          navigate("/login");
          return;
        }

        // 페이지 이동 로직
        if (data.nextStep === "TERMS") {
          navigate("/simplelogin", { replace: true });
        } else if (data.nextStep === "ONBOARDING") {
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/fridge", { replace: true });
        }
      } catch (error) {
        console.error("구글 로그인 에러:", error);
        alert("구글 로그인 실패");
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
