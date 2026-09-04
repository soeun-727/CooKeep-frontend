import { CSSProperties, ComponentType, SVGProps } from "react";
import { createPortal } from "react-dom";

import OptionIcon from "@/assets/mycookeep/record/options.svg?react";

interface RecipeOptionMenuProps {
  isOpen: boolean;
  onToggle: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
  ) => void;
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
              className="fixed inset-0 z-[150] cursor-default"
              onClick={onToggle}
            />
            <div
              onClick={e => e.stopPropagation()}
              style={menuStyle}
              className={`bg-gray-0/90 shadow-container rounded-L absolute z-[160] flex w-31 flex-col overflow-hidden py-2 ${menuClassName}`}
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
        className="relative z-[110] flex cursor-pointer items-center justify-center"
      >
        {Icon ? (
          <Icon className={iconClassName} />
        ) : (
          <OptionIcon className="w-1" aria-label="option" role="img" />
        )}
      </button>
    </div>
  );
}
