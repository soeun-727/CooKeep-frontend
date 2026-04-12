interface Props {
  videos: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
  tags?: string[];
}

export default function RecipeYoutubeCard({ videos, tags = [] }: Props) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="flex flex-col gap-2 p-[22px_15px] w-full rounded-[6px] bg-white shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] mx-auto">
      <span className="typo-body2 text-[#7D7D7D]">
        비슷한 레시피 영상 참고하기
      </span>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-[#32E389] typo-body2 ">
              {`# ${tag}`}
            </span>
          ))}
        </div>
      )}

      {/* 썸네일 3개 */}
      <div className="flex gap-2 w-full">
        {videos.slice(0, 3).map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-[6px] overflow-hidden bg-gray-200"
            style={{ height: "68px" }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
