import { useState } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useMyCookeepStore } from "@/stores/useMyCookeepStore";

import EditIcon from "@/assets/icons/rename.svg?react";
import { groundImg } from "@/assets/index";
import PlantIcon from "@/assets/mycookeep/plant.svg?react";

import { BottomTabBar } from "@/components/ui/BottomTabBar";

import { ProfileEdit } from "../bottomTabBarContent/ProfileEdit";

export const ProfileContent = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const profile = useMyCookeepStore(s => s.profile);
  const fetchProfile = useMyCookeepStore(s => s.fetchProfile);
  const setProfilePlant = useCookeepsStore(s => s.setProfilePlant);
  const setProfileAuto = useCookeepsStore(s => s.setProfileAuto);

  // TODO: 프로필 이미지 변경 수정된 API로 변경하기
  const handleSaveProfile = async (profileImageId: number) => {
    await setProfilePlant(profileImageId);
    setProfileAuto(false);
    await fetchProfile();
    setIsEditModalOpen(false);
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {/* 식물 사진 및 수정 버튼 */}
        <div className="relative">
          <img
            src={profile.profilePlantImageUrl || groundImg}
            alt="profileBackground"
            loading="eager"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`h-25 w-25 w-full rounded-full object-cover transition-opacity duration-200 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <button
            className="bg-gray-0 text-gray-30 absolute top-[70px] right-[0.5px] flex h-[30px] w-[30px] items-center justify-center rounded-full"
            onClick={() => {
              setIsEditModalOpen(true);
            }}
          >
            <EditIcon className="text-gray-30 h-6 w-6" />
          </button>
        </div>

        {/* 유저 정보 */}
        <div className="flex w-full flex-col items-center gap-1">
          <p className="typo-h3 text-gray-80">
            {profile?.nickname || "쿠킵이"}
          </p>
          <span className="typo-label flex gap-1">
            <p className="text-gray-30">지금은 </p>
            <p className="text-green-deep">
              {profile?.growingPlantName || "요리 실력을"}
            </p>
            <p className="text-gray-30">키우는 중!</p>
          </span>
        </div>
      </div>

      <span className="flex items-center justify-center gap-[2px] rounded-full bg-[#F4F9F4] px-3 py-1 shadow-[0_4px_16px_0_rgba(25,95,54,0.10)]">
        <PlantIcon className="h-[18px] w-[18px]" />
        <p className="typo-caption text-gray-80">쿠킵과 함께한 지</p>
        <p className="typo-caption text-gray-80">
          {profile?.daysSinceJoined}일
        </p>
      </span>

      {isEditModalOpen && (
        <BottomTabBar
          title="프로필로 설정할 이미지를 선택해주세요"
          onClose={() => setIsEditModalOpen(false)}
          BottomTabBarContent={<ProfileEdit onSave={handleSaveProfile} />}
        />
      )}
    </div>
  );
};
