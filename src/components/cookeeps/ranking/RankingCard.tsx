// crown은 require 대신 import로
import crownGold from "../../../assets/cookeeps/main/crown_gold.svg";
import crownSilver from "../../../assets/cookeeps/main/crown_silver.svg";
import crownBronze from "../../../assets/cookeeps/main/crown_bronze.svg";

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
      className={`flex flex-col items-center gap-[-7px] w-[109px] ${
        isFirst ? "-mt-4" : ""
      }`}
    >
      {/* 왕관 영역 */}
      <div className="flex justify-center items-center w-[26px] h-[26px] p-[2px] z-10 -mb-[7px]">
        {/* -mb-[7px]를 추가해서 아래 요소를 위로 7px 당깁니다. z-10으로 왕관을 위로 올립니다. */}
        <img
          src={crownSVGs[rank - 1]}
          alt={`${rank}등 왕관`}
          className="w-[26px] h-[22px]"
        />
      </div>

      {/* 카드 박스 */}
      <div
        className={`relative flex flex-col items-center gap-1 p-[11px_11px_10px_12px] rounded-[6px] shadow-md ${
          isFirst ? "bg-[#96E8BE]" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center gap-[6px]">
          {/* 식물 이미지 */}
          <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center overflow-hidden bg-gray-50">
            {plantImage && (
              <img
                src={plantImage}
                alt={name}
                className="w-[40px] h-[40px] object-cover rounded-full"
              />
            )}
          </div>

          {/* 이름과 점수를 감싸는 컨테이너에서 gap을 제거하거나, 둘만 따로 묶습니다 */}
          <div className="flex flex-col items-center">
            {/* 이름 */}
            <p className="w-[86px] text-[9px] font-medium text-gray-800 text-center truncate leading-tight">
              {name}
            </p>

            {/* 물 주기 횟수 */}
            <p
              className={`w-[86px] text-[12px] font-semibold text-center truncate leading-tight ${
                isFirst ? "text-gray-800" : "text-[#1FC16F]"
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
