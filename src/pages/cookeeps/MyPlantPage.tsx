import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { BackHeader } from "@/components/ui/BackHeader";

import { PLANT_DATA } from "@/constants/plantData";

export default function MyPlantPage() {
  const myPlants = useCookeepsStore(s => s.myPlants);

  const grownPlants = myPlants.filter(p => p.isHarvested);
  const plantImageMap = Object.fromEntries(
    PLANT_DATA.map(p => [p.text, p.img]),
  );

  return (
    <div className="relative flex min-h-screen flex-col gap-[30px] px-4">
      <BackHeader title="내가 키운 식재료" />

      {/* 전체 컨테이너 */}
      <div className="mx-auto flex w-full max-w-[375px] flex-col items-start">
        {grownPlants.length === 0 ? (
          <p className="typo-m mt-20 w-full text-center text-gray-50">
            아직 다 키운 식물이 없어요
          </p>
        ) : (
          /* 내용 영역 */
          <div className="flex flex-col items-start gap-6 self-stretch">
            {/* 3열 그리드 */}
            <div className="grid grid-cols-3 gap-2 self-stretch">
              {grownPlants.map(plant => (
                <div
                  key={plant.userPlantId}
                  className="rounded-L border-gray-10 bg-gray-0 flex flex-col items-center justify-center gap-1 self-stretch justify-self-stretch border p-2"
                >
                  <img
                    src={plantImageMap[plant.plantName]}
                    alt={plant.plantName}
                    className="aspect-square h-[48px] w-[48px]"
                    loading="lazy"
                  />
                  <span className="typo-label text-gray-80 line-clamp-1 w-full overflow-hidden text-center text-ellipsis">
                    {plant.plantName}
                  </span>
                </div>
              ))}
            </div>

            {/* 하단 글자 */}
            <p className="typo-caption self-stretch text-center text-gray-50">
              키우기를 끝낸 식재료예요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
