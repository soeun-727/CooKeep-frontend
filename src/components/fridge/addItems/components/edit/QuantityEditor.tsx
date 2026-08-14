import { useEffect, useState } from "react";

import { InputModal } from "@/components/fridge/modals/InputModal";
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
    setIsCustomInput(false);
  };

  const handleClose = () => {
    setCustomValue(String(value));
    setIsCustomInput(false);
  };

  useEffect(() => {
    setSelectedNum(value);
    setCustomValue(String(value));
  }, [value]);

  return (
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
              className={`typo-body rounded-S h-12 w-12 transition-all ${
                isNewlySelected
                  ? "border-green-deep bg-green-light text-green-deep border"
                  : isInitialValue
                    ? "bg-gray-10 text-gray-50"
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
      {isCustomInput && (
        <InputModal
          title="수량을 직접 입력해주세요"
          buttonTexts={["확인", "취소"]}
          placeholder="[ ex. 3 ]"
          value={customValue}
          onChange={setCustomValue}
          onConfirm={handleCustomSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
