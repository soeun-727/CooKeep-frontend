import optionIcon from "@/assets/mycookeep/record/options.svg";
import { ComponentType, CSSProperties, SVGProps } from "react";
import { createPortal } from "react-dom";

interface RecipeOptionMenuProps {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
  firstOption?: string;
  secondOption?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  menuClassName?: string;
  menuStyle?: CSSProperties;
}

export default function RecipeOptionMenu({
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  firstOption = "수정하기",
  secondOption = "삭제하기",
  Icon,
  iconClassName,
  menuClassName = "top-10 right-2",
  menuStyle,
}: RecipeOptionMenuProps) {
  const portalTarget = document.getElementById("sidebar-portal");

  return (
    <div className="relative flex items-center">
      {isOpen &&
        portalTarget &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[160] cursor-default"
              onClick={e => onToggle(e as any)}
            />
            <div
              onClick={e => e.stopPropagation()}
              style={menuStyle}
              className={`bg-gray-0/90 shadow-container rounded-L absolute z-[150] flex w-31 flex-col overflow-hidden py-2 ${menuClassName}`}
            >
              {/* 수정하기 버튼 */}
              <button
                onClick={onEdit}
                className="typo-m w-full px-3 py-2 text-left"
              >
                <span className="text-gray-80">{firstOption}</span>
              </button>

              {/* 삭제하기 버튼 */}
              <button
                onClick={onDelete}
                className="typo-m w-full px-3 py-2 text-left"
              >
                <span className="text-semantic-negative">{secondOption}</span>
              </button>
            </div>
          </>,
          portalTarget,
        )}

      {/* 옵션 아이콘 버튼 */}
      <button
        onClick={onToggle}
        className="relative z-[110] flex h-9 w-9 cursor-pointer items-center justify-center"
      >
        {Icon ? (
          <Icon className={iconClassName} />
        ) : (
          <img src={optionIcon} className="w-1" alt="option" />
        )}
      </button>
    </div>
  );
}
