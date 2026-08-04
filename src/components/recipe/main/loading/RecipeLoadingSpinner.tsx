export default function RecipeLoadingSpinner() {
  // 8개의 점 배열
  const dots = Array.from({ length: 8 });

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {dots.map((_, i) => (
        <div
          key={i}
          className="animate-dot-chase absolute h-2 w-2 rounded-full"
          style={{
            // 1. 회전각도: 360도 / 8개 = 45도씩 회전
            // 2. 위치: 중심에서 위로 20px 밀어내어 원 형태 생성
            transform: `rotate(${i * 45}deg) translateY(-20px)`,
            // 3. 지연시간: 각 점마다 0.15초씩 차이를 두어 "쫓아가는" 느낌 구현
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
