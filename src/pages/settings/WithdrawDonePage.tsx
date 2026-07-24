import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CheckIcon from "@/assets/signup/check.svg?react";

import Button from "@/components/ui/Button";

export default function WithdrawDonePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.fromWithdraw) {
      navigate("/", { replace: true });
    }

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[450px] flex-col px-4">
      {/* status bar */}
      <div className="h-[40px]" />

      <div className="flex flex-1 flex-col pt-[120px]">
        <div className="flex w-full flex-1 flex-col items-center gap-4">
          <CheckIcon className="text-green h-10 w-10" />

          <h1 className="typo-h2 text-gray-80 text-center">회원 탈퇴 완료</h1>
        </div>
      </div>

      <div className="w-full pt-6 pb-[34px]">
        <Button
          size="L"
          variant="green"
          onClick={() => navigate("/", { replace: true })}
        >
          로그인
        </Button>
      </div>
    </main>
  );
}
