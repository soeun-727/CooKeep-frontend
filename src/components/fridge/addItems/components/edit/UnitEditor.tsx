import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

import { getKoreanUnit } from "@/utils/mapping";

interface QuantityEditorProps {
  value: string;
  onSave: (val: string) => void;
}

export default function QuantityEditor({ value, onSave }: QuantityEditorProps) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(getKoreanUnit(value));
  const [selectedUnit, setSelectedUnit] = useState<string | null>(
    getKoreanUnit(value),
  );
  const units = ["개", "묶음", "봉지", "팩", "캔", "병"];

  const koreanValue = getKoreanUnit(value);

  const handleQuickSelect = (unit: string) => {
    if (unit === koreanValue) return;
    setSelectedUnit(unit);
    setTimeout(() => {
      onSave(unit);
    }, 200);
  };

  const handleCustomSubmit = () => {
    if (!customValue.trim()) return;
    onSave(customValue);
  };

  useEffect(() => {
    setSelectedUnit(getKoreanUnit(value));
    setCustomValue(getKoreanUnit(value));
  }, [value]);

  return (
    <div className="mt-[18px] flex flex-col items-center gap-[18px]">
      {!isCustomInput ? (
        <>
          <div className="flex flex-col gap-3">
            {units.map(unit => {
              const isInitialValue = unit === koreanValue;
              const isNewlySelected = selectedUnit === unit && !isInitialValue;
              return (
                <button
                  key={unit}
                  disabled={isInitialValue}
                  onClick={() => handleQuickSelect(unit)}
                  className={`typo-body h-11 w-[361px] rounded-[10px] !font-bold transition-all ${
                    isInitialValue
                      ? "cursor-not-allowed bg-gray-200 text-zinc-500"
                      : isNewlySelected
                        ? "border border-[var(--color-green-deep)] bg-[var(--color-green-light)] text-black"
                        : "border border-[#D1D1D1] text-zinc-500 active:bg-zinc-200"
                  }`}
                >
                  {unit}
                </button>
              );
            })}
          </div>

          {/* 하단 제어 버튼 */}
          <div className="mt-[-4px] flex flex-col pb-16">
            <Button
              size="S"
              variant="black"
              onClick={() => setIsCustomInput(true)}
              className="border border-[#D1D1D1] !bg-white text-zinc-500"
            >
              직접 입력하기
            </Button>
          </div>
        </>
      ) : (
        /* 3. 직접 입력 모드 UI */
        <div className="flex w-full flex-col items-center gap-6 pb-16">
          <div className="w-full px-10">
            <input
              type="string"
              autoFocus
              value={customValue}
              onChange={e => setCustomValue(e.target.value)}
              className="w-full border-b-2 border-black pb-2 text-center text-3xl font-bold outline-none"
              placeholder="개"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="S"
              variant="black"
              onClick={() => setIsCustomInput(false)}
              className="!w-[100px]"
            >
              취소
            </Button>
            <Button
              size="S"
              variant="green"
              onClick={handleCustomSubmit}
              className="!w-[100px]"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
