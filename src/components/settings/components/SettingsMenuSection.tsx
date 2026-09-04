import { useNavigate } from "react-router-dom";

import {
  SettingsMenuItem,
  SettingsSectionConfig,
} from "../config/settingsMenuConfig";
import SettingsMenuRow from "./SettingsMenuRow";
import SettingsSectionLabel from "./SettingsSectionLabel";

interface SettingsMenuSectionProps {
  section: SettingsSectionConfig;
  callbacks?: Partial<Record<"logout" | "withdraw", () => void>>;
}

export default function SettingsMenuSection({
  section,
  callbacks,
}: SettingsMenuSectionProps) {
  const navigate = useNavigate();

  const handleClick = (item: SettingsMenuItem) => {
    switch (item.action.type) {
      case "navigate":
        navigate(item.action.path);
        break;
      case "external":
        window.open(item.action.url, "_blank");
        break;
      case "callback":
        callbacks?.[item.action.key]?.();
        break;
    }
  };

  return (
    <section className="flex w-full flex-col items-start gap-1">
      <SettingsSectionLabel label={section.title} />
      <div className="flex w-full flex-col items-start">
        {section.items.map(item => (
          <SettingsMenuRow
            key={item.label}
            label={item.label}
            muted={item.muted}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
