import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { useEditPasswordAuthStore } from "../../../stores/useEditPasswordAuthStore";
import { getMyProfile } from "../../../api/user";
import FindEmailAuthModal from "../../auth/find/FindEmailAuthModal";

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

  type ModalType = "send" | "verify" | "help" | "mismatch";
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

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
    setResendCount((prev) => prev + 1);
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
    <div className="pt-[241px] w-[361px] mx-auto">
      <div className="typo-h1">이메일 인증</div>

      <div className="mt-[12px]">
        <TextField
          value={email}
          onChange={setEmail}
          placeholder="이메일 주소 입력"
          disabled={isCodeSent}
          errorMessage={
            email && !isEmailValid
              ? "이메일 주소를 다시 확인해 주세요"
              : undefined
          }
          rightIcon={
            <button
              type="button"
              onClick={isCodeSent ? handleResend : handleSendCode}
              disabled={!isEmailValid || isSending || resendCount >= MAX_RESEND}
              className={`w-[102px] h-[24px] rounded-full typo-caption text-white
                ${isEmailValid ? "bg-[#202020]" : "bg-[#C3C3C3]"}
                disabled:cursor-not-allowed`}
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
            if (codeError) setCodeError(undefined);
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

      {/* 불일치 모달 */}
      {modalType === "mismatch" && (
        <>
          <div className="fixed inset-0 z-[100] bg-[rgba(17,17,17,0.5)]" />
          <div className="fixed z-[110] left-1/2 -translate-x-1/2 top-[343px] bg-white rounded-[10px] w-[240px] pt-[35px] px-[28px] pb-[25px] flex flex-col items-center gap-4">
            <p className="text-[14px] font-medium text-center leading-[20px] text-[#111111]">
              등록된 이메일과 일치하지 않습니다
            </p>
            <Button
              size="S"
              onClick={() => setModalType(null)}
              className="!w-[184px] !bg-[#32E389]"
            >
              확인
            </Button>
          </div>
        </>
      )}

      {modalType && modalType !== "mismatch" && (
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
