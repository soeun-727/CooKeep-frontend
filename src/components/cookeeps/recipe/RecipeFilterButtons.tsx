import { useNavigate } from "react-router-dom";

import LikeIcon from "@/assets/cookeeps/main/like_cookeeps.svg?react";
import SaveIcon from "@/assets/cookeeps/main/save_cookeeps.svg?react";
import ArrowRight from "@/assets/signup/arrowright.svg?react";

export default function RecipeFilterButtons() {
  const navigate = useNavigate();
  return (
    <div className="z-20 flex h-7 w-full items-center justify-between">
      {/* 전체보기 */}
      <button
        onClick={() => navigate("/cookeeps/all")}
        className="flex items-center gap-1 text-[12px] font-semibold text-gray-400"
      >
        전체보기
        <ArrowRight aria-label="arrow" role="img" className="h-5 w-5" />
      </button>

      {/* 좋아요 / 북마크 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/cookeeps/liked")}
          className="flex items-center"
        >
          <LikeIcon aria-label="likes" role="img" className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/cookeeps/bookmarked")}
          className="flex items-center"
        >
          <SaveIcon aria-label="bookmarks" role="img" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
