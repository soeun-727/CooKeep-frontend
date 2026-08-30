import { MyProfileResponse } from "@/api/user";

import NicknameEditItem from "@/components/settings/components/NicknameEditItem";
import SettingsInputItem from "@/components/settings/components/SettingsInputItem";

const MASKED_PASSWORD = "********";

interface ProfileSectionProps {
  profile: MyProfileResponse["data"];
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  const isSocialLogin = profile.authProvider !== "LOCAL";

  return (
    <section className="flex w-full flex-col items-start gap-[4px]">
      <NicknameEditItem initialNickname={profile.Nickname || ""} />

      <SettingsInputItem
        label="이메일"
        value={profile.email}
        buttonText="이메일 주소 변경"
        to="/settings/email"
        disabled={isSocialLogin}
      />

      {/* 비밀번호는 항상 고정 */}
      <SettingsInputItem
        label="비밀번호"
        value={isSocialLogin ? "" : MASKED_PASSWORD}
        buttonText="비밀번호 변경"
        to="/settings/password"
        disabled={isSocialLogin}
      />
    </section>
  );
}
