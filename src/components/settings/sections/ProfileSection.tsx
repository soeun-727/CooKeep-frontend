// src/pages/settings/sections/ProfileSection.tsx
import { useEffect, useRef, useState } from "react";
import SettingsInputItem from "../components/SettingsInputItem";
import axios from "axios";
import { MyProfileResponse, updateNickname } from "@/api/user";
import SingleButtonModal from "@/components/ui/SingleButtonModal";

const MASKED_PASSWORD = "********";

type ProfileInfo = {
  nickname: string;
  email: string;
};

type Props = {
  profile: MyProfileResponse["data"];
};

export default function ProfileSection({ profile }: Props) {
  const MAX_NICKNAME_LENGTH = 10;

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);

  const isSocialLogin = profile.authProvider !== "LOCAL";

  // 최초 1회 초기화
  const [account, setAccount] = useState<ProfileInfo>(() => ({
    nickname: profile.Nickname || "",
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
        const status = err.response?.status;
        const code = err.response?.data?.code;

        if (status === 409 || code === "USER-001") {
          setOpenDuplicateModal(true);
        } else if (status === 401) {
          alert("로그인이 필요합니다.");
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <section className="px-4">
      <div className="flex flex-col gap-[22px]">
        {/* ===== 닉네임 (inline edit) ===== */}
        <div className="relative flex h-20 w-full flex-col gap-2">
          <span className="typo-body px-3 text-[#202020]">닉네임</span>

          <div
            className={`flex h-[44px] w-full items-center justify-between rounded-[6px] border px-3 transition-colors ${isNicknameError ? "border-[#D91F1F]" : "border-[#DDD]"} `}
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
                  className="typo-body2 h-full w-45 flex-1 text-[#202020] outline-none"
                />
                <button
                  onClick={handleNicknameSave}
                  disabled={!account.nickname?.trim() || isNicknameError}
                  className="typo-caption w-[115px] rounded-full bg-[#202020] px-[18px] py-1 font-medium text-white"
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
                  className="typo-caption w-[115px] rounded-full bg-[#202020] px-[18px] py-1 font-medium text-white"
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
                  <span className="typo-caption leading-0 text-[#D91F1F]">
                    {MAX_NICKNAME_LENGTH}글자 이내로 설정해주세요
                  </span>
                )}

                {/* 2. 빈 값 에러 (추가) */}
                {!account.nickname.trim() && (
                  <span className="typo-caption leading-0 text-[#D91F1F]">
                    닉네임을 입력해주세요
                  </span>
                )}
              </>
            )}
          </div>
        </div>

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
      {openDuplicateModal && (
        <SingleButtonModal
          message="이미 사용 중인 닉네임입니다."
          onClose={() => setOpenDuplicateModal(false)}
        />
      )}
    </section>
  );
}
