import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SettingsMain from "@/components/settings/SettingsMain";
import { BackHeader } from "@/components/ui/BackHeader";

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 최초 진입 경로 저장
  const initialFrom = useRef(location.state?.from);

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
    <div className="flex flex-col gap-[30px] px-4">
      <BackHeader title="환경설정" onBack={handleBack} />
      <SettingsMain />
    </div>
  );
}
