import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { changePassword, verifyCurrentPassword } from "@/api/user";
import axios from "axios";

import PwIcon from "@/assets/login/key.svg?react";
import EyeIcon from "@/assets/login/pw.svg?react";
import EyeOpenIcon from "@/assets/signup/openpw.svg?react";
import CheckIcon from "@/assets/signup/check.svg?react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { BackHeader } from "@/components/ui/BackHeader";

import { validatePassword } from "@/utils/validateUtil";

import { useAuthStore } from "@/stores/useAuthStore";

export default function EditPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

  const verifiedFromEmail = location.state?.verifiedBy === "email";

  // 기존 비밀번호
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPwValid, setIsCurrentPwValid] = useState<boolean | null>(
    verifiedFromEmail ? true : null,
  );

  // UI 상태
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const MAX_ATTEMPTS = 5;
  const [currentPwFailCount, setCurrentPwFailCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 새 비밀번호
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  const isPasswordValid = password ? validatePassword(password) : false;
  const isPasswordMatch =
    password && confirmPassword ? password === confirmPassword : false;

  const isFormValid =
    (isCurrentPwValid === true || verifiedFromEmail) &&
    isPasswordValid &&
    isPasswordMatch;

  // 기존 비밀번호 검증
  const handleCurrentPasswordBlur = async () => {
    if (!currentPassword) return;
    if (isCurrentPwValid === true) return;
    if (verifiedFromEmail) return; // 본인인증으로 이미 검증됨

    if (currentPwFailCount >= MAX_ATTEMPTS) {
      setShowAuthModal(true);
      return;
    }

    try {
      await verifyCurrentPassword(currentPassword);
      setIsCurrentPwValid(true);
      setCurrentPwFailCount(0);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 423) {
          // 5회 초과
          setShowAuthModal(true);
          return;
        }

        if (status === 400) {
          const next = currentPwFailCount + 1;
          setCurrentPwFailCount(next);
          setIsCurrentPwValid(false);

          if (next >= MAX_ATTEMPTS) {
            setShowAuthModal(true);
          }
        }
      }
    }
  };

  // 비밀번호 변경
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await changePassword(password, confirmPassword);
      setIsSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          setError(
            "비밀번호 형식이 올바르지 않거나 기존 비밀번호와 동일합니다.",
          );
        } else if (status === 403) {
          setError("소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.");
        } else {
          setError("비밀번호 변경 중 오류가 발생했습니다.");
        }
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (!location.state?.fromSettings && !verifiedFromEmail) {
      navigate("/settings", { replace: true });
    }
  }, [location.state, verifiedFromEmail, navigate]);

  return (
    <div className="flex min-h-screen flex-col gap-30 px-4">
      <BackHeader title="비밀번호 변경" onBack={() => navigate(-1)} />

      <main className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="typo-h2 w-full px-1 py-2">새 비밀번호 입력</h2>

            {/* 기존 비밀번호 */}
            <div className="flex w-full flex-col">
              <InputField
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={value => {
                  setCurrentPassword(value);
                  setIsCurrentPwValid(null);
                  setError(undefined);
                }}
                onBlur={handleCurrentPasswordBlur}
                placeholder="기존 비밀번호"
                autoComplete="current-password"
                disabled={verifiedFromEmail} // 본인인증 완료 시 비활성화
                errorMessage={
                  isCurrentPwValid === false
                    ? `기존 비밀번호를 다시 확인해 주세요 (${currentPwFailCount}/${MAX_ATTEMPTS})`
                    : undefined
                }
                successMessage={
                  isCurrentPwValid === true
                    ? verifiedFromEmail
                      ? "본인인증이 완료되었습니다"
                      : "기존 비밀번호가 확인되었습니다"
                    : undefined
                }
                leftIcon={<PwIcon className="h-6 w-6" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={verifiedFromEmail}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    {isCurrentPwValid === true ? (
                      <CheckIcon className="text-semantic-positive h-6 w-6" />
                    ) : showCurrentPassword ? (
                      <EyeOpenIcon className="h-6 w-6" />
                    ) : (
                      <EyeIcon className="h-6 w-6" />
                    )}
                  </button>
                }
              />

              {/* 새 비밀번호 */}
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
              className={"mt-auto"}
            >
              비밀번호 재설정
            </Button>
          </div>
        </div>
      </main>
      {/* 5회 실패 모달 */}
      {showAuthModal && (
        <>
          {/* Overlay */}
          <div className="bg-black-overlay fixed inset-0 z-[100]" />

          {/* Modal */}
          <div className="bg-gray-0 shadow-container fixed top-1/2 left-1/2 z-[110] flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 rounded-xl p-6">
            <p className="typo-l-strong text-center whitespace-pre-wrap">
              비밀번호가 5회 일치하지 않았어요
              <br />
              본인인증을 진행해 주세요
            </p>

            <Button
              size="S"
              variant="black"
              className="w-full"
              onClick={() => {
                setShowAuthModal(false);
                navigate("/settings/password/verify", {
                  state: { fromPasswordFail: true },
                });
              }}
            >
              본인인증
            </Button>
          </div>
        </>
      )}

      {/* 성공 오버레이 */}
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
              onClick={async () => {
                await logout();
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
