import { Outlet } from "react-router-dom";

import { BackHeader } from "@/components/ui/BackHeader";

export default function FindLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <BackHeader title="비밀번호 찾기" />
      <Outlet />
    </div>
  );
}
