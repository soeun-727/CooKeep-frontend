import { useState } from "react";

import Button from "@/components/ui/Button";

interface MemoEditorProps {
  value: string;
  onSave: (val: string) => void;
}

export default function MemoEditor({ value, onSave }: MemoEditorProps) {
  const MAX_LENGTH = 100;
  const [text, setText] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_LENGTH) {
      setText(val);
    }
  };

  return (
    <div className="mt-[18px] mb-16 flex flex-col items-center pb-[18px]">
      <textarea
        autoFocus
        value={text}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
        placeholder="메모를 입력해주세요(최대 100글자)"
        className="border-gray-10 typo-body h-49 w-[361px] resize-none rounded-[10px] border p-3 text-center outline-none"
      />

      {/* 저장 버튼으로 명시적 저장 */}
      <Button
        onClick={() => onSave(text)}
        className="mt-[18px] !w-[147px]"
        size="S"
        type="submit"
      >
        작성 완료
      </Button>
    </div>
  );
}
