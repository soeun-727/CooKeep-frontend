import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import { useNavigate } from "react-router-dom";
import { useFindPasswordStore } from "../../../stores/useFindPasswordStore";
import FindEmailAuthModal from "./FindEmailAuthModal";
// import axios from "axios";

export default function FindEmailSection() {
  const { email, setEmail, isCodeSent, sendCode, verifyCode } =
    useFindPasswordStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "notRegistered" | "help";
  const [modalType, setModalType] = useState<ModalType | null>(null);

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
    <div className="pt-[241px] w-[361px] mx-auto">
      {/* 전화번호 입력 */}
      <div className="relative w-[361px]">
        <div className="typo-h1">이메일 인증</div>
        <div className="relative mt-[12px]">
          <TextField
            value={email}
            onChange={setEmail}
            disabled={isCodeSent}
            placeholder="이메일 주소 입력"
            errorMessage={
              !isEmailValid && email
                ? "이메일 주소를 다시 확인해주세요"
                : undefined
            }
            rightIcon={
              <button
                type="button"
                onClick={isCodeSent ? handleResend : handleSendCode}
                disabled={!isEmailValid}
                className={`w-[102px] h-[24px] rounded-full  typo-caption text-white
          ${
            isEmailValid
              ? "bg-[#202020] border-[#202020]"
              : "bg-[#C3C3C3] border-[#C3C3C3]"
          } disabled:cursor-not-allowed`}
              >
                {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
              </button>
            }
          />
        </div>
      </div>

      {/* 인증번호 입력 */}
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
          disabled={!isCodeSent}
          errorMessage={codeError}
        />

        <Button
          size="S"
          disabled={!isCodeSent || timeLeft === 0 || code.length !== 6}
          onClick={handleVerify}
          className="mt-[31px]"
        >
          <span className="typo-button">
            인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
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
    </div>
  );
}
