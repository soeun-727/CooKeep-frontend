interface RecipeDetailMemoProps {
  userName: string;
  memo: string;
}

export default function RecipeDetailMemo({
  userName,
  memo,
}: RecipeDetailMemoProps) {
  return (
    <div className="w-full px-1 flex justify-center">
      <div
        className="
          flex flex-col items-center justify-center gap-2
          w-full max-w-[450px]
          px-4 py-3
          rounded-[10px]
          bg-gray-0
        "
      >
        <span className="text-gray-50 text-[16px] font-semibold whitespace-nowrap">
          {userName}
        </span>

        <span className="text-gray-50 text-[16px] font-semibold whitespace-pre-wrap break-words w-full text-center">
          “{memo}”
        </span>
      </div>
    </div>
  );
}
