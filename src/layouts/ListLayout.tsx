import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import ViewAllHeader from "@/components/cookeeps/lists/ViewAllHeader";
import ViewListHeader from "@/components/cookeeps/lists/ViewListHeader";
import { BackHeader } from "@/components/ui/BackHeader";

export default function ListLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("좋아요 순");

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get("tab") as "weekly" | "all") || "weekly";

  // 라우트 판별
  const isViewAll = location.pathname.endsWith("/all");
  const isLiked = location.pathname.endsWith("/liked");
  const isBookmarked = location.pathname.endsWith("/bookmarked");
  const isViewList = isLiked || isBookmarked;

  const backHeaderTitle = isLiked
    ? "좋아요한 레시피"
    : isBookmarked
      ? "저장한 레시피"
      : "레시피 보기";

  // 라우트 변경 시 스크롤 초기화
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex h-[100dvh] flex-col gap-6 overflow-hidden px-4">
      {/* 항상 고정 */}
      <div className="flex flex-col gap-3">
        <BackHeader title={backHeaderTitle} />

        {/* 페이지별 고정 헤더 */}
        {isViewAll && (
          <ViewAllHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeTab={activeTab}
            onTabChange={tab => {
              setSearchParams({ tab });
            }}
          />
        )}

        {isViewList && (
          <ViewListHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}
      </div>
      <main
        ref={mainRef}
        className="no-scrollbar flex flex-1 justify-center overflow-y-auto"
      >
        <Outlet context={{ searchTerm, sortOrder, setSortOrder, activeTab }} />
      </main>
    </div>
  );
}
