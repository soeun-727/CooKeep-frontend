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
      <div className="bg-gray-0 rounded-M flex w-full max-w-[450px] flex-col items-center justify-center gap-2 px-4 py-3">
        <span className="text-[16px] font-semibold whitespace-nowrap text-gray-50">
          {userName}
        </span>

        <span className="w-full text-center text-[16px] font-semibold break-words whitespace-pre-wrap text-gray-50">
          “{memo}”
        </span>
      </div>
    </div>
  );
}
