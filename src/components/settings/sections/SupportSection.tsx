// src/pages/settings/sections/SupportSection.tsx

import SettingsLinkItem from "../components/SettingsLinkItem";

export default function SupportSection() {
  return (
    <section className="px-[29px] mt-[31px]">
      {/* ↑ 토글 영역과 간격 32px */}
      <div
        className="
          grid
          grid-cols-[auto_auto]
          gap-2
        "
      >
        <SettingsLinkItem label="고객센터" to="/support" />
        <SettingsLinkItem label="FAQ" to="/settings/faq" />
        <SettingsLinkItem label="공지사항" to="/settings/notice" />
        <SettingsLinkItem label="이용약관" to="/settings/terms" />
      </div>
    </section>
  );
}
