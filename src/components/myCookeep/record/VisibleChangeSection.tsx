interface VisibleChangeSectionProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export const VisibleChangeSection = ({
  isPublic,
  onChange,
}: VisibleChangeSectionProps) => {
  return (
    <section className="bg-gray-0 rounded-L border-gray-10 flex w-full flex-col gap-4 border px-3 py-4">
      <h4 className="text-gray-80 typo-l-strong w-full px-1">공개 범위</h4>
      <div className="flex flex-col gap-2">
        <div className="flex w-full">
          <button
            onClick={() => onChange(false)}
            className={`px-4 py-2 ${isPublic === false ? "border-green-deep text-green-deep bg-green-light border" : "bg-gray-10 text-gray-50"} typo-label rounded-l-M flex-1`}
          >
            나만 보기
          </button>
          <button
            onClick={() => onChange(true)}
            className={`px-4 py-2 ${isPublic === true ? "border-green-deep text-green-deep bg-green-light border" : "bg-gray-10 text-gray-50"} typo-label rounded-r-M flex-1`}
          >
            쿠킵스에 공개
          </button>
        </div>
        {isPublic === true ? (
          <p className="typo-m w-full px-1 text-gray-50">
            다른 사용자들이 내 레시피를 볼 수 있어요
          </p>
        ) : (
          <p className="typo-m text-gray-50">나만 레시피를 볼 수 있어요</p>
        )}
      </div>
    </section>
  );
};
