import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InstallGuide from "@/components/auth/onboarding/InstallGuide";
import { checkIsApp, checkIsMobile } from "@/utils/device";

export default function InstallGuidePage() {
  const navigate = useNavigate();
  const isApp = checkIsApp();
  const isMobile = checkIsMobile();

  useEffect(() => {
    // 앱(standalone) 환경이거나 PC 환경인 경우 설치 가이드 없이 바로 메인으로 이동
    if (isApp || !isMobile) {
      navigate("/fridge", { replace: true });
    }
  }, [isApp, isMobile, navigate]);

  if (isApp || !isMobile) return null;

  const handleFinish = () => {
    navigate("/fridge");
  };

  return <InstallGuide onFinish={handleFinish} />;
}
