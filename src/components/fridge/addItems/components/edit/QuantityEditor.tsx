import { useState } from "react";

import Button from "@/components/ui/Button";

interface QuantityEditorProps {
  value: number;
  onSave: (val: number) => void;
}

export default function QuantityEditor({ value, onSave }: QuantityEditorProps) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(String(value));
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const quickNumbers = [1, 2, 3, 4, 5, 6];

  const handleQuickSelect = (num: number) => {
    if (num == value) return;
    setSelectedNum(num);
    setTimeout(() => {
      onSave(num);
    }, 200);
  };

  const handleCustomSubmit = () => {
    const finalValue = Number(customValue);
    if (isNaN(finalValue) || finalValue < 1) return;
    onSave(finalValue);
  };

  return (
    <>
      {!isCustomInput ? (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-6 gap-2">
            {quickNumbers.map(num => {
              const isInitialValue = num === value;
              const isNewlySelected = selectedNum === num && !isInitialValue;
              return (
                <button
                  key={num}
                  disabled={isInitialValue}
                  onClick={() => handleQuickSelect(num)}
                  className={`typo-body h-12 w-12 rounded-[6px] transition-all ${
                    isNewlySelected
                      ? "border-green-deep bg-green-light text-green-deep border"
                      : isInitialValue
                        ? "bg-gray-10 text-gray-80"
                        : "text-gray-50"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* 하단 제어 버튼 */}
          <div className="flex w-full flex-col">
            <Button
              size="S"
              variant="black"
              onClick={() => setIsCustomInput(true)}
              className="w-full"
            >
              직접 입력
            </Button>
          </div>
        </div>
      ) : (
        /* 3. 직접 입력 모드 UI */
        <div className="flex w-full flex-col items-center gap-6 pb-16">
          <div className="w-full px-10">
            <input
              type="number"
              autoFocus
              value={customValue}
              onChange={e => setCustomValue(e.target.value)}
              className="w-full border-b-2 border-black pb-2 text-center text-3xl font-bold outline-none"
              placeholder="1"
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
    </>
  );
}
