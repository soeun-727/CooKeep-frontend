import crownBronze from "@/assets/cookeeps/main/crown_bronze.svg";
import crownGold from "@/assets/cookeeps/main/crown_gold.svg";
import crownSilver from "@/assets/cookeeps/main/crown_silver.svg";

interface RankingCardProps {
  rank: number;
  name: string;
  plantImage?: string;
  score: number;
  isFirst?: boolean;
}

const crownSVGs = [crownGold, crownSilver, crownBronze];

export default function RankingCard({
  rank,
  name,
  plantImage,
  score,
  isFirst = false,
}: RankingCardProps) {
  return (
    <div
      className={`flex w-[109px] flex-col items-center gap-[-7px] ${
        isFirst ? "-mt-4" : ""
      }`}
    >
      {/* 왕관 영역 */}
      <div className="z-10 -mb-[7px] flex h-[26px] w-[26px] items-center justify-center p-[2px]">
        <img
          src={crownSVGs[rank - 1]}
          alt={`${rank}등 왕관`}
          className="h-[22px] w-[26px]"
        />
      </div>

      {/* 카드 박스 */}
      <div
        className={`shadow-plant rounded-M relative flex flex-col items-center gap-1 p-[11px_11px_10px_12px] ${
          isFirst ? "bg-green-light" : "bg-gray-0"
        }`}
      >
        <div className="flex flex-col items-center gap-[6px]">
          {/* 식물 이미지 */}
          <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-gray-50">
            {plantImage && (
              <img
                src={plantImage}
                alt={name}
                className="h-[40px] w-[40px] rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col items-center">
            {/* 이름 */}
            <p className="w-[86px] truncate text-center text-[9px] leading-tight font-medium text-gray-800">
              {name}
            </p>

            {/* 물 주기 횟수 */}
            <p
              className={`w-[86px] truncate text-center text-[12px] leading-tight font-semibold ${
                isFirst ? "text-gray-800" : "text-green-deep"
              }`}
            >
              {score}회
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
