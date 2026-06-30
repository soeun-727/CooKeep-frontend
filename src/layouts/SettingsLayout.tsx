import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import BackHeader from "@/components/ui/BackHeader";

export default function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 최초 진입 경로 저장
  const initialFrom = useRef(location.state?.from);

  // 스크롤 컨테이너 참조
  const scrollRef = useRef<HTMLDivElement>(null);

  // 페이지 변경 시 스크롤 맨 위로
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  const handleBack = () => {
    if (location.pathname === "/settings") {
      if (initialFrom.current) {
        navigate(initialFrom.current);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    // <div className="min-h-screen">
    //   <BackHeader title="회원정보" onBack={handleBack} />
    //   <Outlet />
    // </div>
    <div className="flex h-screen flex-col">
      <BackHeader title="회원정보" onBack={handleBack} />

      {/* 여기가 핵심 */}
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
