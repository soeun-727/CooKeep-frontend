import { useCallback, useEffect, useState } from "react";

import { type ProfileData, getProfileInfo } from "@/api/user";
import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { groundImg } from "@/assets/index";
import PlantIcon from "@/assets/mycookeep/plant.svg?react";
import EditIcon from "@/assets/recipe/rename.svg?react";

import ProfileEditModal from "../modals/ProfileEditModal";

export const ProfileContent = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
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
    fetchProfile();
  }, [fetchProfile]);

  const setProfilePlant = useCookeepsStore(s => s.setProfilePlant);
  const setProfileAuto = useCookeepsStore(s => s.setProfileAuto);

  const handleSaveProfile = async (userPlantId: number) => {
    await setProfilePlant(userPlantId);
    setProfileAuto(false);
    await fetchProfile();
    setIsEditModalOpen(false);
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
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
          <EditIcon className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* 유저 정보 */}
      <div className="flex w-full flex-col items-center gap-1">
        <p className="typo-h3 text-gray-80">{profile?.nickname || "쿠킵이"}</p>
        <span className="typo-label flex gap-1">
          <p className="text-gray-30">지금은 </p>
          <p className="text-green-deep">
            {profile?.growingPlantName || "요리 실력을"}
          </p>
          <p className="text-gray-30">키우는 중!</p>
        </span>
      </div>

      <span className="flex items-center justify-center gap-[2px] rounded-full bg-[#F4F9F4] px-3 py-1 shadow-[0_4px_16px_0_rgba(25,95,54,0.10)]">
        <PlantIcon className="h-[18px] w-[18px]" />
        <p className="typo-caption text-gray-80">쿠킵과 함께한 지</p>
        <p className="typo-caption text-gray-80">
          {profile?.daysSinceJoined}일
        </p>
      </span>

      {/* 프로필 수정 모달 (바텀 시트) */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};
