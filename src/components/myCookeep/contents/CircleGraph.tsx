export default function CircleGraph({ percentage }: { percentage: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const gap = circumference * 0.18;
  const openCircumference = circumference - gap;
  const offset = circumference - (percentage / 100) * openCircumference;

  return (
    <div className="relative flex w-[105px] items-center justify-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 94 94"
        style={{ transform: "rotate(125deg)" }}
      >
        {/* 배경 원 (비어있는 가이드 라인) */}
        <circle
          cx="47"
          cy="47"
          r={radius}
          stroke="#F4F4F5"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={`${openCircumference} ${circumference}`}
          strokeLinecap="round"
        />

        {/* 수치 원 (실제 차오르는 게이지) */}
        <circle
          cx="47"
          cy="47"
          r={radius}
          stroke="var(--background-image-green-gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="duration-1000 ease-out"
        />
      </svg>

      {/* 중앙 텍스트 */}
      <div className="absolute flex flex-col items-center">
        <span className="typo-h2 text-gray-80">{percentage}%</span>
      </div>
    </div>
  );
}
