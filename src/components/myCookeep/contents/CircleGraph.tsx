export default function CircleGraph({ percentage }: { percentage: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const gap = circumference * 0.18;
  const openCircumference = circumference - gap;
  const offset = circumference - (percentage / 100) * openCircumference;

  return (
    <div className="relative flex items-center justify-center w-[105px]">
      <svg
        className="w-full h-full"
        viewBox="0 0 94 94"
        style={{ transform: "rotate(125deg)" }}
      >
        <defs>
          <linearGradient
            id="circleGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientTransform="rotate(-125, 0.5, 0.5)"
          >
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* 배경 원 (비어있는 가이드 라인) */}
        <circle
          cx="47"
          cy="47"
          r={radius}
          stroke="#F4F4F5"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={`${openCircumference} ${circumference}`} // 75%만 보여줌
          strokeLinecap="round"
        />

        {/* 수치 원 (실제 차오르는 게이지) */}
        <circle
          cx="47"
          cy="47"
          r={radius}
          stroke="url(#circleGradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* 중앙 텍스트 (회전되지 않도록 별도 div 배치) */}
      <div className="absolute flex flex-col items-center">
        <span className="typo-h2 text-neutral-900">{percentage}%</span>
      </div>
    </div>
  );
}
