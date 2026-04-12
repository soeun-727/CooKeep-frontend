import TextField from "../../ui/TextField";
import phoneIcon from "../../../assets/login/phone.svg";
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
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    isValidPhone,
    isValidPW,
    canLogin,
    login,
    isSubmitting,
  } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (value: string) => {
    // 1. 숫자만 남기기
    const input = value.replace(/\D/g, "");
    const size = input.length;

    // 2. 입력된 숫자 길이에 따라 실시간으로 하이픈 배치
    let formatted = "";

    if (size < 4) {
      formatted = input;
    } else if (size < 8) {
      // 010-1234 형태
      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else {
      // 010-1234-5678 형태
      formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }

    // 3. Store 상태 업데이트 (최대 13자)
    setPhoneNumber(formatted);
  };

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
      <div className="pt-[159px] w-[352px] mx-auto">
        <div className="typo-h1">로그인</div>

        {/* 입력 영역 */}
        <div className="flex flex-col mt-[12px]">
          <TextField
            value={phoneNumber}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            onChange={handlePhoneChange}
            errorMessage={
              phoneNumber.length > 0 && !isValidPhone
                ? "잘못된 휴대폰 번호입니다"
                : undefined
            }
            leftIcon={<img src={phoneIcon} alt="" />}
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
