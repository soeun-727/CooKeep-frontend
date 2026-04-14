import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "./sections/ProfileSection";
import NotificationSection from "./sections/NotificationSection";
import SupportSection from "./sections/SupportSection";
import logoutIcon from "../../assets/settings/logout.svg";
import ConfirmModal from "../ui/ConfirmModal";
import { getMyProfile, MyProfileResponse } from "../../api/user";
import { useAuthStore } from "../../stores/useAuthStore";
import { loadingChar } from "../../assets";
import { unsubscribePush } from "../../api/push";

export default function SettingsMain() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const [profile, setProfile] = useState<MyProfileResponse["data"] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoutConfirm = async () => {
    setOpenLogoutModal(false);
    try {
      await unsubscribePush();
    } catch (err) {
      console.error("로그아웃 중 푸시 구독 해제 실패:", err);
    }

    await logout();
    setProfile(null);
    navigate("/", { replace: true });
  };

  const handleNotificationChange = (isAgreed: boolean) => {
    if (profile) {
      setProfile({ ...profile, marketingPush: isAgreed });
    }
  };

  if (loading || !profile)
    return (
      <div className="flex flex-col items-center justify-center text-center mt-50">
        <img className="opacity-70 w-30 p-5" src={loadingChar} />
        <div className="typo-body2 text-zinc-500">
          회원정보를 불러오는 중...
        </div>
      </div>
    );

  return (
    <>
      <main className="pt-[103px] px-4">
        <div className="space-y-6">
          <ProfileSection profile={profile} />
          <NotificationSection
            marketingPush={profile.marketingPush}
            onStateChange={handleNotificationChange}
          />
          <SupportSection />
        </div>

        {/* ===== 하단 버튼 영역 ===== */}
        <div className="mt-[14px] flex flex-col items-center">
          {/* 로그아웃 */}
          <button
            onClick={() => setOpenLogoutModal(true)}
            className="inline-flex items-center gap-1"
          >
            <img
              src={logoutIcon}
              alt="logout"
              className="w-6 h-6 aspect-square"
            />
            <span className="text-[14px] font-medium leading-[20px] text-[#111]">
              로그아웃
            </span>
          </button>

          {/* 탈퇴하기 */}
          <button
            onClick={() => navigate("/settings/withdraw")}
            className="mt-[42px] text-[12px] font-normal leading-[16px] text-[#7D7D7D] underline"
          >
            탈퇴하기
          </button>
        </div>
      </main>

      {/* 로그아웃 모달 */}
      {openLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
    </>
  );
}
