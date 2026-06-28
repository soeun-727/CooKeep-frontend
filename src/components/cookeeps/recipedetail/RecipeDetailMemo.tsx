interface RecipeDetailMemoProps {
  userName: string;
  memo: string;
}

export default function RecipeDetailMemo({
  userName,
  memo,
}: RecipeDetailMemoProps) {
  return (
    <div className="flex w-full justify-center px-1">
      <div className="flex w-full max-w-[450px] flex-col items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-3">
        <span className="text-[16px] font-semibold whitespace-nowrap text-[#7D7D7D]">
          {userName}
        </span>

        <span className="w-full text-center text-[16px] font-semibold break-words whitespace-pre-wrap text-[#7D7D7D]">
          “{memo}”
        </span>
      </div>
    </div>
  );
}
