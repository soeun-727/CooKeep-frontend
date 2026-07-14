interface ProgressProps {
  currentStep: number;
}

export default function Progress({ currentStep }: ProgressProps) {
  const visualTotalSteps = 4;
  const progressWidth = (currentStep / visualTotalSteps) * 100;

  return (
    <div className="mt-[93px]">
      {/* 바 컨테이너 */}
      <div className="h-1 w-[361px] overflow-hidden rounded-full bg-gray-200">
        {/* 실제 채워지는 게이지 */}
        <div
          className="bg-green-gradient h-full duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
