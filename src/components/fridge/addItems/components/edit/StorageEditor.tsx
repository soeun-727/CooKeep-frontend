import { useState } from "react";
import fridgeIcon from "../../../../../assets/fridge/addItem/fridge.svg";
import freezerIcon from "../../../../../assets/fridge/addItem/freezer.svg";
import pantryIcon from "../../../../../assets/fridge/addItem/pantry.svg";
import fridgeSelected from "../../../../../assets/fridge/addItem/fridge_selected.svg";
import freezerSelected from "../../../../../assets/fridge/addItem/freezer_selected.svg";
import pantrySelected from "../../../../../assets/fridge/addItem/pantry_selected.svg";

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
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const storage = ["냉장", "냉동", "상온"];

  const handleQuickSelect = (storageName: string) => {
    setSelectedStorage(storageName);
    setTimeout(() => {
      onSave(storageName);
    }, 250);
  };

  return (
    <div className="flex flex-col gap-[18px] items-center mt-[18px] mb-16">
      <>
        <div className="flex flex-col gap-3">
          {storage.map((storage) => {
            const isInitialValue = storage === value;
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
                className={`h-11 w-[361px] rounded-[10px] typo-body font-bold transition-all
                ${
                  isInitialValue
                    ? "bg-gray-200 text-zinc-500 cursor-not-allowed"
                    : isNewlySelected
                      ? "bg-[var(--color-green-light)] text-black border border-[var(--color-green-deep)]"
                      : "border border-[#D1D1D1] text-zinc-500 active:bg-zinc-200"
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
