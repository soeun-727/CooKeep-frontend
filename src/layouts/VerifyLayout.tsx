import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "@/components/ui/BackHeader";

export default function VerifyLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <BackHeader title="본인인증" onBack={() => navigate(-1)} />
      <Outlet />
    </div>
  );
}
