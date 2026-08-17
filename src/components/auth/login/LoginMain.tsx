import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";

import PwIcon from "@/assets/login/key.svg?react";
import MailIcon from "@/assets/signup/mail.svg?react";
import EyeIcon from "@/assets/login/pw.svg?react";
import EyeOpenIcon from "@/assets/login/openpw.svg?react";
import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import LoginFooter from "./LoginFooter";

export default function LoginMain() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isValidEmail,
    isValidPW,
    canLogin,
    login,
    isSubmitting,
  } = useAuthStore();

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const result = await login();

    if (result?.success) {
      if (result.isFirst) {
        navigate("/onboarding");
      } else {
        navigate("/fridge");
      }
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-4">
          <div className="w-full px-1 py-2">
            <h1 className="typo-h2">로그인</h1>
          </div>

          {/* 입력 영역 */}
          <div className="flex w-full flex-col">
            <InputField
              value={email}
              placeholder="이메일 주소 입력"
              onChange={setEmail}
              errorMessage={
                email && !isValidEmail ? "잘못된 이메일 주소입니다" : undefined
              }
              leftIcon={<MailIcon className="h-6 w-6" />}
              inputRef={emailInputRef}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              rightIcon={
                isEmailFocused && email ? (
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      setEmail("");
                      emailInputRef.current?.focus();
                    }}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <ClearIcon className="h-6 w-6" />
                  </button>
                ) : undefined
              }
            />

            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
              onChange={setPassword}
              errorMessage={
                password.length > 0 && !isValidPW
                  ? "잘못된 비밀번호입니다"
                  : undefined
              }
              leftIcon={<PwIcon className="h-6 w-6" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex h-full items-center justify-center"
                >
                  {showPassword ? (
                    <EyeOpenIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              }
            />
          </div>
        </div>

        {/* 버튼 */}
        <Button
          size="L"
          disabled={!canLogin || isSubmitting}
          onClick={handleLogin}
        >
          로그인
        </Button>

        <LoginFooter />
      </div>
    </>
  );
}
