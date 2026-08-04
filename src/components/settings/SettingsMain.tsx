import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { unsubscribePush } from "@/api/push";
import { MyProfileResponse, getMyProfile } from "@/api/user";
import { loadingChar } from "@/assets";
import { useAuthStore } from "@/stores/useAuthStore";

import logoutIcon from "@/assets/settings/logout.svg";

import ConfirmModal from "@/components/ui/ConfirmModal";

import NotificationSection from "./sections/NotificationSection";
import ProfileSection from "./sections/ProfileSection";
import SupportSection from "./sections/SupportSection";

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
      <div className="mt-50 flex flex-col items-center justify-center text-center">
        <img className="w-30 p-5 opacity-70" src={loadingChar} />
        <div className="typo-body2 text-zinc-500">
          회원정보를 불러오는 중...
        </div>
      </div>
    );

  return (
    <>
      <main className="px-4 pt-[103px]">
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
              className="aspect-square h-6 w-6"
            />
            <span className="text-gray-80 text-[14px] leading-[20px] font-medium">
              로그아웃
            </span>
          </button>

          {/* 탈퇴하기 */}
          <button
            onClick={async () => {
              try {
                await unsubscribePush();
              } catch (e) {}
              navigate("/settings/withdraw");
            }}
            className="mt-[42px] text-[12px] leading-[16px] font-normal text-gray-50 underline"
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
