// src/pages/settings/EditEmailPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import checkIcon from "../../assets/signup/check.svg";
import mailIcon from "../../assets/signup/mail.svg";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import axios from "axios";
import { updateEmail } from "../../api/user";

export default function EditEmailPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // 이메일 유효성 체크
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(value));
  };

  const onSubmit = async () => {
    if (!isEmailValid || loading) return;

    try {
      setLoading(true);
      await updateEmail(email);
      setIsSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          alert("현재 이메일과 동일하거나 형식이 올바르지 않습니다.");
        } else if (status === 401) {
          alert("로그인이 필요합니다.");
        } else if (status === 403) {
          alert("소셜 로그인 사용자는 이메일을 변경할 수 없습니다.");
        } else if (status === 409) {
          alert("이미 사용 중인 이메일입니다.");
        } else {
          alert("이메일 변경 중 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      {/* 이메일 입력 영역 */}
      <div className="pt-[241px]">
        <div className="mx-auto w-[361px]">
          <div className="typo-h1">이메일 주소 변경</div>

          <div className="mt-[12px]">
            <TextField
              value={email}
              onChange={(val) => {
                setEmail(val);
                validateEmail(val);
              }}
              placeholder="새 이메일 주소 입력"
              errorMessage={
                email && !isEmailValid
                  ? "이메일 주소를 다시 확인해 주세요"
                  : undefined
              }
              successMessage={
                email && isEmailValid ? "사용 가능한 이메일입니다" : undefined
              }
              leftIcon={<img src={mailIcon} alt="메일 아이콘" />}
            />
          </div>

          <div className="mt-[31px]">
            <Button
              type="submit"
              size="L"
              disabled={!isEmailValid || loading}
              onClick={onSubmit}
            >
              {loading ? "변경 중..." : "이메일 주소 변경"}
            </Button>
          </div>
        </div>
      </div>

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-result-title w-full pt-[295px] pb-[18px]">
              이메일 주소 변경 완료
            </p>

            <img src={checkIcon} alt="성공" className="w-[40px] h-[40px]" />

            <Button
              size="L"
              variant="black"
              className="mt-[48px]"
              onClick={() => navigate("/settings")}
            >
              완료
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
