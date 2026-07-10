import { useState } from "react";

import Button from "@/components/ui/Button";

interface MemoEditorProps {
  value: string;
  onSave: (val: string) => void;
}

export default function MemoEditor({ value, onSave }: MemoEditorProps) {
  const MAX_LENGTH = 100;
  const [text, setText] = useState(value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setText(value);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative w-full">
        <textarea
          autoFocus
          value={text}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          placeholder="메모를 입력해주세요 (최대 100자)"
          className="border-gray-10 typo-body h-[389px] w-full resize-none rounded-[10px] border p-3 outline-none"
        />
      </div>

      <Button
        size="S"
        className="w-full"
        disabled={text === value}
        onClick={() => onSave(text)}
      >
        작성 완료
      </Button>
    </div>
  );
}
