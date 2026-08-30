import { Outlet } from "react-router-dom";

import { BackHeader } from "@/components/ui/BackHeader";

export default function AddItemLayout() {
  return (
    <div className="bg-background flex h-[100dvh] flex-col gap-3 overflow-hidden">
      <div className="px-4">
        <BackHeader title="재료 등록" />
      </div>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden pb-[13px]">
        <Outlet />
      </main>
    </div>
  );
}
