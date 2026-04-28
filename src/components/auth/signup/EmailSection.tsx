// src/components/auth/signup/EmailSection.tsx
import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../../stores/useSignupStore";
import axios from "axios";
import EmailAuthModal from "./EmailAuthModal";

export default function EmailSection() {
  const { email, setEmail, isCodeSent, isVerified, sendCode, verifyCode } =
    useSignupStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "already" | "help";
  const [modalType, setModalType] = useState<ModalType | null>(null);

  // 이메일 유효성 검사
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const navigate = useNavigate();

  // 타이머
  useEffect(() => {
    if (!timerActive) return;
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimerActive(false);
        setTimeLeft(0);
        setCodeError("인증번호가 만료되었습니다");
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const [isSending, setIsSending] = useState(false);

  const handleSendCode = async () => {
    if (!isEmailValid || isSending) return;

    try {
      setIsSending(true);
      // 이거 추가
      useSignupStore.getState().setEmail(email);
      setCode("");
      setCodeError(undefined);
      setTimeLeft(300);
      setTimerActive(true);

      await sendCode();
      setModalType("send");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          setModalType("already"); // 이미 가입된 이메일
        } else if (status === 429) {
          setCodeError("인증 요청이 너무 빠릅니다.");
        } else {
          setCodeError("인증번호 발송 중 오류가 발생했습니다.");
        }
      } else {
        setCodeError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSending(false);
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

    const result = await verifyCode(code);
    if (result.success) {
      setModalType("verify");
    } else {
      setCodeError(result.message);
    }
  };

  return (
    <div className="pt-[241px] w-[361px] mx-auto">
      <div className="relative w-[361px]">
        <div className="typo-h1">이메일 인증</div>
        <div className="relative mt-[12px]">
          <TextField
            value={email}
            onChange={setEmail} // setPhone → setEmail
            placeholder="이메일 주소 입력"
            disabled={isVerified || isCodeSent}
            errorMessage={
              !isEmailValid && email
                ? "이메일 주소를 다시 확인해 주세요"
                : undefined
            }
            rightIcon={
              <button
                type="button"
                onClick={isCodeSent ? handleSendCode : handleSendCode}
                disabled={!isEmailValid || isSending}
                className={`w-[102px] h-[24px] rounded-full typo-caption text-white
                  ${isEmailValid ? "bg-[#202020]" : "bg-[#C3C3C3]"}
                  disabled:cursor-not-allowed`}
              >
                {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
              </button>
            }
          />
        </div>
      </div>

      <div className="mt-[5px] w-[361px]">
        <TextField
          value={code}
          onChange={(value) => {
            const onlyNumber = value.replace(/[^0-9]/g, "");
            setCode(onlyNumber);
            if (!onlyNumber) setCodeError(undefined);
            else if (onlyNumber.length !== 6)
              setCodeError("인증번호를 다시 입력해 주세요");
            else setCodeError(undefined);
          }}
          placeholder="인증번호 입력"
          disabled={!isCodeSent || isVerified}
          errorMessage={codeError}
        />

        <Button
          size="S"
          disabled={
            !isCodeSent || isVerified || timeLeft === 0 || code.length !== 6
          }
          onClick={handleVerify}
          className="mt-[31px]"
        >
          <span className="typo-button">
            인증하기 {isCodeSent && !isVerified && `(${formatTime(timeLeft)})`}
          </span>
        </Button>

        <button
          type="button"
          onClick={() => setModalType("help")}
          className="mt-3 w-[361px] typo-caption text-[#7D7D7D] text-center underline cursor-pointer bg-transparent"
        >
          인증 번호가 발송되지 않나요?
        </button>
      </div>

      {modalType && (
        <EmailAuthModal
          type={modalType}
          email={email} // phone → email
          onConfirm={() => {
            if (modalType === "verify") {
              useSignupStore.getState().setIsVerified(true);
            }
            setModalType(null);
          }}
          onLogin={() => navigate("/login")}
        />
      )}
    </div>
  );
}
