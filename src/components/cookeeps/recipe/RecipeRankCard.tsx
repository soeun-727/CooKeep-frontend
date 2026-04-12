import { useNavigate } from "react-router-dom";
import fullLikeIcon from "../../../assets/cookeeps/main/full_like_cookeeps.svg";

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
    // <div
    //   onClick={() => navigate(`/cookeeps/${id}`)}
    //   className="flex justify-between items-center w-full h-12 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    // >
    //   {/* 왼쪽 블록: 순위 + 제목 + 좋아요 */}
    //   <div className="flex flex-1 items-center justify-between gap-3">
    //     {/* 순위 + 제목 */}
    //     <div className="flex items-center gap-3">
    //       <div className="flex justify-center items-center w-8 h-6 rounded-full bg-gray-800">
    //         <span className="text-white text-[12px] font-semibold">{rank}</span>
    //       </div>
    //       <div className="w-[159px] truncate font-medium text-gray-800 text-[14px]">
    //         {title}
    //       </div>
    //     </div>

    //     {/* 좋아요 수: 왼쪽 블록의 오른쪽 끝 */}
    //     <div className="flex items-center gap-1">
    //       <img src={fullLikeIcon} alt="like" className="w-5 h-5" />
    //       <span className="text-gray-400 text-[12px]">{likes}</span>
    //     </div>
    //   </div>

    //   {/* 오른쪽: 이미지 */}
    //   {image && (
    //     <img
    //       src={image}
    //       alt={title}
    //       className="w-16 h-10 rounded-md object-cover ml-[14px]"
    //     />
    //   )}
    // </div>
    <div
      onClick={() => {
        if (!isPlaceholder) navigate(`/cookeeps/${id}`);
      }}
      className={`flex items-center w-full h-12 px-2 py-2 rounded-lg transition-colors
${isPlaceholder ? "" : "cursor-pointer hover:bg-gray-50"}`}
    >
      {/* 왼쪽: 순위 + 제목 */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex justify-center items-center w-8 h-6 rounded-full bg-gray-800 flex-shrink-0">
          <span className="text-white text-[12px] font-semibold">{rank}</span>
        </div>

        <div className="truncate font-medium text-gray-800 text-[14px]">
          {title}
        </div>
      </div>

      {/* 좋아요 (고정 영역) */}
      <div className="flex items-center gap-1 flex-shrink-0 mx-4">
        <img src={fullLikeIcon} alt="like" className="w-5 h-5" />
        <span className="text-gray-400 text-[12px] whitespace-nowrap">
          {likes}
        </span>
      </div>
      {/* 좋아요 영역 아이콘 고정 */}
      {/* <div className="flex items-center w-[40px] flex-shrink-0 mr-4">
        <img src={fullLikeIcon} alt="like" className="w-5 h-5 flex-shrink-0" />
        <span className="ml-1 text-gray-400 text-[12px] whitespace-nowrap">
          {likes}
        </span>
      </div> */}
      {/* 좋아요 영역 아이콘 고정 & 숫자 오른쪽 정렬*/}
      {/* <div className="flex items-center w-[37px] flex-shrink-0 mr-4">
        <img src={fullLikeIcon} alt="like" className="w-5 h-5 flex-shrink-0" />
        <span className="ml-auto text-gray-400 text-[12px] whitespace-nowrap text-right">
          {likes}
        </span>
      </div> */}

      {/* 이미지 (항상 오른쪽 끝) */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-16 h-10 rounded-md object-cover flex-shrink-0"
        />
      )}
    </div>
  );
}
