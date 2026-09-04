import { useNavigate } from "react-router-dom";

import bookIcon from "@/assets/cookeeps/main/cookeeps_bookmark.svg";

export default function MyPlantButton() {
  const navigate = useNavigate();

  return (
    <div className="relative z-20">
      <button
        onClick={() => navigate("/cookeeps/my-plant")}
        className="shadow-container rounded-S flex items-center justify-center bg-white/90 px-3 py-1 backdrop-blur-[1px] transition-transform active:scale-95"
      >
        <img src={bookIcon} alt="my plant" className="aspect-square h-5 w-5" />
        <span className="typo-caption-strong text-gray-80">키운 재료 보기</span>
      </button>
    </div>
  );
}
