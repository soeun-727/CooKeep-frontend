import { useState } from "react";
import Button from "../../../../ui/Button";

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
    <div className="flex flex-col items-center mt-[18px] mb-16 pb-[18px]">
      <textarea
        autoFocus
        value={text}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
        placeholder="메모를 입력해주세요(최대 100글자)"
        className="w-[361px] h-49 p-3 rounded-[10px] border border-[#D1D1D1] text-center outline-none resize-none typo-body"
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
