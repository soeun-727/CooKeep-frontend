import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFindPasswordStore } from "@/stores/useFindPasswordStore";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

import { FindEmailAuthType } from "@/types/modal";

import { formatTime } from "@/utils/formateTime";
import { validateEmail } from "@/utils/validateUtil";

import FindEmailAuthModal from "./FindEmailAuthModal";

export default function FindEmailSection() {
  const { email, setEmail, isCodeSent, sendCode, verifyCode } =
    useFindPasswordStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  const [modalType, setModalType] = useState<FindEmailAuthType | null>(null);

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

  // 인증번호 발송
  const handleSendCode = async () => {
    try {
      setCode("");
      setCodeError(undefined);

      await sendCode();

      setTimeLeft(300);
      setTimerActive(true);
      setModalType("send");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "가입된 이메일이 없습니다.") {
          setModalType("notRegistered");
          return;
        }

        alert(error.message);
        return;
      }

      alert("인증 요청 중 오류가 발생했습니다.");
    }
  };

  const handleVerify = async () => {
    if (timeLeft === 0) {
      setCodeError("인증번호가 만료되었습니다");
      return;
    }

    try {
      const success = await verifyCode(code);
      if (success) {
        setCodeError(undefined);
        setModalType("verify");
      }
    } catch (error) {
      if (error instanceof Error) {
        setCodeError(error.message);
      } else {
        setCodeError("인증 중 오류가 발생했습니다.");
      }
    }
  };

  const handleResend = () => handleSendCode();

  return (
    <main className="flex w-full flex-1 flex-col px-4 pt-[40px]">
      <div className="mt-[120px] flex flex-col gap-6">
        {/* 이메일 입력 */}
        <div className="flex flex-col gap-4">
          <div className="w-full px-1 py-2">
            <h1 className="typo-h2">이메일 인증</h1>
          </div>
          <div>
            <InputField
              value={email}
              onChange={setEmail}
              disabled={isCodeSent}
              placeholder="이메일 주소 입력"
              errorMessage={
                !validateEmail(email) && email
                  ? "잘못된 이메일 주소입니다"
                  : undefined
              }
              rightIcon={
                <button
                  type="button"
                  onClick={isCodeSent ? handleResend : handleSendCode}
                  disabled={!validateEmail(email)}
                  className={`typo-caption text-gray-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors disabled:cursor-not-allowed ${
                    validateEmail(email) ? "bg-gray-80" : "bg-gray-30"
                  }`}
                >
                  {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
                </button>
              }
            />

            {/* 인증번호 입력 */}
            <InputField
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
              disabled={!isCodeSent}
              errorMessage={codeError}
            />
          </div>
          <Button
            size="L"
            disabled={!isCodeSent || timeLeft === 0 || code.length !== 6}
            onClick={handleVerify}
          >
            인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setModalType("help")}
          className="typo-m w-full text-center text-gray-50 underline"
        >
          인증 번호가 발송되지 않나요?
        </button>
      </div>

      {/* 모달 */}
      {modalType && (
        <FindEmailAuthModal
          type={modalType}
          email={email}
          onConfirm={() => {
            if (modalType === "verify") {
              navigate("/reset-password"); // 인증 완료 후 비밀번호 재설정 페이지로 이동
            }
            setModalType(null);
          }}
          onSignup={() => navigate("/signup")} // 회원가입 이동
        />
      )}
    </main>
  );
}
