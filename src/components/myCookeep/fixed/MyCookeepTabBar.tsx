import {
  calendar,
  calendarOn,
  record,
  recordOn,
  stats,
  statsOn,
} from "../../../assets";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MyCookeepTabBar({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: "record", img: record, onImg: recordOn },
    { id: "calendar", img: calendar, onImg: calendarOn },
    { id: "statistics", img: stats, onImg: statsOn },
  ];
  return (
    <div className="w-full flex bg-white h-13 justify-around items-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 py-3 flex justify-center items-center relative transition-all"
          >
            <img
              src={isActive ? tab.onImg : tab.img}
              alt={tab.id}
              className="w-6 h-6 object-contain"
            />

            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[114px] h-[2px] bg-gray-800 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
