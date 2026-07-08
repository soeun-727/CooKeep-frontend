// sections/NoticeSection.tsx
import { useNavigate } from "react-router-dom";

import SettingsMenuRow from "@/components/settings/components/SettingsMenuRow";
import SettingsSectionLabel from "@/components/settings/components/SettingsSectionLabel";

// TODO: 앱 버전 관리 어떻게 할지 정해지면 그거에 맞춰서 바꿔야함
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "1.0";

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
        <SettingsMenuRow
          label={`버전 업데이트 (v${APP_VERSION})`}
          onClick={() => navigate("/settings/version")}
        />
      </div>
    </section>
  );
}
