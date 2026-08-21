import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InstallGuideAndroid from "@/components/auth/onboarding/InstallGuideAndroid";
import InstallGuideIOS from "@/components/auth/onboarding/InstallGuideIOS";
import { checkIsAndroid, checkIsApp } from "@/utils/device";

export default function InstallGuidePage() {
  const navigate = useNavigate();
  const isApp = checkIsApp();
  const isAndroid = checkIsAndroid();

  useEffect(() => {
    if (isApp) {
      navigate("/fridge", { replace: true });
    }
  }, [isApp, navigate]);

  if (isApp) return null;

  const handleFinish = () => {
    navigate("/fridge");
  };

  // Android 기기인 경우 Android 가이드, iOS 및 PC 등 그 외 기기는 iOS 가이드 노출
  if (isAndroid) {
    return <InstallGuideAndroid onFinish={handleFinish} />;
  }

  return <InstallGuideIOS onFinish={handleFinish} />;
}
