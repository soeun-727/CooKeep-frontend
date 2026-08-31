import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyProfile } from "@/api/user";
import { useEditPasswordAuthStore } from "@/stores/useEditPasswordAuthStore";
import axios from "axios";

import FindEmailAuthModal from "@/components/auth/find/FindEmailAuthModal";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

import { EditPasswordEmailType } from "@/types/modal";

import { formatTime } from "@/utils/formateTime";
import { validateEmail } from "@/utils/validateUtil";

export default function EditPasswordEmailSection() {
  const navigate = useNavigate();
  const { email, setEmail, isCodeSent, sendCode, verifyCode, reset } =
    useEditPasswordAuthStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [modalType, setModalType] = useState<EditPasswordEmailType | null>(
    null,
  );

  const isEmailValid = validateEmail(email);

  // 등록된 이메일 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setRegisteredEmail(res.data.email);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  // 타이머
  useEffect(() => {
    if (!timerActive) return;
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimerActive(false);
        setTimeLeft(0);
        setCodeError("인증번호가 만료되었습니다");
      } else {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const [resendCount, setResendCount] = useState(0);
  const MAX_RESEND = 3;

  const handleSendCode = async () => {
    if (!isEmailValid || isSending) return;

    // 등록된 이메일과 일치 여부 확인
    if (email !== registeredEmail) {
      setModalType("mismatch");
      return;
    }

    setCode("");
    setCodeError(undefined);
    setTimeLeft(300);
    setTimerActive(true);

    try {
      setIsSending(true);
      await sendCode();
      setModalType("send");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 429) {
          setCodeError("인증 요청이 너무 빠릅니다");
        } else {
          setCodeError("인증번호 발송에 실패했습니다");
        }
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleResend = async () => {
    if (resendCount >= MAX_RESEND) {
      setCodeError("인증번호 재발송 횟수를 초과했습니다");
      return;
    }
    setResendCount(prev => prev + 1);
    await handleSendCode();
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }
    try {
      const success = await verifyCode(code);
      if (success) {
        setTimerActive(false);
        setModalType("verify");
      } else {
        setCodeError("인증번호를 다시 입력해 주세요");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) setCodeError("인증번호가 일치하지 않습니다");
        else if (status === 404) setCodeError("인증 요청 내역이 없습니다");
        else if (status === 429) setCodeError("인증 시도 횟수를 초과했습니다");
        else setCodeError("인증 중 오류가 발생했습니다");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col gap-[120px] px-4">
      <BackHeader title="본인 인증" onBack={() => navigate(-1)} />

      <main className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="w-full px-1 py-2">
            <h1 className="typo-h2">이메일 인증</h1>
          </div>
          <div>
            <InputField
              value={email}
              onChange={setEmail}
              placeholder="이메일 주소 입력"
              disabled={isCodeSent}
              errorMessage={
                email && !isEmailValid ? "잘못된 이메일 주소입니다" : undefined
              }
              rightIcon={
                <button
                  type="button"
                  onClick={isCodeSent ? handleResend : handleSendCode}
                  disabled={
                    !isEmailValid || isSending || resendCount >= MAX_RESEND
                  }
                  className={`typo-caption text-gray-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors disabled:cursor-not-allowed ${
                    isEmailValid ? "bg-gray-80" : "bg-gray-30"
                  }`}
                >
                  {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
                </button>
              }
            />

            <InputField
              value={code}
              onChange={v => {
                const onlyNumber = v.replace(/[^0-9]/g, "");
                setCode(onlyNumber);
                if (codeError) setCodeError(undefined);
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
            <span className="typo-button">
              인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
            </span>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setModalType("help")}
          className="typo-m w-full text-center text-gray-50 underline"
        >
          인증 번호가 발송되지 않나요?
        </button>
      </main>

      {modalType && (
        <FindEmailAuthModal
          type={modalType}
          email={email}
          onConfirm={() => {
            if (modalType === "verify") {
              reset();
              navigate("/settings/password", {
                state: { verifiedBy: "email" },
              });
            }
            setModalType(null);
          }}
        />
      )}
    </div>
  );
}
