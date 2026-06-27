import { memo } from "react";
import { WateringRankItem } from "@api/cookeeps";
import RankingCard from "./RankingCard";
import plantBefore from "@assets/cookeeps/plant/plant_before.svg";
import thinkingChar from "@assets/character/thinking_char.svg";
import { plantChar } from "@assets";

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
  const isRankingEmpty = users.length === 0;

  return (
    <div className="flex min-h-[202px] w-full flex-col items-center gap-[26px] rounded-[6px] bg-[#E6FBEB] py-[18px] shadow-md">
      <div className="flex flex-col items-center gap-[2px]">
        <h2 className="text-center text-[18px] font-semibold text-gray-800">
          {currentMonth}월 식물 돌봄
          <span className="text-[#1FC16F]"> TOP3 </span>쿠킵이
        </h2>
      </div>

      <div className="relative flex gap-[10px]">
        {order.map((idx) => {
          const user = filledUsers[idx];

          // 데이터가 3개 미만일 경우를 대비한 가드
          // if (!user) return <div key={`empty-${idx}`} className="w-[80px]" />;
          const isFirst = user.rank === 1;

          return (
            <RankingCard
              key={`${user.rank}-${idx}`}
              rank={user.rank}
              name={user.nickname || "쿠킵이"}
              plantImage={user.profileImageUrl}
              isFirst={isFirst}
              score={user.wateringCount}
            />
          );
        })}

        {isRankingEmpty && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[6px] bg-[#E6FBEBCC]">
            <div className="flex h-[143px] w-full max-w-[343px] items-center justify-center gap-[24px] px-[20px] py-[18px]">
              <img
                src={thinkingChar}
                alt="thinking"
                className="h-[79px] w-[83px] flex-shrink-0"
              />

              <div className="text-center text-[16px] leading-[24px] font-semibold text-[#202020]">
                쿠킵이들의 식물 살펴보는 중..
                <br />
                순위가 곧 공개돼요
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="typo-body2 -mt-[6px] flex gap-1 !font-semibold">
        <span>이번 달에 나는 총</span>
        <div className="flex gap-[2px]">
          <img src={plantChar} className="w-4.5" />
          <span className="text-(--color-green-deep)">{myCount}회</span>
        </div>
        <span>주었어요!</span>
      </div>
    </div>
  );
}

export default memo(WeeklyTop3Section);
