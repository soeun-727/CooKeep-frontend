import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";

import pwIcon from "@/assets/login/key.svg";
import openpwImage from "@/assets/login/openpw.svg";
import pwImage from "@/assets/login/pw.svg";
import mailIcon from "@/assets/signup/mail.svg";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

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
      <div className="mx-auto w-[361px] pt-[159px]">
        <div className="typo-h1">로그인</div>

        {/* 입력 영역 */}
        <div className="mt-[12px] flex flex-col">
          <TextField
            value={email}
            placeholder="이메일 주소 입력"
            onChange={setEmail}
            errorMessage={
              email && !isValidEmail ? "잘못된 이메일 주소입니다" : undefined
            }
            leftIcon={<img src={mailIcon} alt="" />}
          />

          <div className="mt-[5px]" />

          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
            onChange={setPassword}
            errorMessage={
              password.length > 0 && !isValidPW
                ? "잘못된 비밀번호입니다"
                : undefined
            }
            leftIcon={<img src={pwIcon} alt="" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex h-full items-center justify-center"
              >
                <img src={showPassword ? openpwImage : pwImage} alt="" />
              </button>
            }
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[31px] flex justify-center">
        <Button
          size="L"
          disabled={!canLogin || isSubmitting}
          onClick={handleLogin}
          className={`${
            !canLogin || isSubmitting ? "!text-gray-0" : "!text-green"
          }`}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
