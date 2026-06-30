import { useState } from "react";
import Button from "@/components/ui/Button";

interface QuantityEditorProps {
  value: number;
  onSave: (val: number) => void;
}

export default function QuantityEditor({ value, onSave }: QuantityEditorProps) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState(String(value));
  const [selectedNum, setSelectedNum] = useState<number | null>(value);
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
    <div className="mt-[18px] flex flex-col items-center gap-[18px]">
      {!isCustomInput ? (
        <>
          <div className="grid h-12 w-82 grid-cols-6 gap-2">
            {quickNumbers.map((num) => {
              const isInitialValue = num === value;
              const isNewlySelected = selectedNum === num && !isInitialValue;
              return (
                <button
                  key={num}
                  disabled={isInitialValue}
                  onClick={() => handleQuickSelect(num)}
                  className={`h-12 w-12 rounded-[6px] typo-body transition-all
                ${
                  isInitialValue
                    ? "bg-gray-200 text-gray-50 cursor-not-allowed"
                    : isNewlySelected
                      ? "bg-green-light text-black border border-green-deep"
                      : "text-gray-50 active:bg-gray-30"
                }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* 하단 제어 버튼 */}
          <div className="flex flex-col pb-16">
            <Button
              size="S"
              variant="black"
              onClick={() => setIsCustomInput(true)}
              className="!w-[147px]"
            >
              직접 입력
            </Button>
          </div>
        </>
      ) : (
        /* 3. 직접 입력 모드 UI */
        <div className="flex w-full flex-col items-center gap-6 pb-16">
          <div className="w-full px-10">
            <input
              type="number"
              autoFocus
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
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
    </div>
  );
}
