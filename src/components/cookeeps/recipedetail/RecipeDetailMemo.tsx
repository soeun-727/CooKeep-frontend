interface RecipeDetailMemoProps {
  memo: string;
}

export default function RecipeDetailMemo({ memo }: RecipeDetailMemoProps) {
  return (
    <div className="flex w-full justify-center px-1">
<<<<<<< HEAD
      <div className="bg-gray-0 rounded-M flex w-full max-w-[450px] flex-col items-center justify-center gap-2 px-4 py-3">
        <span className="text-[16px] font-semibold whitespace-nowrap text-gray-50">
          {userName}
        </span>
=======
      <div className="border-gray-10 bg-gray-0 rounded-L flex w-full flex-col items-start gap-4 border px-3 py-4">
        {/* 작성자 라벨 */}
        <div className="flex w-full items-center gap-2 px-1">
          <span className="typo-l-strong text-gray-80">작성자만의 팁</span>
        </div>
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b

        {/* 메모 박스 */}
        <div className="bg-gray-10 rounded-M flex w-full flex-col items-end justify-end p-3">
          <p className="typo-m text-gray-80 w-full break-words whitespace-pre-wrap">
            {memo}
          </p>
        </div>
      </div>
    </div>
  );
}
