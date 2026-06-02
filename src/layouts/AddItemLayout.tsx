// src/layouts/AddItemLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";

export default function AddItemLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[100dvh] bg-[#FAFAFA] overflow-hidden">
      {/* <BackHeader title="재료 등록" onBack={() => navigate(-1)} />

      <main className="flex-1 min-h-0 pb-[13px] overflow-hidden">
        <Outlet />
      </main> */}
      <BackHeader title="재료 등록" onBack={() => navigate(-1)} />

      {/* fixed 헤더가 차지하는 h-12만큼 빈 공간을 확보*/}
      <div className="h-12 shrink-0" />

      {/* 헤더 바로 밑에서부터 시작하고, 내부 스크롤도 정상 작동 */}
      <main className="flex-1 min-h-0 flex flex-col pb-[13px] overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
