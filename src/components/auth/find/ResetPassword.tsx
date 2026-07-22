import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPasswordApi } from "@/api/auth";
import { useFindPasswordStore } from "@/stores/useFindPasswordStore";
import axios from "axios";

import PwIcon from "@/assets/login/key.svg?react";
import EyeIcon from "@/assets/login/pw.svg?react";
import EyeOpenIcon from "@/assets/signup/openpw.svg?react";
import CheckIcon from "@/assets/signup/check.svg?react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

import { validatePassword } from "@/utils/validateUtil";

export default function ResetPassword() {
  const { email, isVerified, reset } = useFindPasswordStore();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess && (!isVerified || !email)) {
      navigate("/find");
    }
  }, [isVerified, email, isSuccess, navigate]);

  const isPasswordValid = password ? validatePassword(password) : false;
  const isPasswordMatch =
    password && confirmPassword ? password === confirmPassword : false;

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
    <div className="bg-background flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col px-4 pt-[40px]">
        <div className="mt-[120px] flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="typo-h2 w-full px-1 py-2">비밀번호 변경하기</h2>

            {/* 새 비밀번호 */}
            <div className="flex w-full flex-col">
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="영문, 숫자 포함 8자 이상의 새 비밀번호"
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
                leftIcon={<PwIcon className="h-6 w-6" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    {password && confirmPassword && isPasswordMatch ? (
                      <CheckIcon className="text-semantic-positive h-6 w-6" />
                    ) : showPassword ? (
                      <EyeOpenIcon className="h-6 w-6" />
                    ) : (
                      <EyeIcon className="h-6 w-6" />
                    )}
                  </button>
                }
              />

              {/* 새 비밀번호 확인 */}
              <InputField
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
                leftIcon={<PwIcon className="h-6 w-6" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    {password && confirmPassword && isPasswordMatch ? (
                      <CheckIcon className="text-semantic-positive h-6 w-6" />
                    ) : showPasswordConfirm ? (
                      <EyeOpenIcon className="h-6 w-6" />
                    ) : (
                      <EyeIcon className="h-6 w-6" />
                    )}
                  </button>
                }
              />
            </div>

            {error && (
              <p className="text-semantic-negative mt-[8px] text-center text-sm">
                {error}
              </p>
            )}

            <Button
              size="L"
              variant="black"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              비밀번호 재설정
            </Button>
          </div>
        </div>
      </main>

      {isSuccess && (
        <div className="bg-background fixed inset-0 z-[200] flex flex-col">
          <div className="mt-[160px] flex flex-col items-center gap-4 px-4">
            <CheckIcon className="text-green h-10 w-10" />
            <h2 className="typo-h2">비밀번호 변경 완료</h2>
          </div>
          <div className="bg-blur-to-t mt-auto p-4 pt-6">
            <Button
              size="L"
              variant="green"
              onClick={() => {
                reset();
                navigate("/login", { replace: true });
              }}
            >
              로그인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
