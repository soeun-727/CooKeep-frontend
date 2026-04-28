// src/pages/settings/components/PhoneVerifySection.tsx
import { useState, useEffect } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import PhoneAuthModal from "../../auth/signup/EmailAuthModal";
import { usePhoneUpdateStore } from "../../../stores/usePhoneUpdateStore";

type ModalType = "send" | "verify" | "help";

interface PhoneVerifySectionProps {
  onSuccess: () => void;
}

export default function PhoneVerifySection({
  onSuccess,
}: PhoneVerifySectionProps) {
  const { phone, setPhone, isCodeSent, requestSendCode, requestVerifyCode } =
    usePhoneUpdateStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isPhoneValid = /^01[0-9]{9}$/.test(phone.replace(/-/g, ""));

  // 숫자에 하이픈을 자동으로 넣어주는 함수
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/[^\d]/g, ""); // 숫자만 남기기
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  /* =====================
     타이머
  ====================== */
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  /* =====================
     인증번호 발송 / 재발송
  ====================== */
  const handleSendCode = async () => {
    const result = await requestSendCode();

    if (result.success) {
      setCode("");
      setCodeError(undefined);
      setTimeLeft(300);
      setTimerActive(true);
      setModalType("send");
    } else {
      if (result.errorStatus === 409) {
        alert("이미 사용 중인 번호입니다.");
      } else if (result.errorStatus === 429) {
        alert("재요청이 너무 빠릅니다. 잠시 후 시도해주세요.");
      } else {
        alert("인증번호 발송에 실패했습니다.");
      }
    }
  };

  const handleResend = handleSendCode;

  /* =====================
     인증 확인
  ====================== */
  const handleVerify = async () => {
    if (timeLeft === 0) {
      setCodeError("인증번호가 만료되었습니다");
      return;
    }

    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }

    // 수정: verifyCode -> requestVerifyCode (Store의 실제 API 호출 함수)
    const result = await requestVerifyCode(code);

    // PhoneVerifySection.tsx 내의 handleVerify 함수 중 일부
    if (result.success) {
      setCodeError(undefined);
      setModalType("verify");
    } else {
      if (result.errorStatus === 429) {
        setCodeError("인증 시도 횟수를 초과했습니다.");
      } else if (result.errorStatus === 404) {
        setCodeError("인증 요청 내역이 없습니다.");
      } else if (result.errorStatus === 400) {
        // 🔹 400 에러 처리 추가 (인증번호 불일치 등)
        setCodeError("인증번호가 일치하지 않습니다.");
      } else {
        setCodeError("인증번호를 다시 확인해 주세요.");
      }
    }
  };

  return (
    <div className="pt-[241px] w-[361px] mx-auto">
      <div className="typo-h1">휴대폰 번호 변경</div>

      {/* 전화번호 입력 */}
      <div className="relative mt-[12px]">
        <TextField
          value={formatPhoneNumber(phone)}
          onChange={(val) => {
            // 3. 숫자가 아닌 문자는 모두 제거하고 11자까지만 저장
            const onlyNumber = val.replace(/[^\d]/g, "");
            if (onlyNumber.length <= 11) {
              setPhone(onlyNumber);
            }
          }}
          placeholder="새 휴대폰 번호(- 없이 숫자만 입력)"
          errorMessage={
            !isPhoneValid && phone
              ? "휴대폰 번호를 다시 확인해주세요"
              : undefined
          }
          rightIcon={
            <button
              type="button"
              onClick={isCodeSent ? handleResend : handleSendCode}
              disabled={!isPhoneValid}
              className={`
                w-[102px] h-[24px] rounded-full typo-caption text-white
                ${
                  isPhoneValid
                    ? "bg-[#202020] border-[#202020]"
                    : "bg-[#C3C3C3] border-[#C3C3C3]"
                }
              `}
            >
              {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
            </button>
          }
        />
      </div>

      {/* 인증번호 입력 */}
      <div className="mt-[5px]">
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
          disabled={!isCodeSent || modalType === "send"} // 🔹 발송 후 바로 입력 불가 + 회색 처리
          errorMessage={codeError}
        />
      </div>

      {/* 인증 확인 버튼 */}
      <Button
        size="S"
        className="mt-[31px]"
        disabled={!isCodeSent || code.length !== 6 || timeLeft === 0}
        onClick={handleVerify}
      >
        인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
      </Button>

      {/* 도움말 버튼 */}
      <button
        type="button"
        onClick={() => setModalType("help")}
        className="
          mt-6
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

      {/* 모달 */}
      {modalType && (
        <PhoneAuthModal
          type={modalType}
          // phone={phone}
          onConfirm={() => {
            if (modalType === "verify") {
              onSuccess(); // 부모(EditPhonePage)에게 성공 알림
            }
            setModalType(null);
          }}
        />
      )}
    </div>
  );
}
