import { Outlet } from "react-router-dom";

import { BackHeader } from "@/components/ui/BackHeader";

export default function VerifyLayout() {
  return (
    <div className="bg-background min-h-screen">
      <BackHeader title="본인인증" />
      <Outlet />
    </div>
  );
}
