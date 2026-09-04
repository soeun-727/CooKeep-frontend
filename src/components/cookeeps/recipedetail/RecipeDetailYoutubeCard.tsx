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

<<<<<<< HEAD
  return (
    <section className="bg-gray-0 shadow-search rounded-M flex w-full flex-col gap-2 p-[22px_15px]">
      {/* 헤더 (항상 보임) */}
=======
  // 닫힌 상태
  if (!isOpen) {
    return (
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
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
        className="flex w-full items-center justify-between"
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

<<<<<<< HEAD
      {/* 펼쳐지는 영역 */}
      {isOpen && (
        <>
          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-green text-[14px]">
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
                className="rounded-S h-[68px] flex-1 overflow-hidden bg-gray-200"
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
=======
      {tags.length > 0 && (
        <div className="flex w-full flex-wrap content-start items-start gap-1">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-green-deep typo-caption">
              {`# ${tag}`}
            </span>
          ))}
        </div>
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
      )}

      {/* 영상 3개 */}
      <div className="flex w-full items-start gap-2">
        {videos.slice(0, 3).map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[101px] flex-col items-start gap-2"
          >
            <div className="rounded-S bg-gray-10 h-15 w-full flex-shrink-0 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="typo-caption-strong text-gray-80 line-clamp-1 w-full">
              {video.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
