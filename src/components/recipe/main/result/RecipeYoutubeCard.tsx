interface RecipeYoutubeCardProps {
  videos: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
  tags?: string[];
}

export default function RecipeYoutubeCard({
  videos,
  tags = [],
}: RecipeYoutubeCardProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-gray-0 border-gray-10 text-gray-80 rounded-L flex w-full flex-col items-start gap-2 border px-3 py-4">
      <div className="typo-l-strong text-gray-80 w-full">
        비슷한 레시피 영상 참고하기
      </div>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex w-full flex-wrap gap-x-1 gap-y-[2px]">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-green-deep typo-caption">
              {`# ${tag}`}
            </span>
          ))}
        </div>
      )}

      {/* 썸네일 3개 */}
      <div className="flex w-full gap-2">
        {videos.slice(0, 3).map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col gap-2 overflow-hidden"
          >
            <div className="rounded-S bg-gray-10 h-15 w-full overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-gray-80 typo-caption-strong truncate">
              {video.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
