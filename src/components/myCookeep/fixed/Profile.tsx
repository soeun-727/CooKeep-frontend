import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type ProfileData, getProfileInfo } from "@/api/user";
import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { groundImg, refreshIcon, renameIcon } from "@/assets/index";

import { GOAL_TYPE_MAP } from "@/utils/mapping";

import ProfileEditModal from "../modals/ProfileEditModal";
import MyCookeepHeader from "./MyCookeepHeader";

function Profile() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfileInfo();

      if (response.status === "OK") {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("프로필 로딩 실패:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile && !profile.weeklyGoal?.goalActionType) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBubble(true);
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 7000); // 7초 뒤 사라짐

      return () => clearTimeout(timer); // 언마운트 시 타이머 클리어
    }
  }, [profile]); //isLoading, , location.key

  const setProfilePlant = useCookeepsStore(s => s.setProfilePlant);
  const setProfileAuto = useCookeepsStore(s => s.setProfileAuto);

  const handleSaveProfile = async (userPlantId: number) => {
    await setProfilePlant(userPlantId);
    setProfileAuto(false);
    await fetchProfile();
    setIsEditModalOpen(false);
  };

  const currentGoalEntry = Object.entries(GOAL_TYPE_MAP).find(
    ([, g]) => g.value === profile?.weeklyGoal?.goalActionType,
  );

  const goalLabel = currentGoalEntry
    ? currentGoalEntry[1].label
    : "목표를 설정해주세요";
  if (!profile) {
    return (
      <div className="w-full h-[260px] bg-green-gradient rounded-b-[36px] animate-pulse" />
    );
  }
  const goalId = currentGoalEntry ? currentGoalEntry[0] : "cook";
  const targetCount = profile?.weeklyGoal?.targetCount ?? 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* 헤더 섹션 */}
        <div className="w-full h-[260px] bg-gradient-to-b from-green to-green-deep rounded-b-[36px] flex flex-col items-center justify-center">
          <MyCookeepHeader />

          <div className="mt-5 flex w-[361px] items-center justify-start">
            {/* 식물 사진 및 수정 버튼 */}
            <div className="relative -ml-[7.5px] inline-block h-31 w-31 shrink-0">
              <img
                src={profile.profilePlantImageUrl || groundImg}
                alt="profileBackground"
                loading="eager"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                className={`w-full rounded-full object-cover p-6 transition-opacity duration-200 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              <button
                className="absolute right-5 bottom-4.5 transition-transform active:scale-90"
                onClick={() => {
                  console.log("프로필 수정 버튼 클릭됨");
                  setIsEditModalOpen(true);
                }}
              >
                <img src={refreshIcon} alt="refresh" className="w-[32px]" />
              </button>
            </div>
            {/* 유저 정보 */}
            <div className="flex flex-col">
              <p className="typo-h2 text-gray-0">
                {profile?.nickname || "쿠킵이"}
              </p>
              <div className="typo-caption text-gray-0">
                <span>
                  지금은 {profile?.growingPlantName || "요리 실력을"} 키우는 중!
                </span>
              </div>
              <div className="flex -ml-[0.5px] items-center justify-center gap-[2px] h-5 px-3 bg-green-light rounded-[100px] mt-3 w-fit mx-auto">
                <span className="typo-caption text-green leading-none flex items-center">
                  {profile?.daysSinceJoined}
                </span>
                <span className="typo-caption text-gray-50 leading-none flex items-center">
                  일째 CooKeep
                </span>
              </div>
            </div>
          </div>

          {/* 목표 요약 바 */}
          <div className="bg-green-deep p-3 w-[361px] h-12 flex items-center justify-between gap-3 rounded-[12px] shadow-[0px_4px_16px_-10px_rgba(0,0,0,0.25)]">
            <span
              className={`typo-body2 truncate ${profile?.weeklyGoal?.goalActionType ? "text-gray-0" : "text-green-300"}`}
            >
              {profile?.weeklyGoal?.goalActionType ? (
                <>
                  이번 주 목표는... 주 {targetCount}회 {goalLabel}!
                </>
              ) : (
                <>이번 주 목표는...</>
              )}
            </span>
            <button
              onClick={() =>
                navigate("/mycookeep/goals", {
                  state: {
                    currentGoalId: goalId,
                    currentCount: profile?.weeklyGoal?.targetCount ?? 0,
                  },
                })
              }
              className="flex h-full w-6 items-center justify-center"
            >
              <img
                src={renameIcon}
                alt="rename"
                className="w-4 brightness-0 invert-[100%]"
              />
            </button>
          </div>

          {/* 말풍선 섹션: showBubble 여부에 따라 투명도만 조절 */}
          {!profile?.weeklyGoal?.goalActionType && (
            <div
              className={`animate-float-bubble absolute top-[245px] flex shrink-0 justify-center transition-opacity duration-1000 ease-in-out ${
                showBubble ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className="relative z-10 inline-flex text-center justify-center items-center px-[16px] py-[9px] rounded-[3px] bg-gray-0 text-gray-50 text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.13)]"
                style={{ width: 227, height: 28 }}
              >
                이번 주 달성하고 싶은 목표를 세워보세요!
              </div>
              <div
                className="absolute top-0 translate-y-[-50%] w-[12px] h-[12px] bg-gray-0 rotate-45 z-0"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 프로필 수정 모달 (바텀 시트) */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </>
  );
}

export default memo(Profile);
