import { Outlet, useNavigate } from "react-router-dom";

import BackHeader from "@/components/ui/BackHeader";

export default function VerifyLayout() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      <BackHeader title="본인인증" onBack={() => navigate(-1)} />
      <Outlet />
    </div>
  );
}
