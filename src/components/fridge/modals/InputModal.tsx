import { useState } from "react";

import Button from "@/components/ui/Button";

interface InputModalProps {
  title: string;
  buttonTexts?: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}
export const InputModal = ({
  title,
  buttonTexts = ["변경", "취소"],
  placeholder,
  value,
  onChange,
  onConfirm,
  onClose,
}: InputModalProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const addBrackets = (value: string) => (value ? `[${value}]` : "");

  const removeBrackets = (value: string) =>
    value.replace(/^\[/, "").replace(/\]$/, "");

  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />
      <section className="z-100 flex w-[300px] flex-col gap-6 rounded-xl bg-white p-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="typo-l-strong">{title}</p>
          <div>
            <input
              value={isFocused ? value : addBrackets(value)}
              onChange={e => onChange(removeBrackets(e.target.value))}
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="typo-m placeholder:text-gray-30 text-gray-80 flex-1 bg-transparent text-center outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {buttonTexts.map((text, i) => (
            <Button
              key={text}
              variant={i === 0 ? "green" : "gray"}
              onClick={i === 0 ? onConfirm : onClose}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};
