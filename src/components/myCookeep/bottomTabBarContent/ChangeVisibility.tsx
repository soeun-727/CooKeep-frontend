import { BottomTabBar } from "@/components/ui/BottomTabBar";

interface ChangeVisibilityProps {
  isPublic: boolean;
  onSelect: (nextIsPublic: boolean) => void;
  onClose: () => void;
}

export const ChangeVisibility = ({
  isPublic,
  onSelect,
  onClose,
}: ChangeVisibilityProps) => {
  const buttonClassName = (isSelected: boolean) =>
    `w-full rounded-M px-4 py-3 ${
      isSelected ? "bg-green-light border border-green-deep" : "bg-gray-10"
    }`;

  const textClassName = (isSelected: boolean) =>
    `typo-l-strong ${isSelected ? "text-green-deep" : "text-gray-50"}`;

  return (
    <div onClick={e => e.stopPropagation()}>
      <BottomTabBar
        title="레시피 공개 상태를 선택해주세요"
        onClose={onClose}
        BottomTabBarContent={
          <section className="flex flex-col gap-3">
            <button
              className={buttonClassName(!isPublic)}
              onClick={() => onSelect(false)}
            >
              <p className={textClassName(!isPublic)}>나만 보기</p>
            </button>
            <button
              className={buttonClassName(isPublic)}
              onClick={() => onSelect(true)}
            >
              <p className={textClassName(isPublic)}>쿠킵스에 공개</p>
            </button>
          </section>
        }
      />
    </div>
  );
};
