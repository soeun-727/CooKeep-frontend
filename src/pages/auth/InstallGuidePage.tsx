import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InstallGuideAndroid from "@/components/auth/onboarding/InstallGuideAndroid";
import InstallGuideIOS from "@/components/auth/onboarding/InstallGuideIOS";
import { checkIsAndroid, checkIsApp, checkIsMobile } from "@/utils/device";

export default function InstallGuidePage() {
  const navigate = useNavigate();
  const isApp = checkIsApp();
  const isMobile = checkIsMobile();
  const isAndroid = checkIsAndroid();

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

  if (isAndroid) {
    return <InstallGuideAndroid onFinish={handleFinish} />;
  }

  return <InstallGuideIOS onFinish={handleFinish} />;
}
