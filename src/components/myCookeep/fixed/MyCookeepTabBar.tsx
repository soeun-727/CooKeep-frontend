import { calendarIcon, recordIcon, statsIcon } from "@/assets/index";

interface MyCookeepTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onActiveTabClick?: (tab: string) => void;
}

export default function MyCookeepTabBar({
  activeTab,
  onTabChange,
  onActiveTabClick,
}: MyCookeepTabBarProps) {
  const tabs = [
    { id: "record", Icon: recordIcon },
    { id: "calendar", Icon: calendarIcon },
    { id: "statistics", Icon: statsIcon },
  ];
  const handleTabClick = (tabId: string) => {
    if (activeTab === tabId) {
      // 이미 활성화된 탭을 클릭했을 때
      onActiveTabClick?.(tabId);
    } else {
      // 새로운 탭을 클릭했을 때
      onTabChange(tabId);
    }
  };
  return (
    <div className="bg-gray-0 flex h-13 w-full items-center justify-around">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="relative flex flex-1 items-center justify-center py-3 transition-all"
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
}
