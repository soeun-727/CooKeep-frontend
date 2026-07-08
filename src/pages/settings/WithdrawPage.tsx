import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { withdrawUser } from "@/api/auth";
import { getMyProfile } from "@/api/user";
import { useAuthStore } from "@/stores/useAuthStore";

import CharacterImg from "@/assets/character/sad_char_faded.svg?react";
import ArrowIcon from "@/assets/signup/arrowright.svg?react";
import ClearIcon from "@/assets/settings/clear(x)_Icon.svg?react";
import Shadow from "@/assets/character/char_shadow.svg?react";
import AgreeUnchecked from "@/assets/signup/blankCheck.svg?react";
import AgreeChecked from "@/assets/signup/checkboxCheck.svg?react";

import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import { flushSync } from "react-dom";

const REASONS = [
  "자주 사용하지 않아요",
  "서비스가 기대와 달라요",
  "사용이 불편해요",
  "다른 서비스를 이용하고 있어요",
  "기타 (직접 입력하기)",
];

const CUSTOM_REASON = "기타 (직접 입력하기)";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [username, setUsername] = useState("사용자");
  const [agree, setAgree] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");
  const [isReasonFocused, setIsReasonFocused] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isCustom = selectedReason === CUSTOM_REASON;
  const showClear = isReasonFocused && customReason.length > 0;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getMyProfile();
        setUsername(res.data.Nickname);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 커스텀 입력창 높이 자동 조절
  useEffect(() => {
    if (isCustom && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [customReason, isCustom]);

  const reasonValid =
    !!selectedReason && (!isCustom || customReason.trim().length > 0);
  const canSubmit = agree && reasonValid;

  // 사유 선택 (기타 선택 시 동기적으로 렌더 후 바로 포커스 → iOS에서도 키보드 확실히 뜸)
  const handleSelectReason = (reason: string) => {
    flushSync(() => {
      setSelectedReason(reason);
      setReasonOpen(false);
      if (reason === CUSTOM_REASON) setCustomReason("");
    });

    if (reason === CUSTOM_REASON) {
      textareaRef.current?.focus();
    }
  };

  const handleClearCustomReason = () => {
    setCustomReason("");
    textareaRef.current?.focus(); // 삭제 후에도 포커스 유지
  };

  const handleWithdraw = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await withdrawUser();
      await logout();

      navigate("/settings/withdraw/done", {
        replace: true,
        state: { fromWithdraw: true },
      });
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
      setOpenModal(false);
    }
  };

  if (loading) {
    return (
      <>
        <BackHeader title="탈퇴하기" onBack={() => navigate(-1)} />
        <main className="mx-auto max-w-[375px] px-4 pt-[161px] pb-[220px]">
          <div className="text-center">로딩 중...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <BackHeader title="탈퇴하기" onBack={() => navigate(-1)} />

      <main className="mx-auto flex w-full max-w-[375px] flex-col items-center gap-[120px] px-4 pt-[161px] pb-[220px]">
        <div className="flex w-full flex-col items-center gap-3">
          {/* 이미지 + 글자 */}
          <div className="flex w-full flex-col items-center gap-2 px-1">
            {/* 이미지 — 항상 가운데 정렬 */}
            <div className="flex w-full flex-col">
              <CharacterImg className="h-[57.736px] w-[76.286px]" />
              <Shadow className="-mt-1 h-[19px] w-[83px]" />
            </div>

            {/* 글자 */}
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full items-start gap-2">
                <p className="typo-h2 text-gray-80">
                  쿠킵을
                  <br />
                  탈퇴하시나요?
                </p>
              </div>

              <div className="flex w-full flex-wrap items-start gap-1">
                <span className="typo-m-strong text-gray-50">{username}</span>
                <span className="typo-m flex-1 text-gray-50">
                  님, 이별인가요..?? 너무 아쉬워요...
                </span>
              </div>
            </div>
          </div>

          {/* ===== 탈퇴 사유 선택 (드롭다운은 아래 유의사항 위로 오버레이) ===== */}
          <div className="relative w-full">
            {isCustom ? (
              <div className="border-gray-10 bg-gray-0 flex w-full items-start gap-3 rounded-[12px] border p-3">
                <textarea
                  ref={textareaRef}
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  onFocus={() => setIsReasonFocused(true)}
                  onBlur={() => setIsReasonFocused(false)}
                  placeholder="직접 입력하세요"
                  rows={1}
                  className="typo-m text-gray-80 max-h-[120px] flex-1 resize-none outline-none"
                />
                {showClear && (
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()} // blur보다 먼저 막아서 클릭이 확실히 먹히게
                    onClick={handleClearCustomReason}
                    className="shrink-0"
                  >
                    <ClearIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setReasonOpen(v => !v)}
                  aria-expanded={reasonOpen}
                  className={`border-gray-10 bg-gray-0 relative z-30 flex h-[48px] w-full items-center gap-3 border px-3 ${
                    reasonOpen
                      ? "rounded-t-[12px] border-b-0"
                      : "rounded-[12px]"
                  }`}
                >
                  <span className="typo-m text-gray-80 h-6 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap">
                    {selectedReason ?? "탈퇴 사유를 알려주세요"}
                  </span>

                  <ArrowIcon
                    className={`h-6 w-6 transition-transform ${
                      reasonOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>

                {/* 드롭다운: absolute + z-30 → 유의사항 영역 위로 겹쳐서 뜸 (레이아웃을 안 밀어냄) */}
                {reasonOpen && (
                  <div className="border-gray-10 bg-gray-0 absolute top-full right-0 left-0 z-30 flex flex-col overflow-hidden rounded-b-[12px] border-r border-b border-l shadow-md">
                    {REASONS.map(reason => (
                      <button
                        key={reason}
                        onClick={() => handleSelectReason(reason)}
                        className={`border-gray-10 flex h-[48px] w-full items-center gap-3 border-r border-l px-3 text-left ${
                          selectedReason === reason ? "bg-gray-10" : "bg-gray-0"
                        }`}
                      >
                        <span className="typo-m text-gray-80 h-6 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          {reason}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* ===== 하단 고정 영역 ===== */}
      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[375px] -translate-x-1/2 flex-col items-center">
        <div className="flex w-full flex-col items-center px-4">
          <div className="bg-gray-10 flex w-full flex-col items-start gap-2 rounded-[12px]">
            <div className="flex w-full flex-col items-start gap-[6px] p-3">
              <p className="typo-m text-gray-80 w-full">
                - 회원 탈퇴 시 함께 쌓아온 냉장고 재료, 레시피, 요리 기록이 모두
                삭제돼요. T_T
              </p>
              <p className="typo-m text-gray-80 w-full">
                - 탈퇴일 포함 30일동안 재가입이 불가하며, 재가입 시 사용자의
                이전 이용 내역은 복구되지 않습니다.
              </p>
              <p className="typo-m text-gray-80 w-full">
                - 탈퇴 고객의 개인정보는 관련 법령에 따라 일정 기간 보관 후 자동
                파기됩니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAgree(v => !v)}
            className="flex w-full items-center gap-3 rounded-[12px] px-1 py-[6px]"
          >
            {agree ? (
              <AgreeChecked className="h-6 w-6 shrink-0 text-gray-50" />
            ) : (
              <AgreeUnchecked className="h-6 w-6 shrink-0" />
            )}
            <span className="typo-m h-6 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-gray-50">
              유의사항을 전부 확인했습니다
            </span>
          </button>
        </div>

        <div className="flex w-full flex-col items-center px-4 pt-6 pb-[calc(env(safe-area-inset-bottom)+16px)]">
          <Button
            size="L"
            disabled={!canSubmit || isSubmitting}
            onClick={() => setOpenModal(true)}
            className={`!w-full !rounded-[12px] !font-semibold ${
              canSubmit && !isSubmitting ? "!bg-gray-80" : ""
            }`}
          >
            {isSubmitting ? "처리 중..." : "탈퇴하기"}
          </Button>
        </div>
      </div>

      {/* ===== 더블체크 모달 ===== */}
      {openModal && (
        <div
          className="bg-black-overlay fixed inset-0 z-[150] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            onClick={() => setOpenModal(false)}
          />

          <div className="bg-gray-0 relative flex w-[300px] flex-col items-center justify-center gap-6 rounded-[16px] p-6 shadow-[0_4px_16px_0_rgba(17,17,17,0.10)]">
            <div className="flex w-full flex-col items-center gap-3">
              <p className="typo-l-strong text-gray-80 w-full text-center">
                정말 탈퇴하시겠어요?
              </p>
            </div>

            <div className="flex w-full items-center justify-center gap-2">
              <button
                onClick={handleWithdraw}
                disabled={isSubmitting}
                className="bg-gray-30 typo-l-strong text-gray-0 flex h-[44px] flex-1 items-center justify-center rounded-[12px]"
              >
                {isSubmitting ? "처리중" : "네"}
              </button>

              <button
                onClick={() => setOpenModal(false)}
                disabled={isSubmitting}
                className="bg-gray-80 typo-l-strong text-gray-0 flex h-[44px] flex-1 items-center justify-center rounded-[12px]"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
