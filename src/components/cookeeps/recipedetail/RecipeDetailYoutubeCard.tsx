import { useState } from "react";

import arrowRight from "@/assets/signup/arrowright.svg";

interface RecipeDetailYoutubeProps {
  videos: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
  tags?: string[];
}

export default function RecipeDetailYoutube({
  videos,
  tags = [],
}: RecipeDetailYoutubeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="flex w-full flex-col gap-2 rounded-[6px] bg-white p-[22px_15px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
      {/* 헤더 (항상 보임) */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex w-full items-center gap-2"
      >
        {/* 텍스트 */}
        <div className="flex flex-1 flex-col items-start gap-1">
          <span className="text-[14px] leading-[20px] font-medium text-[#7D7D7D]">
            비슷한 레시피 영상 참고하기
          </span>
        </div>

        {/* 화살표 */}
        <img
          src={arrowRight}
          alt="토글 버튼"
          className={`h-[24px] w-[24px] flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-270" : "rotate-90"} `}
        />
      </button>

      {/* 펼쳐지는 영역 */}
      {isOpen && (
        <>
          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-[14px] text-[#32E389]">
                  {`# ${tag}`}
                </span>
              ))}
            </div>
          )}

          {/* 썸네일 */}
          <div className="flex w-full gap-2">
            {videos.slice(0, 3).map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[68px] flex-1 overflow-hidden rounded-[6px] bg-gray-200"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
