import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateWeeklyGoal } from "@/api/user";
import axios from "axios";

import Goal from "@/components/auth/onboarding/Goal";
import SpecificGoal from "@/components/auth/onboarding/SpecificGoal";
import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import { GOAL_TYPE_MAP } from "@/utils/getGoalDescription";

export default function SetGoalPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState({
    id: "cook",
    title: "주 n회 요리하기",
  });

  const [goalCount, setGoalCount] = useState<string>("3");

  const isValid = (() => {
    if (step === 0) return !!selectedGoal.id;
    if (step === 1) {
      const count = parseInt(goalCount, 10);
      return !isNaN(count) && count >= 1 && count <= 10;
    }
    return false;
  })();

  const STEPS = [
    <Goal selectedGoal={selectedGoal} onSelect={setSelectedGoal} />,
    <SpecificGoal
      selectedGoal={selectedGoal}
      count={goalCount}
      onCountChange={setGoalCount}
    />,
  ];

  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsModalOpen(true);
    } else {
      setStep(step => step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step => step - 1);
  };
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        goalActionType:
          GOAL_TYPE_MAP[selectedGoal.id as keyof typeof GOAL_TYPE_MAP].value,
        targetCount: parseInt(goalCount, 10),
      };

      const response = await updateWeeklyGoal(requestBody);

      if (response.status === "OK") {
        navigate("/mycookeep", { replace: true });
      }
    } catch (error: unknown) {
      console.error("목표 수정 실패:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          alert("이번 주 목표가 이미 설정되어 있습니다");
        } else {
          alert("목표 설정 중 오류가 발생했습니다");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다");
      }
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };
  return (
    <div className="flex h-full flex-col gap-15 px-4">
      <BackHeader
        title="목표 수정"
        onBack={() => (step === 0 ? navigate(-1) : setStep(0))}
      />

      <main className="flex w-full flex-1">{STEPS[step]}</main>

      <div className="flex flex-col gap-1">
        <Button
          size="L"
          variant="green"
          onClick={handleNext}
          disabled={!isValid || isLoading}
        >
          다음
        </Button>
        {isLastStep && (
          <Button size="S" variant="gray" onClick={handlePrev}>
            이전
          </Button>
        )}
      </div>

      {isModalOpen && (
        <ConfirmModal
          title="이번 주 목표를 확정할까요?"
          subtitle={`${selectedGoal.title.replace("n", goalCount)}`}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          buttonVariants={["green", "gray"]}
        />
      )}
    </div>
  );
}
