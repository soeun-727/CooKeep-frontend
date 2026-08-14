export const CookingTipsSection = ({
  cookingTips,
  onChangeCookingTips,
  readOnly = false,
}: {
  cookingTips: string;
  onChangeCookingTips?: (value: string) => void;
  readOnly?: boolean;
}) => {
  return (
    <section className="border-gray-10 rounded-L bg-gray-0 flex w-full flex-col gap-4 border px-3 py-4">
      <div className="flex w-full items-center justify-start gap-2 px-1">
        <p className="text-gray-80 typo-l-strong">나만의 팁</p>
        <p className="typo-m text-gray-50">선택</p>
      </div>
      <div className="bg-gray-10 rounded-M flex w-full flex-col p-3">
        <textarea
          placeholder={`직접 만들어보니 달랐던 점이나\n더 맛있게 먹는 방법을 알려주세요!`}
          value={cookingTips}
          readOnly={readOnly}
          onChange={e => onChangeCookingTips?.(e.target.value.slice(0, 100))}
          onInput={e => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
          className="typo-m text-gray-80 min-h-15 resize-none outline-none placeholder:text-gray-50"
        />
        <p className="typo-m flex w-full justify-end text-gray-50">
          {cookingTips.length}/100
        </p>
      </div>
    </section>
  );
};
