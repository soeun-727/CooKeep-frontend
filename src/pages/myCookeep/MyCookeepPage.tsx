import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getDailyRecipesByDate } from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useMyCookeepStore } from "@/stores/useMyCookeepStore";

import Calendar from "@/components/myCookeep/contents/Calendar";
import Statistics from "@/components/myCookeep/contents/Statistics";
import { ExcludedIngredientContent } from "@/components/myCookeep/fixed/ExcludedIngredientContent";
import { MyCookeepGoal } from "@/components/myCookeep/fixed/MyCookeepGoal";
import MyCookeepTabBar from "@/components/myCookeep/fixed/MyCookeepTabBar";
import { ProfileContent } from "@/components/myCookeep/fixed/ProfileContent";
import AddMoreModal from "@/components/myCookeep/record/AddMoreModal";
import RecordCard from "@/components/myCookeep/record/RecordCard";
import RecordEntry from "@/components/myCookeep/record/RecordEntry";
import { AppBar } from "@/components/ui/AppHeader";

import { hasTodayRecord } from "@/utils/record";

type TabType = "record" | "calendar" | "statistics";

const getKstToday = () => {
  return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

export default function MyCookeepPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("record");
  const [dismissed, setDismissed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const records = useCookeepRecordStore(s => s.records);
  const setRecords = useCookeepRecordStore(s => s.setRecords);
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );
  const fetchCookies = useCookeepsStore(s => s.fetchCookies);
  const fetchProfile = useMyCookeepStore(s => s.fetchProfile);

  useEffect(() => {
    fetchCookies();
    fetchProfile();
  }, [fetchCookies, fetchProfile]);

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

  const handleDateClick = useCallback(
    (dateStr: string) => {
      const requestDate = dateStr.replaceAll(".", "-");
      fetchDailyData(requestDate);
    },
    [fetchDailyData],
  );

  const handleTabChange = useCallback((tab: string) => {
    if (tab === "record" || tab === "calendar" || tab === "statistics") {
      setActiveTab(tab as TabType);
      setSelectedDate("");
      setDismissed(false);
      setEnteredByBottomTab(false);
    }
  }, []);

  const handleActiveTabClick = useCallback(
    (tab: string) => {
      if (tab === "calendar") {
        setRecords([]);
      }
    },
    [setRecords],
  );

  const handleCalendarDateClick = useCallback(
    (date: string) => {
      setSelectedDate(date);
      handleDateClick(date);
    },
    [handleDateClick],
  );

  const handleDismiss = useCallback(() => setDismissed(true), []);

  const handleConfirm = useCallback(() => {
    setDismissed(true);
    navigate("/mycookeep/record/select");
  }, [navigate]);

  const shouldShowAddMoreModal =
    activeTab === "record" &&
    enteredByBottomTab &&
    hasTodayRecord() &&
    !dismissed;

  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        if (selectedDate && records.length > 0) {
          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-6 px-4 duration-300">
              <button
                onClick={() => setSelectedDate("")}
                className="self-start text-sm text-gray-500"
              >
                ← 캘린더로 돌아가기
              </button>
              {records.map(record => (
                <RecordCard key={record.dailyRecipeId} record={record} />
              ))}
            </div>
          );
        }
        return <Calendar onDateClick={handleCalendarDateClick} />;

      case "statistics":
        return <Statistics />;

      case "record":
      default:
        return <RecordEntry records={records} />;
    }
  };

  const cookieCount = useCookeepsStore(s => s.cookie);

  return (
    <div className="relative flex flex-col gap-[30px] px-4">
      <AppBar cookieCount={cookieCount} />
      <section className="flex flex-col gap-6">
        <ProfileContent />

        {/* 이번 주 목표 및 못먹는 재료 */}
        <div className="flex flex-col gap-2">
          <MyCookeepGoal />
          <ExcludedIngredientContent />
        </div>

        {/* 마이쿠킵 탭바 및 렌더페이지 */}
        <div className="flex flex-col gap-4">
          <MyCookeepTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onActiveTabClick={handleActiveTabClick}
          />

          <div className="no-scrollbar mt-[10px] flex-1 overflow-y-auto pb-15">
            {renderContent()}
          </div>
        </div>
      </section>

      {shouldShowAddMoreModal && (
        <AddMoreModal onCancel={handleDismiss} onConfirm={handleConfirm} />
      )}
    </div>
  );
}
