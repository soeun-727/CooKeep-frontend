//TODO: 여기 일단 피그마에 맞게 바꿨는데 영상부분이 아예 안나와서 확인은 못해봄...
import { useState } from "react";

import ArrowRight from "@/assets/signup/arrowright.svg?react";

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

  // 닫힌 상태
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-gray-0 border-gray-10 rounded-M flex h-12 w-full items-start justify-center gap-3 border p-3"
      >
        <span className="typo-l-strong text-gray-80 flex h-6 flex-1 flex-col justify-center overflow-hidden text-left text-ellipsis whitespace-nowrap">
          비슷한 레시피 영상 참고하기
        </span>
        {/* 화살표 */}
        <ArrowRight
          aria-label="토글 버튼"
          role="img"
          className="h-6 w-6 flex-shrink-0 rotate-270"
        />
      </button>
    );
  }

  // 열린 상태
  return (
    <section className="bg-gray-0 border-gray-10 rounded-M flex w-full flex-col items-start gap-2 border p-3">
      {/* 제목 (누르면 닫힘) */}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="flex w-full items-center justify-between self-stretch"
      >
        <span className="typo-l-strong text-gray-80 flex h-6 flex-1 flex-col justify-center overflow-hidden text-left text-ellipsis whitespace-nowrap">
          비슷한 레시피 영상 참고하기
        </span>
        <ArrowRight
          aria-label="토글 버튼"
          role="img"
          className="h-6 w-6 flex-shrink-0 rotate-90"
        />
      </button>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex w-full flex-wrap content-start items-start gap-1 self-stretch">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-green-deep typo-caption">
              {`# ${tag}`}
            </span>
          ))}
        </div>
      )}

      {/* 영상 3개 */}
      <div className="flex w-full items-start gap-2 self-stretch">
        {videos.slice(0, 3).map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[101px] flex-col items-start gap-2"
          >
            <div className="rounded-S bg-gray-10 h-15 w-full flex-shrink-0 self-stretch overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="typo-caption-strong text-gray-80 line-clamp-1 w-full self-stretch">
              {video.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
