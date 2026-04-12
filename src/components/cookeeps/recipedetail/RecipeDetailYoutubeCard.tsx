import { useState } from "react";
import arrowRight from "../../../assets/signup/arrowright.svg";

interface Props {
  videos: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
  tags?: string[];
}

export default function RecipeDetailYoutube({ videos, tags = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videos || videos.length === 0) return null;

  return (
    <section
      className="
        flex flex-col gap-2
        p-[22px_15px]
        w-full
        rounded-[6px]
        bg-white
        shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
      "
    >
      {/* 헤더 (항상 보임) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          w-full
        "
      >
        {/* 텍스트 */}
        <div className="flex flex-col flex-1 items-start gap-1">
          <span className="text-[#7D7D7D] text-[14px] font-medium leading-[20px]">
            비슷한 레시피 영상 참고하기
          </span>
        </div>

        {/* 화살표 */}
        <img
          src={arrowRight}
          alt="토글 버튼"
          className={`
            w-[24px] h-[24px] flex-shrink-0
            transition-transform duration-200
            ${isOpen ? "rotate-270" : "rotate-90"}
          `}
        />
      </button>

      {/* 펼쳐지는 영역 */}
      {isOpen && (
        <>
          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-[#32E389] text-[14px]">
                  {`# ${tag}`}
                </span>
              ))}
            </div>
          )}

          {/* 썸네일 */}
          <div className="flex gap-2 w-full">
            {videos.slice(0, 3).map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-[6px] overflow-hidden bg-gray-200 h-[68px]"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
