interface Props {
  userName: string;
  memo: string;
}

export default function RecipeDetailMemo({ userName, memo }: Props) {
  return (
    <div className="w-full px-1 flex justify-center">
      <div
        className="
          flex flex-col items-center justify-center gap-2
          w-full max-w-[450px]
          px-4 py-3
          rounded-[10px]
          bg-white
        "
      >
        <span className="text-[#7D7D7D] text-[16px] font-semibold whitespace-nowrap">
          {userName}
        </span>

        <span className="text-[#7D7D7D] text-[16px] font-semibold whitespace-pre-wrap break-words w-full text-center">
          “{memo}”
        </span>
      </div>
    </div>
  );
}
