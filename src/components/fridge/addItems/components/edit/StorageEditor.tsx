import { useEffect, useState } from "react";

import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import type { IconComponent } from "@/types/icon";

import { getKoreanStorage } from "@/utils/mapping";

interface StorageEditorProps {
  value: string;
  onSave: (val: string) => void;
}
const STORAGE_ICONS: Record<string, IconComponent> = {
  냉장: FridgeIcon,
  냉동: FreezerIcon,
  상온: PantryIcon,
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
            const Icon = STORAGE_ICONS[storage];
            return (
              <button
                key={storage}
                disabled={isInitialValue}
                onClick={() => handleQuickSelect(storage)}
                className={`typo-body h-11 w-[361px] rounded-[10px] font-bold ${
                  isInitialValue
                    ? "cursor-not-allowed bg-gray-200 text-gray-50"
                    : isNewlySelected
                      ? "bg-green-light border-green-deep border text-black"
                      : "border-gray-10 active:bg-gray-30 border text-gray-50"
                }`}
              >
                <div className="flex justify-center gap-[6px]">
                  <Icon className="w-3" />
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
