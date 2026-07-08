// sections/TermsSection.tsx
import { useNavigate } from "react-router-dom";

import SettingsMenuRow from "@/components/settings/components/SettingsMenuRow";
import SettingsSectionLabel from "@/components/settings/components/SettingsSectionLabel";

export default function TermsSection() {
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-start gap-1">
      <SettingsSectionLabel label="이용 약관" />
      <div className="flex w-full flex-col items-start">
        <SettingsMenuRow
          label="서비스 이용 약관"
          onClick={() => navigate("/settings/terms")}
        />
        <SettingsMenuRow
          label="개인정보 수집 및 이용 동의"
          onClick={() => navigate("/settings/privacy")}
        />
        <SettingsMenuRow
          label="마케팅 활용 및 광고 수신 동의"
          onClick={() => navigate("/settings/marketing")}
        />
        <SettingsMenuRow
          label="개인정보 처리방침"
          onClick={() => navigate("/settings/policy")}
        />
      </div>
    </section>
  );
}
