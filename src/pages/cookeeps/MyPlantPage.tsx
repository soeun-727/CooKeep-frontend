import { useNavigate } from "react-router-dom";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { BackHeader } from "@/components/ui/BackHeader";

import { PLANT_DATA } from "@/constants/plantData";

export default function MyPlantPage() {
  const navigate = useNavigate();

  const myPlants = useCookeepsStore(s => s.myPlants);

  const grownPlants = myPlants.filter(p => p.isHarvested);
  const plantImageMap = Object.fromEntries(
    PLANT_DATA.map(p => [p.text, p.img]),
  );

  return (
    <div className="bg-background relative min-h-screen pt-[110px]">
      <BackHeader title="내가 키운 식재료" onBack={() => navigate(-1)} />

      {grownPlants.length === 0 ? (
        <p className="mt-20 text-center text-gray-400">
          아직 다 키운 식물이 없어요
        </p>
      ) : (
        <>
          {/* 3열 그리드 */}
          <div className="mx-auto grid w-[294px] grid-cols-3 justify-items-center gap-x-[12px] gap-y-[8px]">
            {grownPlants.map(plant => (
              <div
                key={plant.userPlantId}
                className="border-gray-10 bg-gray-0 flex w-[90px] flex-col items-center justify-center rounded-[6px] border p-[12.504px_16px_13.496px_16px]"
              >
                <div className="flex w-[58px] flex-col items-center gap-[4px]">
                  <img
                    src={plantImageMap[plant.plantName]}
                    alt={plant.plantName}
                    className="h-[48px] w-[48px]"
                    loading="lazy"
                  />
                  <span
                    className="text-gray-80 overflow-hidden text-center text-[12px] leading-[16px] font-bold"
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
          <div className="bg-gray-30 mx-auto mt-[32px] flex h-[32px] w-[137px] items-center justify-center rounded-[6px]">
            <span className="text-gray-0 text-center text-[12px] leading-[16px] font-normal">
              키우기를 끝낸 식재료예요
            </span>
          </div>
        </>
      )}
    </div>
  );
}
