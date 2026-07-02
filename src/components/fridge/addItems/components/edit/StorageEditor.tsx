import { useEffect, useState } from "react";

import freezerIcon from "@/assets/fridge/addItem/freezer.svg";
import freezerSelected from "@/assets/fridge/addItem/freezer_selected.svg";
import fridgeIcon from "@/assets/fridge/addItem/fridge.svg";
import fridgeSelected from "@/assets/fridge/addItem/fridge_selected.svg";
import pantryIcon from "@/assets/fridge/addItem/pantry.svg";
import pantrySelected from "@/assets/fridge/addItem/pantry_selected.svg";

import { getKoreanStorage } from "@/utils/mapping";

interface StorageEditorProps {
  value: string;
  onSave: (val: string) => void;
}
const STORAGE_CONFIG: Record<string, { default: string; selected: string }> = {
  냉장: { default: fridgeIcon, selected: fridgeSelected },
  냉동: { default: freezerIcon, selected: freezerSelected },
  상온: { default: pantryIcon, selected: pantrySelected },
};

export default function StorageEditor({ value, onSave }: StorageEditorProps) {
  const [selectedStorage, setSelectedStorage] = useState<string | null>(
    getKoreanStorage(value),
  );
  const storage = ["냉장", "냉동", "상온"];
  const koreanValue = getKoreanStorage(value);

  const handleQuickSelect = (storageName: string) => {
    setSelectedStorage(storageName);
    setTimeout(() => {
      onSave(storageName);
    }, 250);
  };

  useEffect(() => {
    setSelectedStorage(getKoreanStorage(value));
  }, [value]);

  return (
    <div className="mt-[18px] mb-16 flex flex-col items-center gap-[18px]">
      <>
        <div className="flex flex-col gap-3">
          {storage.map(storage => {
            const isInitialValue = storage === koreanValue;
            const isNewlySelected =
              selectedStorage === storage && !isInitialValue;
            const iconSrc = isNewlySelected
              ? STORAGE_CONFIG[storage].selected
              : STORAGE_CONFIG[storage].default;
            return (
              <button
                key={storage}
                disabled={isInitialValue}
                onClick={() => handleQuickSelect(storage)}
                className={`typo-body h-11 w-[361px] rounded-[10px] font-bold transition-all ${
                  isInitialValue
                    ? "cursor-not-allowed bg-gray-200 text-gray-50"
                    : isNewlySelected
                      ? "bg-green-light border-green-deep border text-black"
                      : "border-gray-10 active:bg-gray-30 border text-gray-50"
                }`}
              >
                <div className="flex justify-center gap-[6px]">
                  <img src={iconSrc} alt={storage} className="w-3" />
                  <span>{storage}</span>
                </div>
              </button>
            );
          })}
        </div>
      </>
    </div>
  );
}
