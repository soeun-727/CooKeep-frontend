import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useMyCookeepStore } from "@/stores/useMyCookeepStore";

import { ExcludedIngredientContent } from "@/components/myCookeep/fixed/ExcludedIngredientContent";
import { MyCookeepGoal } from "@/components/myCookeep/fixed/MyCookeepGoal";
import MyCookeepTabBar from "@/components/myCookeep/fixed/MyCookeepTabBar";
import { ProfileContent } from "@/components/myCookeep/fixed/ProfileContent";
import {
  RenderContent,
  TabType,
} from "@/components/myCookeep/main/RenderContent";
import AddMoreModal from "@/components/myCookeep/record/AddMoreModal";
import { AppBar } from "@/components/ui/AppHeader";

import { useCalendarRecordSelection } from "@/hooks/useCalendarRecordSelection";

import { hasTodayRecord } from "@/utils/record";

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
  const {
    selectedDate,
    records,
    fetchDailyData,
    handleCalendarDateClick,
    handleCalendarMonthChange,
    reset: resetCalendarSelection,
  } = useCalendarRecordSelection();
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );
  const fetchCookies = useCookeepsStore(s => s.fetchCookies);
  const fetchProfile = useMyCookeepStore(s => s.fetchProfile);

  useEffect(() => {
    fetchCookies();
    fetchProfile();
  }, [fetchCookies, fetchProfile]);

  useEffect(() => {
    if (activeTab === "record") {
      fetchDailyData(getKstToday());
    }
  }, [activeTab, fetchDailyData]);

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === "record" || tab === "calendar" || tab === "statistics") {
        setActiveTab(tab as TabType);
        resetCalendarSelection();
        setDismissed(false);
        setEnteredByBottomTab(false);
      }
    },
    [resetCalendarSelection],
  );

  const handleActiveTabClick = useCallback(
    (tab: string) => {
      if (tab === "calendar") {
        resetCalendarSelection();
      }
    },
    [resetCalendarSelection],
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

  const cookieCount = useCookeepsStore(s => s.cookie);

  return (
    <div className="relative mb-6 flex flex-col gap-[30px] px-4">
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

          <RenderContent
            activeTab={activeTab}
            records={records}
            selectedDate={selectedDate}
            onCalendarDateClick={handleCalendarDateClick}
            onCalendarMonthChange={handleCalendarMonthChange}
          />
        </div>
      </section>

      {shouldShowAddMoreModal && (
        <AddMoreModal onCancel={handleDismiss} onConfirm={handleConfirm} />
      )}
    </div>
  );
}
