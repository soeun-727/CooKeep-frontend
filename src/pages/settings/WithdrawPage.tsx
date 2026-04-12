import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import Button from "../../components/ui/Button";
import arrowIcon from "../../assets/signup/arrowright.svg";
import characterImg from "../../assets/character/sad_char_faded.svg";
import { useAuthStore } from "../../stores/useAuthStore";
import { withdrawUser } from "../../api/auth";
import { getMyProfile } from "../../api/user";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [username, setUsername] = useState("사용자");
  const [agree, setAgree] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 가져오기
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

  // 임시
  const reasons = [
    "사용을 잘 하지 않아요",
    "원하는 기능이 없어요",
    "서비스가 불편해요",
    "오류가 많아요",
    "직접 입력",
  ];
  const isCustom = selectedReason === "직접 입력";

  // 탈퇴 버튼 클릭
  const handleWithdraw = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 1. 탈퇴 API 호출
      await withdrawUser();

      // 2. 로그아웃 처리 (토큰 삭제 등)
      await logout();

      // 3. 탈퇴 완료 페이지로 이동
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

  // 로딩 중일 때
  if (loading) {
    return (
      <>
        <BackHeader title="탈퇴하기" onBack={() => navigate(-1)} />
        <main className="pt-[161px] px-4 pb-[120px] max-w-[450px] mx-auto">
          <div className="text-center">로딩 중...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <BackHeader title="탈퇴하기" onBack={() => navigate(-1)} />

      {/* 스크롤 영역 */}
      <main className="pt-[161px] px-4 pb-[120px] max-w-[450px] mx-auto">
        {/* ===== 상단 문구 ===== */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[22px] font-bold leading-[32px] text-[#202020]">
              Cookeep을 <span className="text-[#D91F1F]">탈퇴</span>하시나요?
            </p>

            <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#7D7D7D]">
              <span className="font-semibold">{username}</span> 님,
              이별인가요..?? 너무 아쉬워요...
            </p>
          </div>

          <img
            src={characterImg}
            alt="character"
            className="w-[76px] h-[58px] ml-2"
          />
        </div>

        {/* ===== 안내 박스 ===== */}
        <div className="mt-[26px] rounded-[6px] border border-[#D1D1D1] bg-[#EBEBEB] p-[12px] space-y-[6px]">
          <p className="text-[14px] font-medium leading-[20px] text-[#202020]">
            - 회원 탈퇴 시 함께 쌓아온 냉장고 재료, 레시피, 요리 기록이 모두
            삭제돼요. T_T
          </p>
          <p className="text-[14px] font-medium leading-[20px] text-[#202020]">
            - 탈퇴일 포함 30일동안 재가입이 불가하며, 재가입 시 사용자의 이전
            이용 내역은 복구되지 않습니다.
          </p>
          <p className="text-[14px] font-medium leading-[20px] text-[#202020]">
            - 탈퇴 고객의 개인정보는 관련 법령에 따라 일정 기간 보관 후 자동
            파기됩니다.
          </p>
        </div>

        {/* ===== 체크 영역 ===== */}
        <button
          onClick={() => setAgree((v) => !v)}
          className="mt-3 mx-2 flex items-center gap-2"
        >
          <span
            className={`
      w-[18px] h-[18px]
      rounded-full
      flex items-center justify-center
      border
      transition
      ${agree ? "bg-[#1FC16F] border-[#1FC16F]" : "bg-white border-[#D1D1D1]"}
    `}
          >
            {agree && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L4 7L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>

          <span className="text-[14px] font-medium leading-[20px] text-[#7D7D7D] px-[12px]">
            유의사항을 전부 확인했습니다
          </span>
        </button>

        {/* ===== 탈퇴 사유 토글 ===== */}
        <div className="mt-6">
          <button
            onClick={() => setReasonOpen((v) => !v)}
            aria-expanded={reasonOpen}
            className={`
    flex w-full h-[48px] items-center gap-3 px-3
    border border-[#D1D1D1] bg-white
    ${reasonOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"}
  `}
          >
            {isCustom ? (
              <input
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="직접 입력하세요"
                className="flex-1 text-[14px] outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 text-[14px] font-medium text-[#111] text-left">
                {selectedReason ?? "탈퇴 사유를 알려주세요"}
              </span>
            )}

            <img
              src={arrowIcon}
              alt="toggle"
              className={`w-6 h-6 transition-transform ${
                reasonOpen ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>

          {reasonOpen && (
            <div
              className="
      w-full
      flex flex-col
      border border-[#D1D1D1]
      border-t-0
      rounded-b-[6px]
      bg-white
      overflow-hidden
    "
            >
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    setSelectedReason(reason);
                    setReasonOpen(false);
                  }}
                  className={`
          flex items-center px-3 py-3
          text-[14px] font-medium text-left
          ${selectedReason === reason ? "bg-[#EBEBEB]" : "bg-white"}
        `}
                >
                  {reason}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ===== 하단 고정 버튼 ===== */}
      <div
        className="
    fixed bottom-[34px]
    left-1/2 -translate-x-1/2
    w-full max-w-[450px]
    px-4
    flex justify-center
  "
      >
        <Button
          size="L"
          disabled={!agree || !selectedReason || isSubmitting}
          onClick={() => setOpenModal(true)}
          className="!w-full !max-w-[450px]"
        >
          {isSubmitting ? "처리 중..." : "탈퇴하기"}
        </Button>
      </div>

      {/* ===== 더블체크 모달 ===== */}
      {openModal && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            onClick={() => setOpenModal(false)}
          />

          <div className="relative w-[254px] bg-white rounded-[10px] flex flex-col items-center">
            <h2 className="mt-[35px] mb-4 font-bold text-[16px] text-[#202020]">
              정말 탈퇴하시겠어요?
            </h2>

            <div className="flex gap-2 mb-[20px]">
              {/* 탈퇴 진행 */}
              <button
                onClick={handleWithdraw}
                disabled={isSubmitting}
                className="w-[95px] h-[44px] rounded-[10px] bg-[#C3C3C3] text-white"
              >
                {isSubmitting ? "처리중" : "네"}
              </button>

              {/* 취소 */}
              <button
                onClick={() => setOpenModal(false)}
                disabled={isSubmitting}
                className="w-[95px] h-[44px] rounded-[10px] bg-[#32E389] text-white"
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
