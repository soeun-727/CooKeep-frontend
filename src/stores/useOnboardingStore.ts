import { create } from "zustand";
import { OnboardingIngredient } from "../api/onboarding"; // 정의해둔 타입 임포트

interface OnboardingStore {
  selectedGoal: { id: string; title: string };
  goalCount: string;
  selectedIngredients: OnboardingIngredient[];

  step: number;
  isFinished: boolean;
  showNotification: boolean;
  showInstallGuide: boolean;

  setSelectedGoal: (goal: { id: string; title: string }) => void;
  setGoalCount: (count: string) => void;
  setSelectedIngredients: (ingredients: OnboardingIngredient[]) => void;

  setStep: (step: number) => void;
  setIsFinished: (val: boolean) => void;
  setShowNotification: (val: boolean) => void;
  setShowInstallGuide: (val: boolean) => void;

  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  selectedGoal: { id: "COOKING", title: "주 n회 요리하기" },
  goalCount: "3",

  // 초기값은 빈 배열
  selectedIngredients: [],

  step: 0,
  isFinished: false,
  showNotification: false,
  showInstallGuide: false,

  setSelectedGoal: (selectedGoal) => set({ selectedGoal }),
  setGoalCount: (goalCount) => set({ goalCount }),

  // 상태 업데이트 로직 구현
  setSelectedIngredients: (selectedIngredients) => set({ selectedIngredients }),

  setStep: (step) => set({ step }),
  setIsFinished: (isFinished) => set({ isFinished }),
  setShowNotification: (showNotification) => set({ showNotification }),
  setShowInstallGuide: (showInstallGuide) => set({ showInstallGuide }),

  resetOnboarding: () =>
    set({
      selectedGoal: { id: "COOKING", title: "주 n회 요리하기" },
      goalCount: "3",
      selectedIngredients: [], // 리셋 시 함께 초기화
      step: 0,
      isFinished: false,
      showNotification: false,
      showInstallGuide: false,
    }),
}));
