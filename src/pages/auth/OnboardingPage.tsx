import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InstallGuide from "../../components/auth/onboarding/InstallGuide";
import AuthHeader from "../../components/auth/AuthHeader";
import Progress from "../../components/auth/onboarding/Progress";
import Goal from "../../components/auth/onboarding/Goal";
import SpecificGoal from "../../components/auth/onboarding/SpecificGoal";
import Footer from "../../components/auth/onboarding/Footer";
import Notification from "../../components/auth/onboarding/Notification";
import Last from "../../components/auth/onboarding/Last";
import Guide from "../../components/auth/onboarding/Guide";
import Preference from "../../components/auth/onboarding/Preference";

import { saveOnboardingData } from "../../api/onboarding";
import { useOnboardingStore } from "../../stores/useOnboardingStore";
import { GOAL_TYPE_MAP } from "../../utils/mapping";

export default function Onboarding() {
  const navigate = useNavigate();
  const {
    selectedGoal,
    setSelectedGoal,
    goalCount,
    setGoalCount,
    selectedIngredients,
    step,
    setStep,
    isFinished,
    setIsFinished,
    showNotification,
    setShowNotification,
    showInstallGuide,
    setShowInstallGuide,
  } = useOnboardingStore();

  const [isLoading, setIsLoading] = useState(false);

  // --- 유효성 검사 로직 ---
  const getIsValid = () => {
    if (step === 0) return true;
    if (step === 1) return true; // 기피 재료는 선택 사항
    if (step === 2) return selectedGoal.id !== "";
    if (step === 3) return goalCount !== "";
    return false;
  };

  // --- 비즈니스 로직 ---

  // 1. 건너뛰기 클릭 시 처리 로직
  const skipStep = () => {
    if (step === 2 || step === 3) {
      handleSaveOnboarding(true);
      return;
    }
    nextStep();
  };

  const handleSaveOnboarding = async (isForcedSkip: boolean = false) => {
    setIsLoading(true);
    try {
      const requestBody = {
        dislikedIngredients: selectedIngredients.map((item) => item.ingredient),
        // 건너뛰기일 경우 null 또는 백엔드가 원하는 빈 값 처리
        goalActionType: isForcedSkip
          ? null // 또는 "" (백엔드 명세에 따라 결정)
          : GOAL_TYPE_MAP[selectedGoal.id as keyof typeof GOAL_TYPE_MAP].value,
        targetCount: isForcedSkip
          ? null // 또는 0 (건너뛰기 시 값이 없음을 명시)
          : parseInt(goalCount || "0", 10),
      };

      const response = await saveOnboardingData(requestBody);

      if (response.status === 200 || response.data?.status === "OK") {
        setIsFinished(true);
      }
    } catch (error) {
      console.error("온보딩 저장 실패:", error);
      alert("데이터 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSaveOnboarding(false);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // --- 조건부 렌더링 ---
  if (showInstallGuide)
    return <InstallGuide onFinish={() => navigate("/fridge")} />;
  if (showNotification)
    return <Notification onNext={() => setShowInstallGuide(true)} />;
  if (isFinished) return <Last onStart={() => setShowNotification(true)} />;

  return (
    <div className="flex flex-col h-[100dvh] items-center bg-[#FAFAFA]">
      <AuthHeader />
      {step !== 0 && (
        <div className="w-full max-w-[361px] mx-auto">
          <Progress currentStep={step} />
        </div>
      )}
      <div
        className={`flex-1 flex flex-col items-center w-full ${step === 0 ? "" : "px-1"}`}
      >
        <div className="w-full h-full">
          {step === 0 && <Guide onNext={nextStep} />}
          {step === 1 && <Preference />}
          {step === 2 && (
            <Goal selectedGoal={selectedGoal} onSelect={setSelectedGoal} />
          )}
          {step === 3 && (
            <SpecificGoal
              selectedGoal={selectedGoal}
              count={goalCount}
              onCountChange={setGoalCount}
            />
          )}
        </div>
      </div>
      {step !== 0 && (
        <div className="shrink-0">
          <Footer
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={skipStep}
            isFirstStep={step === 1}
            isLastStep={step === 3}
            isValid={getIsValid()}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
