import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveOnboardingData } from "@/api/onboarding";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

import AuthHeader from "@/components/auth/AuthHeader";
import Footer from "@/components/auth/onboarding/Footer";
import Goal from "@/components/auth/onboarding/Goal";
import Guide from "@/components/auth/onboarding/Guide";
import InstallGuide from "@/components/auth/onboarding/InstallGuide";
import Last from "@/components/auth/onboarding/Last";
import Notification from "@/components/auth/onboarding/Notification";
import Preference from "@/components/auth/onboarding/Preference";
import Progress from "@/components/auth/onboarding/Progress";
import SpecificGoal from "@/components/auth/onboarding/SpecificGoal";

import { GOAL_TYPE_MAP } from "@/utils/getGoalDescription";

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

  const isValidCount = (count: string) => {
    const num = Number(count);
    return !Number.isNaN(num) && num >= 1 && num <= 10;
  };

  // --- 유효성 검사 로직 ---
  const getIsValid = () => {
    if (step === 0) return true;
    if (step === 1) return true; // 기피 재료는 선택 사항
    if (step === 2) return selectedGoal.id !== "";
    // NaN 안되게 수정
    if (step === 3) {
      return isValidCount(goalCount);
    }
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
      let requestBody;

      if (isForcedSkip) {
        // 건너뛰기: 둘 다 null
        requestBody = {
          dislikedIngredients: selectedIngredients.map(item => item.ingredient),
          goalActionType: null,
          targetCount: null,
        };

        await saveOnboardingData(requestBody); // response 변수 제거
        setSelectedGoal({ id: "", title: "" });
        setGoalCount("");
        setIsFinished(true);
        return;
      } else {
        const count = Number(goalCount);

        if (!isValidCount(goalCount)) {
          alert("목표 횟수는 1~10 사이로 입력해주세요.");
          setIsLoading(false);
          return;
        }

        requestBody = {
          dislikedIngredients: selectedIngredients.map(item => item.ingredient),
          goalActionType:
            GOAL_TYPE_MAP[selectedGoal.id as keyof typeof GOAL_TYPE_MAP].value,
          targetCount: count,
        };
      }

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
    <div className="bg-background flex h-[100dvh] flex-col items-center">
      <AuthHeader />
      {step !== 0 && (
        <div className="mx-auto w-full px-4">
          <Progress currentStep={step} />
        </div>
      )}
      <div
        className={`flex w-full flex-1 flex-col items-center ${step === 0 ? "" : "px-1"}`}
      >
        <div className="h-full w-full">
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
