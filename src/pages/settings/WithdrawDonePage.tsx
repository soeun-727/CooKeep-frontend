import { useLocation, useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import checkImg from "@assets/signup/check.svg";
import { useEffect } from "react";

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
    <main className="mx-auto max-w-[450px] px-4 pt-[295px] text-center">
      <h1 className="typo-result-title">탈퇴 완료</h1>

      <img
        src={checkImg}
        alt="완료"
        className="mx-auto mt-[18px] h-[48px] w-[48px] brightness-[1.6] grayscale"
      />

      <div className="mt-[48px]">
        <Button
          size="L"
          onClick={() => navigate("/", { replace: true })}
          className="!text-[#32E389]"
        >
          메인으로 돌아가기
        </Button>
      </div>
    </main>
  );
}
