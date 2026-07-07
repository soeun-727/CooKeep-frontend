import { CalendarIcon, RecordIcon, StatsIcon } from "@/assets/index";
import { memo, useCallback } from "react";

const TABS = [
  { id: "record", Icon: RecordIcon },
  { id: "calendar", Icon: CalendarIcon },
  { id: "statistics", Icon: StatsIcon },
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
    <div className="bg-gray-0 flex h-13 w-full items-center justify-around">
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="relative flex flex-1 items-center justify-center py-3"
          >
            <Icon
              className={`h-6 w-6 transition-colors duration-200 ${
                isActive ? "text-gray-80" : "text-gray-10"
              }`}
              aria-label={tab.id}
            />

            {isActive && (
              <div className="absolute bottom-0 left-1/2 h-[2px] w-[114px] -translate-x-1/2 rounded-full bg-gray-800" />
            )}
          </button>
        );
      })}
    </div>
  );
});
