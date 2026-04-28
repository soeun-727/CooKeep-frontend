import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";
import AddMoreModal from "../../components/myCookeep/record/AddMoreModal";
import { hasTodayRecord } from "../../utils/record";
import RecordCard from "../../components/myCookeep/record/RecordCard";
import { getDailyRecipesByDate } from "../../api/myRecipe";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import { useCookeepsStore } from "../../stores/useCookeepsStore";

type TabType = "record" | "calendar" | "statistics";

export default function MyCookeepPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("record");
  const [dismissed, setDismissed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const records = useCookeepRecordStore((s) => s.records);
  const setRecords = useCookeepRecordStore((s) => s.setRecords);
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );
  // 쿠키 개수 표시
  const fetchCookies = useCookeepsStore((s) => s.fetchCookies); // 추가

  useEffect(() => {
    fetchCookies(); // 추가
  }, [fetchCookies]);

  const getKstToday = () => {
    return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
  };

  const fetchDailyData = useCallback(
    async (dateStr: string) => {
      try {
        const response = await getDailyRecipesByDate(dateStr);
        if (response.status === "OK") {
          setRecords(response.data);
        }
      } catch (error) {
        console.error("레시피 조회 실패:", error);
        setRecords([]);
      }
    },
    [setRecords],
  );

  useEffect(() => {
    if (activeTab === "record") {
      fetchDailyData(getKstToday());
    }
  }, [activeTab, fetchDailyData]);

  const handleDateClick = (dateStr: string) => {
    const requestDate = dateStr.replaceAll(".", "-");
    fetchDailyData(requestDate);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "record" || tab === "calendar" || tab === "statistics") {
      setActiveTab(tab);
      setSelectedDate(""); // 추가: 상세 보기 상태 초기화
      setDismissed(false);
      setEnteredByBottomTab(false);
    }
  };

  const handleActiveTabClick = (tab: string) => {
    if (tab === "calendar") {
      setRecords([]);
    }
  };

  const shouldShowAddMoreModal =
    activeTab === "record" &&
    enteredByBottomTab &&
    hasTodayRecord() &&
    !dismissed;

  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        // 사용자가 날짜를 클릭해서 selectedDate가 생겼고, 데이터가 있을 때만 상세를 보여줌
        if (selectedDate && records.length > 0) {
          return (
            <div className="flex flex-col items-center gap-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* 뒤로가기 버튼 등이 있으면 더 좋겠네요! */}
              <button
                onClick={() => setSelectedDate("")}
                className="self-start text-sm text-gray-500"
              >
                ← 캘린더로 돌아가기
              </button>
              {records.map((record) => (
                <RecordCard key={record.dailyRecipeId} record={record} />
              ))}
            </div>
          );
        }
        return (
          <Calendar
            onDateClick={(date) => {
              setSelectedDate(date);
              handleDateClick(date);
            }}
          />
        );

      case "statistics":
        return <Statistics />;

      case "record":
      default:
        return <RecordEntry records={records} />;
    }
  };

  return (
    <div className="relative flex flex-col h-full min-h-0">
      <div className="shrink-0">
        <Profile />

        <div className="mt-6">
          <MyCookeepTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onActiveTabClick={handleActiveTabClick}
          />
        </div>
      </div>

      <div className="flex-1 mt-[10px] pb-15 overflow-y-auto no-scrollbar">
        {renderContent()}
      </div>

      {shouldShowAddMoreModal && (
        <AddMoreModal
          onCancel={() => setDismissed(true)}
          onConfirm={() => {
            setDismissed(true);
            navigate("/mycookeep/record/select");
          }}
        />
      )}
    </div>
  );
}
