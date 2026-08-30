import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateEmail } from "@/api/user";
import { useEmailUpdateStore } from "@/stores/useEmailUpdateStore";
import axios from "axios";

import CheckIcon from "@/assets/signup/check.svg?react";

import EmailAuthModal from "@/components/auth/signup/EmailAuthModal";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

import { EditEmailType } from "@/types/modal";

import { formatTime } from "@/utils/formateTime";
import { validateEmail } from "@/utils/validateUtil";
import { BackHeader } from "@/components/ui/BackHeader";
import { useAuthStore } from "@/stores/useAuthStore";

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
  const logout = useAuthStore(state => state.logout);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modalType, setModalType] = useState<EditEmailType | null>(null);

  const isEmailValid = validateEmail(email);

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
        reset(); // ★ 실패 시에도 store 초기화 → 이메일 입력창 다시 활성화
        setTimerActive(false);
        setCode("");
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
    <div className="relative flex min-h-screen flex-col gap-30 px-4">
      <BackHeader title="이메일 주소 변경" onBack={() => navigate(-1)} />

      <main className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-full px-1 py-2">
              <h1 className="typo-h2">이메일 인증</h1>
            </div>

            <div className="flex w-full flex-col">
              <InputField
                value={email}
                onChange={val => setEmail(val)}
                placeholder="새 이메일 주소 입력"
                disabled={isCodeSent}
                errorMessage={
                  email && !isEmailValid
                    ? "잘못된 이메일 주소입니다"
                    : undefined
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={!isEmailValid || isSending}
                    className={`typo-caption text-gray-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors disabled:cursor-not-allowed ${
                      isEmailValid ? "bg-gray-80" : "bg-gray-30"
                    } `}
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
              size="L"
              disabled={!isCodeSent || code.length !== 6 || timeLeft === 0}
              onClick={handleVerify}
            >
              인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setModalType("help")} // 이제 동작함
            className="typo-m w-full text-center text-gray-50 underline"
          >
            인증 번호가 발송되지 않나요?
          </button>
        </div>
      </main>

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
        <div className="fixed inset-0 z-[200] flex justify-center">
          <div className="bg-background flex h-full w-full max-w-[450px] flex-col">
            <div className="mt-[160px] flex flex-1 flex-col items-center gap-4 px-4">
              <CheckIcon className="text-green h-10 w-10" />
              <h2 className="typo-h2">이메일 주소 변경 완료</h2>
            </div>

            <div className="bg-blur-to-t p-4">
              <Button
                size="L"
                variant="green"
                onClick={async () => {
                  await logout();
                  navigate("/login", { replace: true });
                }}
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
