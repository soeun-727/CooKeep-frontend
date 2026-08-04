import { useEffect, useState } from "react";

import { getKoreanStorage } from "@/utils/mapping";

interface StorageEditorProps {
  value: string;
  onSave: (val: string) => void;
}

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
    <div className="flex w-full flex-col items-center gap-[18px]">
      <div className="flex w-full flex-col gap-3">
        {storage.map(storage => {
          const isInitialValue = storage === koreanValue;
          const isNewlySelected =
            selectedStorage === storage && !isInitialValue;

          return (
            <button
              key={storage}
              disabled={isInitialValue}
              onClick={() => handleQuickSelect(storage)}
              className={`h-11 rounded-[12px] transition-all ${
                isNewlySelected
                  ? "border-green-deep bg-green-light text-green-deep border"
                  : isInitialValue
                    ? "bg-gray-10 text-gray-80"
                    : "border-gray-10 border text-gray-50"
              }`}
            >
              <span className="typo-l-strong">{storage}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
