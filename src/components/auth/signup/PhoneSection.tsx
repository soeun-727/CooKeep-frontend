import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import PhoneAuthModal from "./PhoneAuthModal";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../../stores/useSignupStore";
import axios from "axios";

export default function PhoneSection() {
  const { phone, setPhone, isCodeSent, isVerified, sendCode, verifyCode } =
    useSignupStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "already" | "help";
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isPhoneValid = /^010-\d{3,4}-\d{4}$/.test(phone);
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
    if (!isPhoneValid || isSending) return;

    try {
      setIsSending(true);
      setCode("");
      setCodeError(undefined);

      setTimeLeft(300);
      setTimerActive(true);

      await sendCode(); // 실제 API 호출

      setModalType("send");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 409) {
          // 이미 가입된 번호
          setModalType("already");
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

  const handleResend = () => handleSendCode();

  const handlePhoneChange = (value: string) => {
    const input = value.replace(/\D/g, "");
    const size = input.length;

    let formatted = "";
    if (size < 4) {
      formatted = input;
    } else if (size < 8) {
      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else {
      formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }
    setPhone(formatted);
  };
  return (
    <div className="pt-[241px] w-[352px] mx-auto">
      {/* 전화번호 입력 + 발송 버튼 */}
      <div className="relative w-[361px]">
        <div className="typo-h1">휴대폰 인증</div>
        <div className="relative mt-[12px]">
          <TextField
            value={phone}
            onChange={handlePhoneChange}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            disabled={isVerified}
            errorMessage={
              !isPhoneValid && phone
                ? "휴대폰 번호를 다시 확인해주세요"
                : undefined
            }
            rightIcon={
              <button
                type="button"
                onClick={isCodeSent ? handleResend : handleSendCode}
                disabled={!isPhoneValid || isSending} // disabled={!isPhoneValid || (isCodeSent && timeLeft > 0)}
                className={`w-[102px] h-[24px] rounded-full  typo-caption text-white
          ${
            isPhoneValid // isPhoneValid && !(isCodeSent && timeLeft > 0)
              ? "bg-[#202020] border-[#202020]"
              : "bg-[#C3C3C3] border-[#C3C3C3]"
          }
          disabled:cursor-not-allowed
        `}
              >
                {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
              </button>
            }
          />
        </div>
      </div>

      {/* 인증번호 입력 + 인증 확인 버튼 */}
      <div className="mt-[5px] w-[361px]">
        <TextField
          value={code}
          onChange={(value) => {
            const onlyNumber = value.replace(/[^0-9]/g, "");
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

        <Button
          size="S"
          disabled={
            !isCodeSent || isVerified || timeLeft === 0 || code.length !== 6
          }
          onClick={handleVerify}
          className="mt-[31px]"
        >
          <span className="typo-button">
            인증 확인 {isCodeSent && !isVerified && `(${formatTime(timeLeft)})`}
          </span>
        </Button>
        <button
          type="button"
          onClick={() => setModalType("help")}
          className="
    mt-3
    w-[361px]
    typo-caption
    text-[#7D7D7D]
    text-center
    underline
    cursor-pointer
    bg-transparent
  "
        >
          인증 번호가 발송되지 않나요?
        </button>
      </div>

      {/* 모달 (화면 암전 없이, 발송/인증 확인 분기) */}
      {modalType && (
        <PhoneAuthModal
          type={modalType}
          phone={phone}
          onConfirm={() => {
            if (modalType === "verify") {
              useSignupStore.getState().setIsVerified(true);
            }
            setModalType(null);
          }}
          onLogin={() => {
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
