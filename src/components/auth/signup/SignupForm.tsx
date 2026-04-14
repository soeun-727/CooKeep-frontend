import { useState, useEffect } from "react";
import PhoneSection from "./PhoneSection";
import AccountSection from "./AccountSection";
import SuccessSection from "./SuccessSection";
import { useSignupStore } from "../../../stores/useSignupStore";
import { signup } from "../../../api/auth";
import { saveTokens } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneAuthModal from "./PhoneAuthModal";
import { registerPushNotification } from "../../../api/push";

interface Agreements {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  policy: boolean;
}

interface SignupFormProps {
  setHideHeader: (hide: boolean) => void;
}

export default function SignupForm({ setHideHeader }: SignupFormProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();

  useEffect(() => {
    setHideHeader(isFinished);
  }, [isFinished, setHideHeader]);

  // 전화 인증 결과만 구독
  const isVerified = useSignupStore((s) => s.isVerified);

  // 계정 정보
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 약관 동의
  const [agreements, setAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    marketing: false,
    policy: false,
  });

  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  const isPasswordMatch = password === passwordConfirm;
  const isRequiredAgreed = agreements.terms && agreements.privacy;

  const isSignupEnabled =
    isVerified && isPasswordValid && isPasswordMatch && isRequiredAgreed;

  const navigate = useNavigate();
  const rawPhoneNumber = useSignupStore((s) => s.phone);
  const phoneNumber = rawPhoneNumber.replace(/-/g, "");

  const [loading, setLoading] = useState(false);

  const [emailAlreadyModal, setEmailAlreadyModal] = useState(false);

  const handleSubmit = async () => {
    if (!isSignupEnabled || loading) {
      setServerError("모든 필수 항목을 확인해주세요.");
      return;
    }

    setServerError(undefined);
    setLoading(true);

    try {
      const res = await signup({
        phoneNumber,
        email,
        password,
        passwordConfirm,
        marketingConsent: agreements.marketing,
      });

      // 1. 토큰 저장
      saveTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });

      setIsFinished(true);

      if (agreements.marketing) {
        registerPushNotification().catch((err) => {
          console.error("회원가입 후 푸시 등록 실패 (비필수):", err);
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;
        if (code === "USER-002") {
          setServerError("이미 사용 중인 전화번호입니다.");
        } else if (code === "USER-003") {
          setServerError(undefined);
          setEmailAlreadyModal(true);
        } else {
          setServerError(
            err.response?.data?.message ?? "회원가입 중 오류가 발생했습니다.",
          );
        }
      } else {
        setServerError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAgreements = (next: Partial<Agreements>) => {
    setAgreements({ ...agreements, ...next });
  };

  if (isFinished) return <SuccessSection />;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      {!isVerified && <PhoneSection />}

      {isVerified && (
        <>
          <AccountSection
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            agreements={agreements}
            updateAgreements={updateAgreements}
            onSubmit={handleSubmit}
            isSignupEnabled={isSignupEnabled}
            setHideHeader={setHideHeader}
            loading={loading}
          />

          {serverError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {serverError}
            </p>
          )}
          {emailAlreadyModal && (
            <PhoneAuthModal
              type="already"
              email={email}
              authType="email"
              onConfirm={() => setEmailAlreadyModal(false)}
              onLogin={() => navigate("/login")}
            />
          )}
        </>
      )}
    </div>
  );
}
