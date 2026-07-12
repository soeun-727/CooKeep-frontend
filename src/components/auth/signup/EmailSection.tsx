import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignupStore } from "@/stores/useSignupStore";
import axios from "axios";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

import { EmailAuthType } from "@/types/modal";

import { formatTime } from "@/utils/formateTime";
import { validateEmail } from "@/utils/validateUtil";

import EmailAuthModal from "./EmailAuthModal";

export default function EmailSection() {
  const { email, setEmail, isCodeSent, isVerified, sendCode, verifyCode } =
    useSignupStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  const [modalType, setModalType] = useState<EmailAuthType | null>(null);

  // 이메일 유효성 검사
  const isEmailValid = validateEmail(email);
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

  const [isSending, setIsSending] = useState(false);

  const handleSendCode = async () => {
    if (!isEmailValid || isSending) return;

    try {
      setIsSending(true);
      // 이거 추가
      useSignupStore.getState().setEmail(email);

      await sendCode();
      setCode("");
      setCodeError(undefined);
      setTimeLeft(300);
      setTimerActive(true);
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
    <main className="flex w-full flex-1 flex-col px-4 pt-[40px]">
      <div className="mt-[120px] flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="w-full px-1 py-2">
            <h1 className="typo-h2">이메일 인증</h1>
          </div>
          <div>
            <TextField
              value={email}
              onChange={setEmail}
              placeholder="이메일 주소 입력"
              disabled={isVerified || isCodeSent}
              errorMessage={
                !isEmailValid && email ? "잘못된 이메일 주소입니다" : undefined
              }
              rightIcon={
                <button
                  type="button"
                  onClick={isCodeSent ? handleSendCode : handleSendCode}
                  disabled={!isEmailValid || isSending}
                  className={`typo-caption text-gray-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors disabled:cursor-not-allowed ${
                    isEmailValid ? "bg-gray-80" : "bg-gray-30"
                  }`}
                >
                  {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
                </button>
              }
            />

            <TextField
              value={code}
              onChange={value => {
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
          </div>

          <Button
            size="L"
            disabled={
              !isCodeSent || isVerified || timeLeft === 0 || code.length !== 6
            }
            onClick={handleVerify}
          >
            <span className="typo-button">
              인증하기{" "}
              {isCodeSent && !isVerified && `(${formatTime(timeLeft)})`}
            </span>
          </Button>

          <button
            type="button"
            onClick={() => setModalType("help")}
            className="typo-m w-full text-center text-gray-50 underline"
          >
            인증 번호가 발송되지 않나요?
          </button>
        </div>

        {modalType && (
          <EmailAuthModal
            type={modalType}
            email={email}
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
    </main>
  );
}
