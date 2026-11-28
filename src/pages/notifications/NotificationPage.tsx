import { useSearchParams } from "react-router-dom";

import { NoticeNotificationList } from "@/components/notifications/NoticeList";
import { ServiceNotificationList } from "@/components/notifications/ServiceNotificationList";
import { BackHeader } from "@/components/ui/BackHeader";

const TABS = [
  { key: "service", label: "서비스 알림" },
  { key: "notice", label: "공지사항" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const NotificationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab: TabKey =
    searchParams.get("tab") === "notice" ? "notice" : "service";

  return (
    <main className="pb-safe flex flex-col gap-3">
      <div className="flex flex-col gap-3 px-4">
        <BackHeader />
        <div role="tablist" className="flex gap-[2px]">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              // replace: 탭 전환이 히스토리에 쌓이면 뒤로가기가 이전 탭으로 감
              onClick={() => setSearchParams({ tab: key }, { replace: true })}
              className={`typo-l-strong p-1 ${
                tab === key
                  ? "border-green text-gray-80 border-b-2"
                  : "text-gray-30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section role="tabpanel" className="min-h-0 flex-1">
        {tab === "service" ? (
          <ServiceNotificationList />
        ) : (
          <NoticeNotificationList />
        )}
      </section>

      <p className="typo-m text-gray-50 text-center">최근 30일간의 알림만 노출돼요</p>
    </main>
  );
};

export default NotificationPage;
