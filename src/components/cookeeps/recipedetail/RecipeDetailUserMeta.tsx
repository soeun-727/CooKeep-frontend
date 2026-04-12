// import { useState } from "react";
import likeIcon from "../../../assets/cookeeps/main/like_cookeeps.svg";
import saveIcon from "../../../assets/cookeeps/main/save_cookeeps.svg";

// 저장눌렀을때 아이콘 확정되면 수정

interface Props {
  userName: string;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

export default function RecipeDetailUserMeta({
  userName,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
}: Props) {
  // const [liked, setLiked] = useState(false);
  // const [saved, setSaved] = useState(false);

  return (
    <div
      className="
    flex justify-between items-center
    w-full p-1
  "
    >
      {/* 유저 pill */}
      <div
        className="
  flex items-center
  h-[20px]
  px-3
  gap-1
  rounded-full
  bg-[#202020]
"
      >
        <span className="text-[#32E389] text-[12px] font-medium">
          {userName}
        </span>
        <span className="text-white text-[12px] font-medium">님의 레시피</span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center">
        <button
          onClick={onLike}
          className="w-[36px] h-[36px] flex items-center justify-center rounded-full"
        >
          <img
            src={likeIcon}
            alt="좋아요"
            className={`w-8 h-8 ${isLiked ? "invert brightness-100" : ""}`}
          />
        </button>

        <button
          onClick={onBookmark}
          className="w-[36px] h-[36px] flex items-center justify-center rounded-full"
        >
          <img
            src={saveIcon}
            alt="저장"
            className={`w-8 h-8 ${isBookmarked ? "invert brightness-100" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
