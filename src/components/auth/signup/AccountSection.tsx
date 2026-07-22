import { useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import MailIcon from "@/assets/signup/mail.svg?react";
import PwIcon from "@/assets/login/key.svg?react";
import EyeIcon from "@/assets/login/pw.svg?react";
import EyeOpenIcon from "@/assets/signup/openpw.svg?react";
import CheckIcon from "@/assets/signup/check.svg?react";
import ArrowIcon from "@/assets/signup/arrowright.svg?react";
import BlankCheck from "@/assets/signup/blankCheck.svg?react";
import CheckboxCheckIcon from "@/assets/signup/checkboxCheck.svg?react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

import { AGREEMENTS } from "@/constants/agreements";
import { AgreementItem, AuthAgreements } from "@/types/auth";
import { validatePassword } from "@/utils/validateUtil";

import AgreementPage from "./AgreementPage";

interface AccountSectionProps {
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  agreements: AuthAgreements;
  updateAgreements: (next: Partial<AuthAgreements>) => void;
  onSubmit: () => void;
  isSignupEnabled: boolean;
  setHideHeader: (hide: boolean) => void;
  loading: boolean;
}

export default function AccountSection({
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  agreements,
  updateAgreements,
  onSubmit,
  isSignupEnabled,
  setHideHeader,
  loading,
}: AccountSectionProps) {
  const [agreementPage, setAgreementPage] = useState<AgreementItem | null>(
    null,
  );
  // store에서 인증된 이메일 읽기
  const verifiedEmail = useSignupStore(state => state.email);

  const isPasswordMatch = password === passwordConfirm;
  const isAllChecked =
    agreements.terms && agreements.privacy && agreements.marketing;

  // 각 입력창별로 비밀번호 표시 여부
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  console.log("agreements", agreements);

  return (
    <>
      {agreementPage ? (
        <AgreementPage
          agreement={agreementPage}
          isChecked={agreements[agreementPage.key]}
          updateAgreements={updateAgreements}
          onBack={() => {
            setAgreementPage(null);
            setHideHeader(false);
          }}
          onConfirm={key => {
            updateAgreements({ [key]: true });
            setAgreementPage(null);
            setHideHeader(false);
          }}
        ></AgreementPage>
      ) : (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-between px-4 pb-[34px]">
          {/* 헤더 아래부터 */}
          <div className="flex flex-col items-center gap-[60px] pt-[100px]">
            {/* 내용 */}
            <div className="flex w-full flex-col items-center gap-4">
              {/* 제목 */}
              <div className="flex w-full items-start gap-2 px-1 py-2">
                <h1 className="typo-h2 flex-1">회원가입</h1>
              </div>
              {/* 입력 영역 */}
              <div className="flex w-full flex-col">
                {/* 인증된 이메일 - 읽기 전용으로 표시 */}
                <InputField
                  value={verifiedEmail}
                  placeholder="이메일 주소"
                  onChange={() => {}}
                  disabled
                  leftIcon={<MailIcon className="h-6 w-6" />}
                />

                {/* 비밀번호 */}
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
                  errorMessage={
                    password && !validatePassword(password)
                      ? "영문, 숫자 포함 8자 이상의 비밀번호를 사용해 주세요"
                      : undefined
                  }
                  successMessage={
                    password && validatePassword(password)
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
                      {password && passwordConfirm && isPasswordMatch ? (
                        <CheckIcon className="text-semantic-positive h-6 w-6" />
                      ) : showPassword ? (
                        <EyeOpenIcon className="h-6 w-6" />
                      ) : (
                        <EyeIcon className="h-6 w-6" />
                      )}
                    </button>
                  }
                />

                {/* 비밀번호 확인 */}
                <InputField
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={setPasswordConfirm}
                  placeholder="비밀번호 확인"
                  errorMessage={
                    passwordConfirm && !isPasswordMatch
                      ? "비밀번호가 일치하지 않습니다"
                      : undefined
                  }
                  successMessage={
                    passwordConfirm && isPasswordMatch
                      ? "비밀번호가 일치합니다"
                      : undefined
                  }
                  leftIcon={<PwIcon className="h-6 w-6" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      className="flex h-6 w-6 items-center justify-center"
                    >
                      {password && passwordConfirm && isPasswordMatch ? (
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
            </div>
          </div>

          {/* Main Container: 약관 ~ 버튼 */}
          <div className="flex w-full flex-col items-center pt-8">
            {/* Content */}
            <div className="flex w-full flex-col items-center gap-4">
              {/* 전체동의 */}
              <div className="flex w-full flex-col items-start">
                <label className="border-gray-10 flex h-12 w-full items-center gap-3 rounded-xl border bg-white px-3">
                  <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={e =>
                        updateAgreements({
                          terms: e.target.checked,
                          privacy: e.target.checked,
                          marketing: e.target.checked,
                        })
                      }
                      className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none"
                    />

                    <BlankCheck className="pointer-events-none h-6 w-6 peer-checked:hidden" />

                    <CheckboxCheckIcon className="text-green pointer-events-none hidden h-6 w-6 peer-checked:block" />
                  </div>
                  <span className="typo-m-strong text-gray-80 flex-1">
                    약관 전체동의
                  </span>
                </label>
              </div>

              {/* 개별 약관 박스 */}
              <div className="flex w-full flex-col items-start">
                {AGREEMENTS.map(item => (
                  <div
                    key={item.key}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5"
                  >
                    <label className="flex flex-1 cursor-pointer items-center gap-3">
                      {item.key !== "policy" ? (
                        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                          <input
                            type="checkbox"
                            checked={agreements[item.key]}
                            onChange={e =>
                              updateAgreements({
                                [item.key]: e.target.checked,
                              })
                            }
                            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none"
                          />

                          <BlankCheck className="pointer-events-none h-6 w-6 peer-checked:hidden" />

                          <CheckboxCheckIcon className="pointer-events-none hidden h-6 w-6 text-gray-50 peer-checked:block" />
                        </div>
                      ) : (
                        <span className="inline-block h-6 w-6" />
                      )}

                      <span className="typo-m flex-1 text-gray-50">
                        {item.label}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setAgreementPage(item);
                        setHideHeader(true);
                      }}
                    >
                      <ArrowIcon className="h-6 w-6" />
                    </button>
                  </div>
                ))}
              </div>

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                size="L"
                variant="black"
                disabled={!isSignupEnabled || loading}
                onClick={onSubmit}
              >
                {loading ? "가입 중..." : "회원가입"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
