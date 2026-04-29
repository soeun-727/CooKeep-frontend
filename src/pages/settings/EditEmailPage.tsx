// src/pages/settings/EditEmailPage.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import checkIcon from "../../assets/signup/check.svg";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import axios from "axios";
import { updateEmail } from "../../api/user";
import { useEmailUpdateStore } from "../../stores/useEmailUpdateStore";
import EmailAuthModal from "../../components/auth/signup/EmailAuthModal"; // 추가

type ModalType = "send" | "verify" | "help"; // 추가

export default function EditEmailPage() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    isCodeSent,
    isVerified,
    requestSendCode,
    requestVerifyCode,
    reset,
  } = useEmailUpdateStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null); // 추가

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!timerActive) return;
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimerActive(false);
        setTimeLeft(0);
        setCodeError("인증번호가 만료되었습니다");
      } else {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSendCode = async () => {
    if (!isEmailValid || isSending) return;
    setIsSending(true);
    const result = await requestSendCode();
    setIsSending(false);

    if (result.success) {
      setCode("");
      setCodeError(undefined);
      setTimeLeft(300);
      setTimerActive(true);
      setModalType("send"); // 발송 성공 모달
    } else {
      if (result.errorStatus === 400) {
        alert("현재 사용 중인 이메일과 동일합니다."); // USER-008 추가
      } else if (result.errorStatus === 403) {
        alert("소셜 로그인 사용자는 이메일을 변경할 수 없습니다."); // 추가
      } else if (result.errorStatus === 409) {
        alert("이미 사용 중인 이메일입니다.");
      } else if (result.errorStatus === 429) {
        alert("재요청이 너무 빠릅니다. 잠시 후 시도해주세요.");
      } else {
        alert("인증번호 발송에 실패했습니다.");
      }
    }
  };

  const handleVerify = async () => {
    if (timeLeft === 0) {
      setCodeError("인증번호가 만료되었습니다");
      return;
    }
    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }

    const result = await requestVerifyCode(code);

    if (result.success) {
      try {
        await updateEmail(email);
        setTimerActive(false);
        reset();
        setModalType("verify");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const code = err.response?.data?.code; // code 필드 활용

          if (status === 403 || code === "USER-009") {
            alert("소셜 로그인 사용자는 이메일을 변경할 수 없습니다.");
          } else if (status === 400 || code === "USER-008") {
            alert("현재 사용 중인 이메일과 동일합니다.");
          } else if (status === 409 || code === "USER-003") {
            alert("이미 사용 중인 이메일입니다.");
          } else if (status === 401) {
            alert("로그인이 필요합니다.");
          } else {
            alert("이메일 변경 중 오류가 발생했습니다.");
          }
        }
      }
    } else {
      if (result.errorStatus === 400)
        setCodeError("인증번호가 일치하지 않습니다.");
      else if (result.errorStatus === 404)
        setCodeError("인증 요청 내역이 없습니다.");
      else if (result.errorStatus === 429)
        setCodeError("인증 시도 횟수를 초과했습니다.");
      else setCodeError("인증번호를 다시 확인해 주세요.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      <div className="pt-[241px] w-[361px] mx-auto">
        <div className="typo-h1">이메일 주소 변경</div>

        <div className="relative mt-[12px]">
          <TextField
            value={email}
            onChange={(val) => setEmail(val)}
            placeholder="새 이메일 주소 입력"
            disabled={isCodeSent}
            errorMessage={
              email && !isEmailValid
                ? "이메일 주소를 다시 확인해 주세요"
                : undefined
            }
            rightIcon={
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!isEmailValid || isSending}
                className={`w-[102px] h-[24px] rounded-full typo-caption text-white
                  ${isEmailValid ? "bg-[#202020]" : "bg-[#C3C3C3]"}`}
              >
                {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
              </button>
            }
          />
        </div>

        <div className="mt-[5px]">
          <TextField
            value={code}
            onChange={(v) => {
              const onlyNumber = v.replace(/[^0-9]/g, "");
              setCode(onlyNumber);
              if (!onlyNumber) {
                setCodeError(undefined);
              } else if (onlyNumber.length !== 6) {
                setCodeError("인증번호를 다시 입력해 주세요");
              } else {
                setCodeError(undefined);
              }
            }}
            placeholder="인증번호 입력"
            disabled={!isCodeSent || isVerified}
            errorMessage={codeError}
          />
        </div>

        <Button
          size="S"
          className="mt-[31px]"
          disabled={!isCodeSent || code.length !== 6 || timeLeft === 0}
          onClick={handleVerify}
        >
          인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
        </Button>

        <button
          type="button"
          onClick={() => setModalType("help")} // 이제 동작함
          className="mt-6 w-[361px] typo-caption text-[#7D7D7D] text-center underline cursor-pointer bg-transparent"
        >
          인증 번호가 발송되지 않나요?
        </button>
      </div>

      {/* 모달 */}
      {modalType && (
        <EmailAuthModal
          type={modalType}
          email={email}
          onConfirm={() => {
            if (modalType === "verify") {
              setIsSuccess(true); // 모달 확인 후 성공 오버레이
            }
            setModalType(null);
          }}
        />
      )}

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-result-title w-full pt-[295px] pb-[18px]">
              이메일 주소 변경 완료
            </p>
            <img src={checkIcon} alt="성공" className="w-[40px] h-[40px]" />
            <Button
              size="L"
              variant="black"
              className="mt-[48px] !text-[#32E389]"
              onClick={() => navigate("/settings")}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
