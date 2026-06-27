import {
  calendar,
  calendarOn,
  record,
  recordOn,
  stats,
  statsOn,
} from "@assets";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onActiveTabClick?: (tab: string) => void;
}

export default function MyCookeepTabBar({
  activeTab,
  onTabChange,
  onActiveTabClick,
}: Props) {
  const tabs = [
    { id: "record", img: record, onImg: recordOn },
    { id: "calendar", img: calendar, onImg: calendarOn },
    { id: "statistics", img: stats, onImg: statsOn },
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
    <div className="flex h-13 w-full items-center justify-around bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="relative flex flex-1 items-center justify-center py-3 transition-all"
          >
            <img
              src={isActive ? tab.onImg : tab.img}
              alt={tab.id}
              className="h-6 w-6 object-contain"
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
