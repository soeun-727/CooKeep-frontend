import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import { verifyCurrentPassword, changePassword } from "../../api/user";

import pwIcon from "../../assets/login/key.svg";
import pwImage from "../../assets/login/pw.svg";
import openpwImage from "../../assets/signup/openpw.svg";
import checkIcon from "../../assets/signup/check.svg";

export default function EditPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const validatePassword = (pw: string) =>
    pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);

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
    <div className="relative min-h-screen bg-[#FAFAFA]">
      <div className="pt-[241px] w-[361px] mx-auto">
        <div className="typo-h1">비밀번호 변경</div>

        {/* 기존 비밀번호 */}
        <div className="mt-[12px]">
          <TextField
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(value) => {
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
            leftIcon={<img src={pwIcon} alt="" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={verifiedFromEmail}
              >
                <img
                  src={
                    isCurrentPwValid === true
                      ? checkIcon
                      : showCurrentPassword
                        ? openpwImage
                        : pwImage
                  }
                  alt=""
                />
              </button>
            }
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="mt-[5px]">
          <TextField
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
            leftIcon={<img src={pwIcon} alt="새 비밀번호 아이콘" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={
                    password && confirmPassword && isPasswordMatch
                      ? checkIcon
                      : showPassword
                        ? openpwImage
                        : pwImage
                  }
                  alt="비밀번호 토글"
                />
              </button>
            }
          />
        </div>

        {/* 새 비밀번호 확인 */}
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
              >
                <img
                  src={
                    password && confirmPassword && isPasswordMatch
                      ? checkIcon
                      : showPasswordConfirm
                        ? openpwImage
                        : pwImage
                  }
                  alt="비밀번호 확인 토글"
                />
              </button>
            }
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-[8px]">{error}</p>
        )}

        <Button
          size="L"
          variant="black"
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`mt-[31px] ${!isFormValid ? "" : "!text-[#32E389]"}`}
        >
          비밀번호 재설정
        </Button>
      </div>

      {/* 5회 실패 모달 */}
      {showAuthModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[254px] flex flex-col items-center pt-[25px] px-[28px] pb-[25px] gap-[16px] rounded-[10px] bg-white">
            <p className="typo-label text-[#111] text-center self-stretch">
              비밀번호가 5회 일치하지 않았어요
              <br />
              본인인증을 진행해 주세요
            </p>

            <Button
              size="S"
              variant="green"
              className="!w-full"
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
        </div>
      )}

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-result-title pt-[295px] pb-[18px]">
              비밀번호 변경 완료
            </p>
            <img src={checkIcon} alt="성공" className="w-[40px] h-[40px]" />
            <Button
              size="L"
              variant="black"
              className="mt-[48px] !text-[#32E389]"
              onClick={() => navigate("/settings")}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
