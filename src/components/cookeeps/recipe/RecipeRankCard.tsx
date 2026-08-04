import { useNavigate } from "react-router-dom";

import fullLikeIcon from "@/assets/cookeeps/main/full_like_cookeeps.svg";

interface RecipeRankCardProps {
  rank: number;
  title: string;
  image?: string;
  likes: number;
  id: string;
}

export default function RecipeRankCard({
  rank,
  title,
  image,
  likes,
  id,
}: RecipeRankCardProps) {
  const navigate = useNavigate();
  const isPlaceholder = id === "0";
  return (
    <div
      onClick={() => {
        if (!isPlaceholder) navigate(`/cookeeps/${id}`);
      }}
      className={`flex h-12 w-full items-center rounded-lg px-2 py-2 transition-colors ${isPlaceholder ? "" : "cursor-pointer hover:bg-gray-50"}`}
    >
      {/* 왼쪽: 순위 + 제목 */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-6 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-800">
          <span className="text-gray-0 text-[12px] font-semibold">{rank}</span>
        </div>

        <div className="truncate text-[14px] font-medium text-gray-800">
          {title}
        </div>
      </div>

      {/* 좋아요 (고정 영역) */}
      <div className="mx-4 flex flex-shrink-0 items-center gap-1">
        <img src={fullLikeIcon} alt="like" className="h-5 w-5" />
        <span className="text-[12px] whitespace-nowrap text-gray-400">
          {likes}
        </span>
      </div>

      {/* 이미지 (항상 오른쪽 끝) */}
      {image && (
        <img
          src={image}
          alt={title}
          className="h-10 w-16 flex-shrink-0 rounded-md object-cover"
        />
      )}
    </div>
  );
}
