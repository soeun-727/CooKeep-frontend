// sections/HelpCenterSection.tsx
import { useNavigate } from "react-router-dom";

import SettingsMenuRow from "@/components/settings/components/SettingsMenuRow";
import SettingsSectionLabel from "@/components/settings/components/SettingsSectionLabel";

export default function HelpCenterSection() {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    // TODO: 피드백 폼 URL 연결 예정
  };

  return (
    <section className="flex w-full flex-col items-start gap-1">
      <SettingsSectionLabel label="고객센터" />
      <div className="flex w-full flex-col items-start">
        <SettingsMenuRow
          label="1:1 문의"
          onClick={() => navigate("/support")}
        />
        <SettingsMenuRow
          label="자주 하는 질문 (FAQ)"
          onClick={() => navigate("/settings/faq")}
        />
        <SettingsMenuRow label="의견 남기기" onClick={handleFeedbackClick} />
      </div>
    </section>
  );
}
