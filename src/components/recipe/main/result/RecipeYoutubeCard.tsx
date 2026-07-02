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
    <section className="bg-gray-0 mx-auto flex w-full flex-col gap-2 rounded-[6px] p-[22px_15px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
      <span className="typo-body2 text-gray-50">
        비슷한 레시피 영상 참고하기
      </span>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-green typo-body2">
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
            className="flex-1 overflow-hidden rounded-[6px] bg-gray-200"
            style={{ height: "68px" }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
