interface RecipeDetailMemoProps {
  memo: string;
}

export default function RecipeDetailMemo({
  memo,
}: RecipeDetailMemoProps) {
  return (
    <div className="flex w-full justify-center px-1">
      <div className="border-gray-10 bg-gray-0 flex w-full  flex-col items-start gap-4 self-stretch rounded-L border px-3 py-4">
        {/* 작성자 라벨 */}
        <div className="flex w-full items-center gap-2 self-stretch px-1">
          <span className="typo-l-strong text-gray-80">작성자만의 팁</span>
        </div>

        {/* 메모 박스 */}
        <div className="bg-gray-10 flex w-full flex-col items-end justify-end self-stretch rounded-M p-3">
          <p className="typo-m text-gray-80 w-full self-stretch break-words whitespace-pre-wrap">
            {memo}
          </p>
        </div>
      </div>
    </div>
  );
}