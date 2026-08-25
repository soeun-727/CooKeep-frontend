import CrownBronze from "@/assets/cookeeps/main/crown_bronze.svg?react";
import CrownGold from "@/assets/cookeeps/main/crown_gold.svg?react";
import CrownSilver from "@/assets/cookeeps/main/crown_silver.svg?react";

interface RankingCardProps {
  rank: number;
  name: string;
  plantImage?: string;
  score: number;
  isFirst?: boolean;
}

const crownSVGs = [CrownGold, CrownSilver, CrownBronze];

export default function RankingCard({
  rank,
  name,
  plantImage,
  score,
  isFirst = false,
}: RankingCardProps) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-1 ${
        isFirst ? "pb-4" : ""
      }`}
    >
      {/* 왕관 영역 */}
      <div className="flex h-[26px] w-[26px] items-center justify-center py-[2px]">
        {(() => {
          const CrownIcon = crownSVGs[rank - 1];
          return (
            <CrownIcon
              aria-label={`${rank}등 왕관`}
              role="img"
              className="h-[26px] w-[26px]"
            />
          );
        })()}
      </div>

      {/* 카드 박스 */}
      <div
        className={`flex w-full flex-col items-center gap-2 self-stretch rounded-[12px] p-2 ${
          isFirst ? "bg-green-light" : "bg-gray-0"
        }`}
      >
        {/* 프로필 이미지 */}
        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden">
          {plantImage && (
            <img
              src={plantImage}
              alt={name}
              className="h-[40px] w-[40px] rounded-full object-cover"
            />
          )}
        </div>

        {/* 유저 이름 & 물준 횟수 */}
        <div className="flex flex-col items-center self-stretch">
          <p className="typo-m-strong text-gray-80 line-clamp-1 self-stretch text-center">
            {name}
          </p>

          <p
            className={`line-clamp-1 self-stretch text-center ${
              isFirst ? "typo-m text-green-deep" : "typo-m-strong text-gray-80"
            }`}
          >
            {score}회
          </p>
        </div>
      </div>
    </div>
  );
}
