interface ProgressProps {
  currentStep: number;
}

const Progress = ({ currentStep }: ProgressProps) => {
  // 시각적으로 5단계가 있는 것처럼 계산하여 마지막 단계에서도 1칸이 남도록 함
  const visualTotalSteps = 5;

  // currentStep이 0, 1, 2, 3일 때 -> 20%, 40%, 60%, 80%가 차게 됩니다.
  const progressWidth = ((currentStep + 1) / visualTotalSteps) * 100;

  return (
    <div className="mt-[93px]">
      {/* 바 컨테이너 */}
      <div className="w-[361px] h-1 bg-gray-200 rounded-full overflow-hidden">
        {/* 실제 채워지는 게이지 */}
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
