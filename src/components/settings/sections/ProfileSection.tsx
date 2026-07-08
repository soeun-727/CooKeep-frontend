import { useEffect, useRef, useState } from "react";

import { MyProfileResponse, updateNickname } from "@/api/user";
import axios from "axios";

import SettingsInputItem from "@/components/settings/components/SettingsInputItem";
import SingleButtonModal from "@/components/ui/SingleButtonModal";
import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";

const MASKED_PASSWORD = "********";

interface ProfileInfo {
  nickname: string;
  email: string;
}

interface ProfileSectionProps {
  profile: MyProfileResponse["data"];
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  const MAX_NICKNAME_LENGTH = 10;

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

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

  const handleClearNickname = () => {
    setAccount(prev => ({
      ...prev,
      nickname: "",
    }));

    nicknameInputRef.current?.focus();
  };

  const handleNicknameSave = async () => {
    // 1. 앞뒤 공백 제거한 값을 변수에 담기
    const trimmedNickname = account.nickname.trim();

    // 2. 진짜 빈 값인지 최종 확인
    if (!trimmedNickname || isNicknameError) return;

    try {
      // 3. 서버에는 공백이 제거된 깔끔한 값을 보냄
      await updateNickname(trimmedNickname);

      // 4. 내 로컬 상태도 깔끔한 값으로 동기화
      setAccount(prev => ({ ...prev, nickname: trimmedNickname }));

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

  const handleCloseDuplicateModal = () => {
    setOpenDuplicateModal(false);

    requestAnimationFrame(() => {
      nicknameInputRef.current?.focus();
      nicknameInputRef.current?.select();
    });
  };

  return (
    <section className="flex w-full flex-col items-start gap-[4px]">
      {/* ===== 닉네임 (inline edit) ===== */}
      <div className="relative flex w-full flex-col items-start">
        {/* 라벨: padding 4px, gap 4 */}
        <div className="flex w-full items-center gap-1 p-1">
          <span className="typo-l-strong text-gray-80">닉네임</span>
        </div>

        {/* Input Field 래퍼: 최소 70px, 내용 넘칠 때 대비해 min-h로 */}
        <div className="flex h-[70px] w-full flex-col items-center gap-[2px]">
          <div
            className={`flex h-12 w-full min-w-0 items-center gap-3 rounded-xl border bg-white px-3 ${
              isNicknameError ? "border-semantic-negative" : "border-gray-10"
            }`}
          >
            {isEditingNickname ? (
              <>
                <input
                  ref={nicknameInputRef}
                  value={account.nickname}
                  onChange={e =>
                    setAccount(prev => ({
                      ...prev,
                      nickname: e.target.value,
                    }))
                  }
                  onFocus={() => setIsNicknameFocused(true)}
                  onBlur={() => setIsNicknameFocused(false)}
                  className="typo-body2 text-gray-80 h-full min-w-0 flex-1 outline-none"
                />

                {isNicknameFocused && account.nickname.length > 0 && (
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={handleClearNickname}
                    className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center"
                  >
                    <ClearIcon className="h-6 w-6" />
                  </button>
                )}

                <button
                  onClick={handleNicknameSave}
                  disabled={!account.nickname.trim() || isNicknameError}
                  className="bg-gray-80 text-gray-0 typo-caption shrink-0 rounded-full px-3 py-[6px] disabled:opacity-40"
                >
                  변경 완료
                </button>
              </>
            ) : (
              <>
                <span className="typo-body2 min-w-0 flex-1 truncate text-gray-50">
                  {account.nickname}
                </span>
                <button
                  onClick={() => setIsEditingNickname(true)}
                  className="bg-gray-80 text-gray-0 typo-caption shrink-0 rounded-full px-3 py-[6px]"
                >
                  닉네임 변경
                </button>
              </>
            )}
          </div>

          <div className="h-[18px] w-full px-2">
            {isEditingNickname && isNicknameError && (
              <span className="typo-caption text-semantic-negative">
                {MAX_NICKNAME_LENGTH}글자 이내로 설정해주세요
              </span>
            )}

            {isEditingNickname &&
              !isNicknameError &&
              !account.nickname.trim() && (
                <span className="typo-caption text-semantic-negative">
                  닉네임을 입력해주세요
                </span>
              )}
          </div>
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
      {/* </div> */}
      {openDuplicateModal && (
        <SingleButtonModal
          message="이미 사용 중인 닉네임입니다."
          onClose={handleCloseDuplicateModal}
        />
      )}
    </section>
  );
}
