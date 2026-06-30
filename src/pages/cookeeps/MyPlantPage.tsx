import { useNavigate } from "react-router-dom";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import BackHeader from "@/components/ui/BackHeader";

import { PLANT_DATA } from "@/constants/plantData";

export default function MyPlantPage() {
  const navigate = useNavigate();
  // const grownPlants = tempGrownPlants; // 임시 데이터 사용
  const myPlants = useCookeepsStore(s => s.myPlants);

  const grownPlants = myPlants.filter(p => p.isHarvested);
  const plantImageMap = Object.fromEntries(
    PLANT_DATA.map(p => [p.text, p.img]),
  );

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] pt-[110px]">
      <BackHeader title="내가 키운 식재료" onBack={() => navigate(-1)} />

      {grownPlants.length === 0 ? (
        <p className="mt-20 text-center text-gray-400">
          아직 다 키운 식물이 없어요
        </p> // 그냥 임의로 넣어보았는데 괜찮을지....
      ) : (
        <>
          {/* 3열 그리드 */}
          <div className="mx-auto grid w-[294px] grid-cols-3 justify-items-center gap-x-[12px] gap-y-[8px]">
            {grownPlants.map(plant => (
              <div
                key={plant.userPlantId}
                className="flex w-[90px] flex-col items-center justify-center rounded-[6px] border border-[#D1D1D1] bg-white p-[12.504px_16px_13.496px_16px]"
              >
                <div className="flex w-[58px] flex-col items-center gap-[4px]">
                  <img
                    src={plantImageMap[plant.plantName]}
                    alt={plant.plantName}
                    className="h-[48px] w-[48px]"
                    loading="lazy"
                  />
                  <span
                    className="overflow-hidden text-center text-[12px] leading-[16px] font-bold text-[#202020]"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {plant.plantName}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 카드와 하단 안내 간격 32px */}
          <div className="mx-auto mt-[32px] flex h-[32px] w-[137px] items-center justify-center rounded-[6px] bg-[#C3C3C3]">
            <span className="text-center text-[12px] leading-[16px] font-normal text-white">
              키우기를 끝낸 식재료예요
            </span>
          </div>
        </>
      )}
    </div>
  );
}
