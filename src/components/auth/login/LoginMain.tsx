import TextField from "../../ui/TextField";
import mailIcon from "../../../assets/signup/mail.svg";
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import openpwImage from "../../../assets/login/openpw.svg";
import Button from "../../ui/Button";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      <div className="pt-[159px] w-[361px] mx-auto">
        <div className="typo-h1">로그인</div>

        {/* 입력 영역 */}
        <div className="flex flex-col mt-[12px]">
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
                className="flex items-center justify-center h-full"
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
            !canLogin || isSubmitting ? "!text-white" : "!text-[#32E389]"
          }`}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
