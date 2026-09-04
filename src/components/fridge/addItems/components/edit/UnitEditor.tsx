import { useEffect, useState } from "react";

import { InputModal } from "@/components/fridge/modals/InputModal";
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
    setIsCustomInput(false);
  };

  const handleClose = () => {
    setCustomValue(getKoreanUnit(value));
    setIsCustomInput(false);
  };

  useEffect(() => {
    setSelectedUnit(getKoreanUnit(value));
    setCustomValue(getKoreanUnit(value));
  }, [value]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-3">
        {units.map(unit => {
          const isInitialValue = unit === koreanValue;
          const isNewlySelected = selectedUnit === unit && !isInitialValue;

          return (
            <button
              key={unit}
              onClick={() => handleQuickSelect(unit)}
              className={`typo-l-strong rounded-M h-12 w-12 w-full transition-all ${
                isNewlySelected
                  ? "border-green-deep bg-green-light text-green-deep border"
                  : isInitialValue
                    ? "bg-gray-10 text-gray-50"
                    : "border-gray-10 border text-gray-50"
              }`}
            >
              {unit}
            </button>
          );
        })}

        <Button
          size="S"
          variant="black"
          onClick={() => setIsCustomInput(true)}
          className="border-gray-10 !bg-gray-0 border text-gray-50"
        >
          직접 입력하기
        </Button>
      </div>

      {isCustomInput && (
        <InputModal
          title="단위를 직접 입력해주세요"
          buttonTexts={["확인", "취소"]}
          placeholder="[ ex. 통 ]"
          value={customValue}
          onChange={setCustomValue}
          onConfirm={handleCustomSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
