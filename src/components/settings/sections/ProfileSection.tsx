// src/pages/settings/sections/ProfileSection.tsx
import { useEffect, useRef, useState } from "react";
import SettingsInputItem from "../components/SettingsInputItem";
import axios from "axios";
import { MyProfileResponse, updateNickname } from "../../../api/user";

const MASKED_PASSWORD = "********";

type ProfileInfo = {
  nickname: string;
  phone: string;
  email: string;
};

type Props = {
  profile: MyProfileResponse["data"];
};

export default function ProfileSection({ profile }: Props) {
  const MAX_NICKNAME_LENGTH = 10;

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const isSocialLogin = profile.authProvider !== "LOCAL";

  // 최초 1회 초기화
  const [account, setAccount] = useState<ProfileInfo>(() => ({
    nickname: profile.Nickname || "",
    phone: profile.phoneNumber || "",
    email: profile.email || "",
  }));

  // 닉네임 포커스
  useEffect(() => {
    if (isEditingNickname) {
      nicknameInputRef.current?.focus();
    }
  }, [isEditingNickname]);

  const isNicknameError = account.nickname.length > MAX_NICKNAME_LENGTH;

  const handleNicknameSave = async () => {
    // 1. 앞뒤 공백 제거한 값을 변수에 담기
    const trimmedNickname = account.nickname.trim();

    // 2. 진짜 빈 값인지 최종 확인
    if (!trimmedNickname || isNicknameError) return;

    try {
      // 3. 서버에는 공백이 제거된 깔끔한 값을 보냄
      await updateNickname(trimmedNickname);

      // 4. 내 로컬 상태도 깔끔한 값으로 동기화
      setAccount((prev) => ({ ...prev, nickname: trimmedNickname }));

      setIsEditingNickname(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;

        if (code === "DUPLICATE_NICKNAME") {
          alert("이미 사용 중인 닉네임입니다.");
        } else if (code === "UNAUTHORIZED") {
          alert("로그인이 필요합니다.");
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    // 숫자만 남기기
    const digits = phone.replace(/[^\d]/g, "");
    // 11자리 기준 (010-1234-5678)
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <section className="px-4">
      <div className="flex flex-col gap-[22px]">
        {/* ===== 닉네임 (inline edit) ===== */}
        <div className="flex flex-col h-20 gap-2 w-full relative">
          <span className="typo-body text-[#202020] px-3">닉네임</span>

          <div
            className={`
            flex items-center justify-between w-full h-[44px] px-3 border rounded-[6px] transition-colors
            ${isNicknameError ? "border-[#D91F1F]" : "border-[#DDD]"}
          `}
          >
            {isEditingNickname ? (
              <>
                <input
                  ref={nicknameInputRef}
                  value={account?.nickname || ""}
                  onChange={(e) =>
                    setAccount((prev) =>
                      prev ? { ...prev, nickname: e.target.value } : prev,
                    )
                  }
                  className="
                    flex-1
                    h-full
                    w-45
                    outline-none
                    typo-body2
                    text-[#202020]
                  "
                />
                <button
                  onClick={handleNicknameSave}
                  disabled={!account.nickname?.trim() || isNicknameError}
                  className="
                    w-[115px]
                    px-[18px]
                    py-1
                    rounded-full
                    bg-[#202020]
                    text-white
                    typo-caption
                    font-medium
                  "
                >
                  변경 완료
                </button>
              </>
            ) : (
              <>
                <span className="typo-body2 text-[#AEAEAE]">
                  {account.nickname}
                </span>

                <button
                  onClick={() => setIsEditingNickname(true)}
                  className="
                    w-[115px]
                    px-[18px]
                    py-1
                    rounded-full
                    bg-[#202020]
                    text-white
                    typo-caption
                    font-medium
                  "
                >
                  닉네임 변경
                </button>
              </>
            )}
          </div>
          <div className="absolute top-19 px-2">
            {isEditingNickname && (
              <>
                {/* 1. 글자 수 초과 에러 */}
                {isNicknameError && (
                  <span className="text-[#D91F1F] typo-caption leading-0">
                    닉네임은 {MAX_NICKNAME_LENGTH}글자 이하로 입력해주세요
                  </span>
                )}

                {/* 2. 빈 값 에러 (추가) */}
                {!account.nickname.trim() && (
                  <span className="text-[#D91F1F] typo-caption leading-0">
                    닉네임을 입력해주세요
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <SettingsInputItem
          label="휴대전화"
          value={isSocialLogin ? "" : formatPhoneNumber(account.phone)}
          buttonText="휴대폰 번호 변경"
          to="/settings/phone"
          disabled={isSocialLogin}
        />

        <SettingsInputItem
          label="이메일"
          value={account.email}
          buttonText="이메일 주소 변경"
          to="/settings/email"
          disabled={isSocialLogin}
        />

        {/* 비밀번호는 항상 고정 */}
        <SettingsInputItem
          label="비밀번호"
          value={isSocialLogin ? "" : MASKED_PASSWORD}
          buttonText="비밀번호 변경"
          to="/settings/password"
          disabled={isSocialLogin}
        />
      </div>
    </section>
  );
}
