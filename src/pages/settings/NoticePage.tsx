// src/pages/settings/NoticePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import NoticeCategoryItem from "../../components/settings/components/NoticeCategoryItem";
import { getNotices } from "../../api/notice";
import { Notice, mapNotice } from "../../types/notice";

export default function NoticePage() {
  const navigate = useNavigate();
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

  return (
    <>
      <BackHeader title="공지사항" onBack={() => navigate(-1)} />
      <main className="pt-[75px] px-4 pb-[34px] flex flex-col gap-[14px] min-h-screen">
        {loading ? (
          <p className="text-center text-gray-500">불러오는 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            공지사항을 불러오지 못했습니다.
          </p>
        ) : notices.length === 0 ? (
          <p className="text-center text-gray-500">
            등록된 공지사항이 없습니다.
          </p>
        ) : (
          notices.map((notice) => (
            <NoticeCategoryItem key={notice.id} category={notice} />
          ))
        )}
        <p className="pt-[2px] text-center typo-label text-[#202020]">
          오늘 한 끼부터, 쿠킵으로 이어가볼까요?
        </p>
      </main>
    </>
  );
}
