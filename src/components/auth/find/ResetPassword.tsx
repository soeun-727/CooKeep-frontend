import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPasswordApi } from "@/api/auth";
import { useFindPasswordStore } from "@/stores/useFindPasswordStore";
import axios from "axios";

import pwIcon from "@/assets/login/key.svg";
import pwImage from "@/assets/login/pw.svg";
import checkIcon from "@/assets/signup/check.svg";
import openpwImage from "@/assets/signup/openpw.svg";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

export default function ResetPassword() {
  const { email, isVerified, reset } = useFindPasswordStore();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const validatePassword = (pw: string) =>
    pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);

  useEffect(() => {
    if (!isSuccess && (!isVerified || !email)) {
      navigate("/find");
    }
  }, [isVerified, email, isSuccess, navigate]);

  const isPasswordValid = password ? validatePassword(password) : false;
  const isPasswordMatch =
    password && confirmPassword ? password === confirmPassword : false;

  const getPasswordIcon = () => {
    if (password && confirmPassword && isPasswordMatch) return checkIcon;
    return showPassword ? openpwImage : pwImage;
  };

  const getPasswordConfirmIcon = () => {
    if (password && confirmPassword && isPasswordMatch) return checkIcon;
    return showPasswordConfirm ? openpwImage : pwImage;
  };

  const isFormValid = isPasswordValid && isPasswordMatch;

  const handleSubmit = async () => {
    if (!validatePassword(password)) {
      setError("비밀번호는 8자리 이상, 영문+숫자를 포함해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await resetPasswordApi(email, password, confirmPassword);

      setError(undefined);
      setIsSuccess(true);
      // reset(); // store 초기화
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          setError("요청 값이 올바르지 않습니다.");
          return;
        }
      }

      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mx-auto w-[361px] pt-[241px]">
      <div className="typo-h1">비밀번호 변경하기</div>
      <div className="mt-[12px]">
        <TextField
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
          autoComplete="new-password"
          errorMessage={
            password && !isPasswordValid
              ? "영문, 숫자 포함 8자 이상의 비밀번호를 사용해 주세요"
              : undefined
          }
          successMessage={
            password && isPasswordValid
              ? "사용 가능한 비밀번호입니다"
              : undefined
          }
          leftIcon={<img src={pwIcon} alt="비밀번호 아이콘" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex h-full items-center justify-center"
            >
              <img src={getPasswordIcon()} alt="비밀번호 토글 아이콘" />
            </button>
          }
        />
      </div>

      <div className="mt-[5px]">
        <TextField
          type={showPasswordConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          errorMessage={
            confirmPassword && !isPasswordMatch
              ? "비밀번호가 일치하지 않습니다"
              : undefined
          }
          successMessage={
            confirmPassword && isPasswordMatch
              ? "비밀번호가 일치합니다"
              : undefined
          }
          leftIcon={<img src={pwIcon} alt="비밀번호 확인 아이콘" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="flex h-full items-center justify-center"
            >
              <img
                src={getPasswordConfirmIcon()}
                alt="비밀번호 확인 토글 아이콘"
              />
            </button>
          }
        />
      </div>

      {error && (
        <p className="text-semantic-negative text-center text-sm">{error}</p>
      )}

      <Button
        type="submit"
        size="L"
        variant="black"
        disabled={!isFormValid}
        onClick={handleSubmit}
        className="!text-green disabled:!text-gray-0 mt-[31px]"
      >
        비밀번호 재설정
      </Button>

      {/* AppLayout 영역 전체를 덮는 팝업 */}
      {isSuccess && (
        <div className="bg-background absolute inset-0 z-50 flex justify-center">
          <div className="flex w-[361px] flex-col items-center">
            <p className="typo-h1 text-gray-80 pt-[241px] pb-[18px] text-center text-[28px] leading-[36px] font-bold">
              비밀번호 변경 완료
            </p>
            {/*중앙정렬 안하고 피그마 기준으로 pt-[241px] 이걸로 맞춤*/}

            <img
              src={checkIcon}
              alt="성공 아이콘"
              className="h-[40px] w-[40px]"
            />
            <Button
              size="L"
              variant="black"
              onClick={() => {
                reset();
                navigate("/login");
              }}
              className="!text-green mt-[48px]"
            >
              로그인하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
