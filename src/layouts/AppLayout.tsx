import { useLoadingStore } from "@/stores/useLoadingStore";
import { useRewardStore } from "@/stores/useRewardStore";

// 추가
import ExpiringRewardModal from "@/components/recipe/ExpiringRewardModal";
import ComebackRewardModal from "@/components/ui/ComebackRewardModal";
import LoadingScreen from "@/components/ui/LoadingScreen";
import OnboardingRewardModal from "@/components/ui/OnboardingRewardModal";
import WeeklyGoalModal from "@/components/ui/WeeklyGoalModal";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isLoading = useLoadingStore(s => s.isLoading);

  const { current, dequeue } = useRewardStore();

  return (
    <div className="bg-background flex min-h-dvh justify-center">
      <div className="relative flex w-full max-w-[450px] flex-1 flex-col transition-colors duration-300">
        {children}

        {/* overlay 방식으로 변경 */}
        {isLoading && (
          <div className="bg-gray-0 absolute inset-0 z-50">
            <LoadingScreen />
          </div>
        )}

        {current?.type === "COMEBACK" && (
          <ComebackRewardModal
            isOpen={true}
            onClose={dequeue}
            rewardPoints={current.points}
          />
        )}

        {current?.type === "WEEKLY" && (
          <WeeklyGoalModal isOpen={true} onClose={dequeue} />
        )}
        {current?.type === "ONBOARDING_INGREDIENT" && (
          <OnboardingRewardModal
            type="INGREDIENT"
            isOpen={true}
            onClose={dequeue}
            rewardPoints={current.points}
          />
        )}

        {current?.type === "ONBOARDING_RECIPE" && (
          <OnboardingRewardModal
            type="RECIPE"
            isOpen={true}
            onClose={dequeue}
            rewardPoints={current.points}
          />
        )}

        {current?.type === "EXPIRING" && (
          <ExpiringRewardModal
            onConfirm={dequeue}
            rewardPoints={current.points}
          />
        )}
      </div>
    </div>
  );
}
