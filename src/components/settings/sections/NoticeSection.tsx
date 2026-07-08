// sections/NoticeSection.tsx
import { useNavigate } from "react-router-dom";

import SettingsMenuRow from "@/components/settings/components/SettingsMenuRow";
import SettingsSectionLabel from "@/components/settings/components/SettingsSectionLabel";

export default function NoticeSection() {
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-start gap-1">
      <SettingsSectionLabel label="공지사항" />
      <div className="flex w-full flex-col items-start">
        <SettingsMenuRow
          label="서비스 소개"
          onClick={() => navigate("/settings/notice")}
        />
      </div>
    </section>
  );
}
