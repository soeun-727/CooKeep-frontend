import { useEffect, useState } from "react";

import { getNotices } from "@/api/notice";

import NoticeCategoryItem from "@/components/settings/components/NoticeCategoryItem";
import { BackHeader } from "@/components/ui/BackHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";

import { Notice, mapNotice } from "@/types/notice";

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const result = await getNotices();

        const mapped = result.data.map(mapNotice).sort((a, b) => a.id - b.id); // id 오름차순

        setNotices(mapped);
      } catch (err) {
        console.error("공지사항 조회 실패:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 로딩 중일 때
  if (loading) return <LoadingScreen />;

  return (
    <>
      <BackHeader title="서비스 소개" />
      <main className="pb-safe flex min-h-screen flex-col px-4 pt-[52px]">
        <div className="flex flex-col gap-3">
          {error ? (
            <p className="text-semantic-negative text-center">
              공지사항을 불러오지 못했습니다.
            </p>
          ) : notices.length === 0 ? (
            <p className="text-center text-gray-500">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            notices.map(notice => (
              <NoticeCategoryItem key={notice.id} category={notice} />
            ))
          )}
        </div>

        <div className="mt-auto px-4 pb-2">
          <p className="typo-caption-strong text-center text-gray-50">
            오늘 한 끼부터, 쿠킵으로 이어가볼까요?
          </p>
        </div>
      </main>
    </>
  );
}
