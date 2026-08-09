import { memo, useCallback } from "react";

import CalendarIcon from "@/assets/mycookeep/calendar.svg?react";
import RecordIcon from "@/assets/mycookeep/record.svg?react";
import StatsIcon from "@/assets/mycookeep/stats.svg?react";

const MYCOOKEEP_TABS = [
  { id: "record", Icon: RecordIcon, name: "요리기록" },
  { id: "calendar", Icon: CalendarIcon, name: "캘린더" },
  { id: "statistics", Icon: StatsIcon, name: "리포트" },
] as const;

interface MyCookeepTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onActiveTabClick?: (tab: string) => void;
}

export default memo(function MyCookeepTabBar({
  activeTab,
  onTabChange,
  onActiveTabClick,
}: MyCookeepTabBarProps) {
  const handleTabClick = useCallback(
    (tabId: string) => {
      if (activeTab === tabId) {
        onActiveTabClick?.(tabId);
      } else {
        onTabChange(tabId);
      }
    },
    [activeTab, onTabChange, onActiveTabClick],
  );

  return (
    <div className="border-gray-30 flex w-full items-center border-b">
      {MYCOOKEEP_TABS.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.Icon;
        const tabName = tab.name;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative flex flex-1 items-center justify-center gap-2 px-2 py-3 ${isActive ? "border-green border-b-[2px]" : ""}`}
          >
            <Icon
              className={`h-5 w-5 ${
                isActive ? "text-gray-80" : "text-gray-30"
              }`}
              aria-label={tab.id}
            />
            <p
              className={`typo-m-strong ${isActive ? "text-gray-80" : "text-gray-30"}`}
            >
              {tabName}
            </p>
          </button>
        );
      })}
    </div>
  );
});
