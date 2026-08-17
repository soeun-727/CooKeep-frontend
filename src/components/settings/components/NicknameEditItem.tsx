// src/components/settings/components/NicknameEditItem.tsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { updateNickname } from "@/api/user";
import ClearIcon from "@/assets/settings/clear_x_Icon.svg?react";
import ConfirmModal from "@/components/fridge/modals/ConfirmModal";

interface NicknameEditItemProps {
  initialNickname: string;
}

export default function NicknameEditItem({
  initialNickname,
}: NicknameEditItemProps) {
  const MAX_NICKNAME_LENGTH = 10;

  const [nickname, setNickname] = useState(initialNickname);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const isError = nickname.length > MAX_NICKNAME_LENGTH;

  const handleClear = () => {
    setNickname("");
    inputRef.current?.focus();
  };

  const handleSave = async () => {
    const trimmed = nickname.trim();
    if (!trimmed || isError) return;

    try {
      await updateNickname(trimmed);
      setNickname(trimmed);
      setIsEditing(false);
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
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  return (
    <div className="relative flex w-full flex-col items-start">
      <div className="flex w-full items-center p-1">
        <span className="typo-l-strong text-gray-80">닉네임</span>
      </div>

      <div className="flex h-[70px] w-full flex-col items-center gap-[2px]">
        <div
          className={`flex h-12 w-full min-w-0 items-center gap-3 rounded-xl border bg-white px-3 py-3 ${
            !nickname.trim() || isError
              ? "border-semantic-negative"
              : "border-gray-10"
          }`}
        >
          {isEditing ? (
            <>
              <input
                ref={inputRef}
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="typo-m text-gray-80 h-full min-w-0 flex-1 outline-none"
              />

              {isFocused && nickname.length > 0 && (
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={handleClear}
                >
                  <ClearIcon className="h-6 w-6" />
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={!nickname.trim() || isError}
                className="bg-green text-gray-0 typo-caption shrink-0 rounded-full px-3 py-[6px] disabled:opacity-40"
              >
                변경 완료
              </button>
            </>
          ) : (
            <>
              <span className="typo-m min-w-0 flex-1 truncate text-gray-50">
                {nickname}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-80 text-gray-0 typo-caption shrink-0 rounded-full px-3 py-[6px]"
              >
                닉네임 변경
              </button>
            </>
          )}
        </div>

        <div className="w-full px-2">
          {isEditing && isError && (
            <span className="typo-caption text-semantic-negative">
              {MAX_NICKNAME_LENGTH}글자 이내로 설정해주세요
            </span>
          )}

          {isEditing && !isError && !nickname.trim() && (
            <span className="typo-caption text-semantic-negative">
              닉네임을 입력해주세요
            </span>
          )}
        </div>
      </div>

      {openDuplicateModal && (
        <ConfirmModal
          title="이미 존재하는 닉네임입니다"
          buttonTexts={["확인"]}
          onConfirm={handleCloseDuplicateModal}
          onCancel={handleCloseDuplicateModal} // 버튼 1개여도 필수 prop이라 동일 핸들러 넘겨줌
        />
      )}
    </div>
  );
}
