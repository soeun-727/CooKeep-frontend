// sections/AccountSection.tsx
import SettingsMenuRow from "@/components/settings/components/SettingsMenuRow";
import SettingsSectionLabel from "@/components/settings/components/SettingsSectionLabel";

interface AccountSectionProps {
  onLogoutClick: () => void;
  onWithdrawClick: () => void;
}

export default function AccountSection({
  onLogoutClick,
  onWithdrawClick,
}: AccountSectionProps) {
  return (
    <section className="flex w-full flex-col items-start gap-1">
      <SettingsSectionLabel label="계정 관리" />
      <div className="flex w-full flex-col items-start">
        <SettingsMenuRow label="로그아웃" onClick={onLogoutClick} />
        <SettingsMenuRow label="탈퇴하기" onClick={onWithdrawClick} muted />
      </div>
    </section>
  );
}
