import { useState } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { AGREEMENTS, AGREEMENT_NOTICE } from "../../../constants/agreements";
import { useSignupStore } from "../../../stores/useSignupStore";
import mailIcon from "../../../assets/signup/mail.svg";
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import openpwImage from "../../../assets/signup/openpw.svg";
import checkIcon from "../../../assets/signup/check.svg";
import arrowIcon from "../../../assets/signup/arrowright.svg";
import AgreementPage from "./AgreementPage";
import type { AgreementItem } from "../../../constants/agreements";
import { blankCheck, grayCheck, greenCheck } from "../../../assets";

interface Agreements {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  policy: boolean;
}

interface AccountSectionProps {
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  agreements: Agreements;
  updateAgreements: (next: Partial<Agreements>) => void;
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
  const verifiedEmail = useSignupStore((state) => state.email);

  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordMatch = password === passwordConfirm;
  const isAllChecked =
    agreements.terms && agreements.privacy && agreements.marketing;

  // 각 입력창별로 비밀번호 표시 여부
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 아이콘 결정 함수
  const getPasswordIcon = () => {
    if (password && passwordConfirm && isPasswordMatch) return checkIcon;
    return showPassword ? openpwImage : pwImage;
  };

  const getPasswordConfirmIcon = () => {
    if (password && passwordConfirm && isPasswordMatch) return checkIcon;
    return showPasswordConfirm ? openpwImage : pwImage;
  };
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
          onConfirm={(key) => {
            updateAgreements({ [key]: true });
            setAgreementPage(null);
            setHideHeader(false);
          }}
        >
          <p className="typo-label text-center whitespace-pre-line">
            {AGREEMENT_NOTICE[agreementPage.key]}
          </p>
        </AgreementPage>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col w-full px-5 pb-[34px]">
          <div className="flex-1 overflow-y-auto no-scrollbar pt-[108px]">
            {/* 제목 */}
            <div className="typo-h1">회원가입</div>
            <div className="mx-auto mt-[12px]">
              <div className="mt-[5px]">
                {/* 인증된 이메일 - 읽기 전용으로 표시 */}
                <TextField
                  value={verifiedEmail}
                  placeholder="이메일 주소"
                  onChange={() => {}}
                  disabled
                  leftIcon={<img src={mailIcon} alt="메일 아이콘" />}
                />

                {/* 비밀번호 */}
                <div className="mt-[5px]">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
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
                    leftIcon={<img src={pwIcon} alt="" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center justify-center h-full"
                      >
                        <img src={getPasswordIcon()} alt="비밀번호 아이콘" />
                      </button>
                    }
                  />

                  {/* 비밀번호 확인 */}
                  <div className="mt-[5px]">
                    <TextField
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
                      leftIcon={<img src={pwIcon} alt="" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          className="flex items-center justify-center h-full"
                        >
                          <img
                            src={getPasswordConfirmIcon()}
                            alt="비밀번호 확인 아이콘"
                          />
                        </button>
                      }
                    />

                    {/* 약관 영역 */}
                    <div className="mt-[90px]">
                      {/* 전체 동의 */}
                      <label className="relative flex items-center px-3 h-[48px] w-full rounded-[6px] border border-[#D1D1D1] cursor-pointer">
                        <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer absolute inset-0 w-full h-full appearance-none cursor-pointer z-10"
                            checked={isAllChecked}
                            onChange={(e) =>
                              updateAgreements({
                                terms: e.target.checked,
                                privacy: e.target.checked,
                                marketing: e.target.checked,
                              })
                            }
                          />
                          <img
                            src={blankCheck}
                            alt="unchecked"
                            className="block peer-checked:hidden w-full h-full object-contain pointer-events-none z-0"
                          />
                          <img
                            src={greenCheck}
                            alt="checked"
                            className="hidden peer-checked:block w-4 h-4 object-contain pointer-events-none z-0"
                          />
                        </div>

                        <span className="ml-[12px] typo-label text-[#202020]">
                          약관 전체동의
                        </span>
                      </label>

                      {/* 개별 약관 박스 */}
                      <div className="w-full p-3 flex flex-col gap-[10px]">
                        {AGREEMENTS.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between w-full h-[24px]"
                          >
                            <label className="flex items-center gap-3 cursor-pointer overflow-hidden">
                              {item.key !== "policy" ? (
                                <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer absolute inset-0 w-full h-full appearance-none cursor-pointer z-10"
                                    checked={agreements[item.key]}
                                    onChange={(e) =>
                                      updateAgreements({
                                        [item.key]: e.target.checked,
                                      })
                                    }
                                  />
                                  <img
                                    src={blankCheck}
                                    alt="unchecked"
                                    className="block peer-checked:hidden w-full h-full object-contain pointer-events-none z-0"
                                  />
                                  <img
                                    src={grayCheck}
                                    alt="checked"
                                    className="hidden peer-checked:block w-4 h-4 object-contain pointer-events-none z-0"
                                  />
                                </div>
                              ) : (
                                <span className="w-5 h-5 flex-shrink-0 inline-block" />
                              )}

                              <span className="typo-label text-[#7D7D7D] truncate">
                                {item.label}
                              </span>
                            </label>

                            <button
                              type="button"
                              className="flex-shrink-0"
                              onClick={() => {
                                setAgreementPage(item);
                                setHideHeader(true);
                              }}
                            >
                              <img
                                src={arrowIcon}
                                alt="약관 보기"
                                className="w-6 h-6"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 회원가입 버튼 */}
                    <div className="mt-[22px]">
                      <Button
                        type="submit"
                        size="L"
                        disabled={!isSignupEnabled || loading}
                        onClick={onSubmit}
                        className={`mt-[8px] ${
                          !isSignupEnabled || loading ? "" : "!text-[#32E389]"
                        }`}
                      >
                        {loading ? "가입 중..." : "회원가입"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
