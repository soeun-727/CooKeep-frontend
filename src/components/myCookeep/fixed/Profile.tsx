import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type ProfileData, getProfileInfo } from "@/api/user";
import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { groundImg, refreshIcon, renameIcon } from "@/assets/index";

import { GOAL_TYPE_MAP } from "@/utils/getGoalDescription";

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
      <div className="bg-green-gradient h-[260px] w-full animate-pulse rounded-b-[36px]" />
    );
  }
  const goalId = currentGoalEntry ? currentGoalEntry[0] : "cook";
  const targetCount = profile?.weeklyGoal?.targetCount ?? 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* 헤더 섹션 */}
        <div className="from-green to-green-deep flex h-[260px] w-full flex-col items-center justify-center rounded-b-[36px] bg-gradient-to-b">
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
              <div className="bg-green-light mx-auto mt-3 -ml-[0.5px] flex h-5 w-fit items-center justify-center gap-[2px] rounded-[100px] px-3">
                <span className="typo-caption text-green flex items-center leading-none">
                  {profile?.daysSinceJoined}
                </span>
                <span className="typo-caption flex items-center leading-none text-gray-50">
                  일째 CooKeep
                </span>
              </div>
            </div>
          </div>

          {/* 목표 요약 바 */}
          <div className="bg-green-deep shadow-search rounded-M flex h-12 w-[361px] items-center justify-between gap-3 p-3">
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
                className="bg-gray-0 shadow-container relative z-10 inline-flex items-center justify-center rounded-[3px] px-[16px] py-[9px] text-center text-[12px] font-medium text-gray-50"
                style={{ width: 227, height: 28 }}
              >
                이번 주 달성하고 싶은 목표를 세워보세요!
              </div>
              <div className="bg-gray-0 shadow-tooltip-tail absolute top-0 z-0 h-[12px] w-[12px] translate-y-[-50%] rotate-45" />
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
