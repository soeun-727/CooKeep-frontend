import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { unsubscribePush } from "@/api/push";
import { MyProfileResponse, getMyProfile } from "@/api/user";
import { loadingChar } from "@/assets";
import { useAuthStore } from "@/stores/useAuthStore";

import ConfirmModal from "@/components/ui/ConfirmModal";

import NotificationSection from "./sections/NotificationSection";
import ProfileSection from "./sections/ProfileSection";
import NoticeSection from "./sections/NoticeSection";
import HelpCenterSection from "./sections/HelpCenterSection";
import TermsSection from "./sections/TermsSection";
import AccountSection from "./sections/AccountSection";

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

  //추가
  const handleWithdraw = async () => {
    try {
      await unsubscribePush();
    } catch (e) {}
    navigate("/settings/withdraw");
  };

  const handleNotificationChange = (isAgreed: boolean) => {
    if (profile) {
      setProfile({ ...profile, marketingPush: isAgreed });
    }
  };

  if (loading || !profile)
    return (
      <div className="mt-50 flex flex-col items-center justify-center text-center">
        <img className="w-30 p-5 opacity-70" src={loadingChar} />
        <div className="typo-body2 text-gray-50">회원정보를 불러오는 중...</div>
      </div>
    );

  return (
    <>
      {/* 헤더(84px)는 별도 컴포넌트, 여기서는 그만큼 여백만 확보 */}
      <main
        className="flex min-h-screen w-full flex-col bg-[#FAFAFA] px-4"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 40px + 30px)",
        }}
      >
        <div className="flex w-full flex-col items-start gap-[30px]">
          {/* User Info Container: ProfileSection ~ 탈퇴하기 */}
          <div className="flex w-full flex-col items-start gap-1">
            <ProfileSection profile={profile} />

            {/* NotificationSection ~ 탈퇴하기 그룹 */}
            <div className="flex w-full flex-col items-start gap-4 px-1">
              <NotificationSection
                marketingPush={profile.marketingPush}
                onStateChange={handleNotificationChange}
              />
              <NoticeSection />
              <HelpCenterSection />
              <TermsSection />
              <AccountSection
                onLogoutClick={() => setOpenLogoutModal(true)}
                onWithdrawClick={handleWithdraw}
              />
            </div>
          </div>
        </div>
        <footer
          className="mt-auto flex flex-col items-center px-4 pt-[30px]"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom) + 34px)",
          }}
        >
          <p className="typo-caption text-gray-50"> ver {__APP_VERSION__}</p>
        </footer>
      </main>

      {/* 로그아웃 모달 */}
      {openLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setOpenLogoutModal(false)}
          confirmButtonClassName="bg-gray-30"
          cancelButtonClassName="bg-gray-80"
        />
      )}
    </>
  );
}
