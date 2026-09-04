import { memo } from "react";

import { WateringRankItem } from "@/api/cookeeps";

import thinkingChar from "@/assets/character/thinking_char.svg";
import seedlingPot from "@/assets/cookeeps/main/seedling_pot.svg";
import plantBefore from "@/assets/cookeeps/plant/plant_before.svg";
import { plantChar } from "@/assets/index";

import RankingCard from "./RankingCard";

interface WeeklyTop3SectionProps {
  users: WateringRankItem[];
  myCount: number;
}

function WeeklyTop3Section({ users, myCount }: WeeklyTop3SectionProps) {
  const order = [1, 0, 2]; // 2-1-3 UI
  const fallbackUser = {
    rank: 0,
    nickname: "식물을 키워보세요!",
    profileImageUrl: plantBefore,
    wateringCount: 0,
  };

  // 항상 3칸 채우기
  const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);

  const filledUsers = Array.from({ length: 3 }, (_, i) => {
    const user = sortedUsers[i];
    return (
      user ?? {
        ...fallbackUser,
        rank: i + 1,
      }
    );
  });

  const currentMonth = new Date().getMonth() + 1;
  const isRankingEmpty = users.length <= 2;

  return (
<<<<<<< HEAD
    <div className="bg-green-light shadow-plant rounded-M flex min-h-[202px] w-full flex-col items-center gap-[26px] py-[18px]">
      <div className="flex flex-col items-center gap-[2px]">
        <h2 className="text-center text-[18px] font-semibold text-gray-800">
          {currentMonth}월 식물 돌봄
          <span className="text-green-deep"> TOP3 </span>쿠킵이
=======
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="typo-l-strong text-gray-80 flex-1">
          {currentMonth}월 식물 돌봄 TOP3 쿠킵이
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
        </h2>
      </div>

      {isRankingEmpty ? (
        /* Empty State */
        <div className="bg-gray-0 rounded-L flex items-center justify-center gap-6 p-4">
          <img
            src={thinkingChar}
            alt="thinking"
            className="h-[79px] w-[82.999px] shrink-0"
          />

          <div className="typo-m-strong text-gray-30 text-center">
            쿠킵이들의 식물 살펴보는 중..
            <br />
            순위가 곧 공개돼요
          </div>
        </div>
      ) : (
        /* 랭킹 카드 (2위 - 1위 - 3위 순 배치) */
        <div className="relative flex items-center gap-2">
          {order.map(idx => {
            const user = filledUsers[idx];
            const isFirst = user.rank === 1;

            return (
              <RankingCard
                key={`${user.rank}-${idx}`}
                rank={user.rank}
                name={user.nickname || "쿠킵이"}
                plantImage={user.profileImageUrl}
                score={user.wateringCount}
                isFirst={isFirst}
              />
            );
          })}
        </div>
      )}

      <div className="bg-green-exception rounded-M flex items-center justify-center gap-1 py-1">
        <img
          src={seedlingPot}
          alt="seedling pot"
          className="aspect-square h-[20px] w-[20px] shrink-0"
        />

        <span className="typo-m text-gray-80 line-clamp-1">
          이번 달에 나는 총
        </span>

        <div className="flex items-center gap-[2px]">
          <img
            src={plantChar}
            alt="plant character"
            className="h-[17.048px] w-[16.272px] shrink-0"
          />
          <span className="typo-m-strong text-green-deep line-clamp-1">
            {myCount}회
          </span>
        </div>

        <span className="typo-m text-gray-80 line-clamp-1">주었어요!</span>
      </div>
    </div>
  );
}

export default memo(WeeklyTop3Section);
