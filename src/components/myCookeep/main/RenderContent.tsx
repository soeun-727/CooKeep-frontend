import { DailyRecipe } from "@/api/myRecipe";

import Calendar from "@/components/myCookeep/contents/Calendar";
import Statistics from "@/components/myCookeep/contents/Statistics";
import RecordCard from "@/components/myCookeep/record/RecordCard";
import RecordEntry from "@/components/myCookeep/record/RecordEntry";

import { formatMonthDayLabel } from "@/utils/formatDate";

export type TabType = "record" | "calendar" | "statistics";

interface RenderContentProps {
  activeTab: TabType;
  records: DailyRecipe[];
  selectedDate: string;
  onCalendarDateClick: (date: string) => void;
  onCalendarMonthChange: () => void;
}

export const RenderContent = ({
  activeTab,
  records,
  selectedDate,
  onCalendarDateClick,
  onCalendarMonthChange,
}: RenderContentProps) => {
  switch (activeTab) {
    case "calendar":
      return (
        <div className="flex flex-col gap-4">
          <Calendar
            onDateClick={onCalendarDateClick}
            onMonthChange={onCalendarMonthChange}
          />
          {selectedDate && (
            <div className="flex flex-col gap-2">
              <p className="typo-l-strong text-gray-80">
                {records.length > 0 &&
                  `${formatMonthDayLabel(selectedDate)}에 만든 요리`}
              </p>
              {records.map(record => (
                <RecordCard key={record.dailyRecipeId} record={record} />
              ))}
            </div>
          )}
        </div>
      );

    case "statistics":
      return <Statistics />;

    case "record":
    default:
      return <RecordEntry records={records} />;
  }
};
