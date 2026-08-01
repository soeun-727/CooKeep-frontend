import { useNavigate } from "react-router-dom";

import ArrowRightIcon from "@/assets/signup/arrowright.svg?react";
import SaveIcon from "@/assets/cookeeps/bookmark.svg?react";
import LikeIcon from "@/assets/cookeeps/like.svg?react";

interface FilterButtonItem {
  id: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  path: string;
}

export default function RecipeFilterButtons() {
  const navigate = useNavigate();

  // 버튼 데이터 배열화
  const filterButtons: FilterButtonItem[] = [
    {
      id: "liked",
      label: "좋아요한 레시피 보기",
      icon: LikeIcon,
      path: "/cookeeps/liked",
    },
    {
      id: "bookmarked",
      label: "저장한 레시피 보기",
      icon: SaveIcon,
      path: "/cookeeps/bookmarked",
    },
  ];

  return (
    /* 전체 container */
    <div className="flex w-full flex-col items-start gap-2">
      {filterButtons.map(btn => {
        const IconComponent = btn.icon;
        return (
          <button
            key={btn.id}
            onClick={() => navigate(btn.path)}
            /* 각각 button */
            className="border-gray-10 bg-gray-0 flex h-12 w-full cursor-pointer items-center gap-3 rounded-[12px] border p-3 transition-colors"
          >
            {/* 왼쪽 아이콘 */}
            <IconComponent className="text-green aspect-square h-6 w-6 flex-shrink-0" />

            {/* 텍스트 영역 */}
            <span className="typo-m-strong text-gray-80 flex h-6 flex-1 items-center justify-start overflow-hidden text-left text-ellipsis whitespace-nowrap">
              {btn.label}
            </span>

            {/* 오른쪽 화살표 */}
            <ArrowRightIcon
              className="text-gray-30 aspect-square h-6 w-6 flex-shrink-0"
              fill="currentColor"
            />
          </button>
        );
      })}
    </div>
  );
}
