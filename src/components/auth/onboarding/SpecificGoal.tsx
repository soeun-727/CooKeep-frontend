interface SpecificGoalProps {
  selectedGoal: { id: string; title: string };
  count: string; // 부모로부터 받은 현재 숫자 값
  onCountChange: (value: string) => void; // 부모의 숫자 상태를 변경하는 함수
}

export default function SpecificGoal({
  selectedGoal,
  count,
  onCountChange,
}: SpecificGoalProps) {
  const displayTitle = selectedGoal.title || "주 n회 요리하기";

  // displayTitle을 기준으로 글자를 자릅니다.
  const titleParts = displayTitle.split("n");

  const numValue = parseInt(count, 10);
  const isError =
    count !== "" && (isNaN(numValue) || numValue < 1 || numValue > 10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      onCountChange(value);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1 !text-[22px]">
          이번 주 달성하고 싶은 목표를 세워보세요!
        </h1>
        <h3 className="typo-h3 text-gray-500">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="w-[361px] mt-[46px] flex flex-col items-start">
        <div
          className={`w-full h-12 px-3 flex items-center border rounded-md bg-white transition-all ${
            isError ? "border-red-500" : "border-[#D1D1D1]"
          }`}
        >
          <span className="typo-body2 whitespace-pre text-neutral-900">
            {titleParts[0]}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={count}
            onChange={handleChange}
            placeholder="3"
            className={`typo-body2 font-bold underline outline-none bg-transparent w-5 text-center transition-colors ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          />
          <span className="typo-body2 text-neutral-900">{titleParts[1]}</span>
        </div>

        {/* 에러 메시지: 범위가 벗어났거나 비어있지 않을 때만 표시 */}
        {isError && (
          <p className="text-red-500 text-[10px] mt-[5px] ml-3 animate-fadeIn">
            1~10 사이의 숫자로 입력해주세요
          </p>
        )}
      </div>
    </div>
  );
}
