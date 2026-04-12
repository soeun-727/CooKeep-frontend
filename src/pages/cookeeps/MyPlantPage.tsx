import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import { PLANT_DATA } from "../../constants/plantData";

export default function MyPlantPage() {
  const navigate = useNavigate();
  // const grownPlants = tempGrownPlants; // 임시 데이터 사용
  const myPlants = useCookeepsStore((s) => s.myPlants);

  const grownPlants = myPlants.filter((p) => p.isHarvested);
  const plantImageMap = Object.fromEntries(
    PLANT_DATA.map((p) => [p.text, p.img]),
  );

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] pt-[110px]">
      <BackHeader title="내가 키운 식재료" onBack={() => navigate(-1)} />

      {grownPlants.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">
          아직 다 키운 식물이 없어요
        </p> // 그냥 임의로 넣어보았는데 괜찮을지....
      ) : (
        <>
          {/* 3열 그리드 */}
          <div className="grid grid-cols-3 gap-x-[12px] gap-y-[8px] justify-items-center w-[294px] mx-auto">
            {grownPlants.map((plant) => (
              <div
                key={plant.userPlantId}
                className="flex flex-col items-center justify-center w-[90px] p-[12.504px_16px_13.496px_16px] rounded-[6px] border border-[#D1D1D1] bg-white"
              >
                <div className="flex flex-col items-center gap-[4px] w-[58px]">
                  <img
                    src={plantImageMap[plant.plantName]}
                    alt={plant.plantName}
                    className="w-[48px] h-[48px]"
                    loading="lazy"
                  />
                  <span
                    className="text-[12px] font-bold leading-[16px] text-center text-[#202020] overflow-hidden"
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
          <div className="mt-[32px] flex justify-center items-center h-[32px] w-[137px] mx-auto rounded-[6px] bg-[#C3C3C3]">
            <span className="text-[12px] font-normal leading-[16px] text-white text-center">
              키우기를 끝낸 식재료예요
            </span>
          </div>
        </>
      )}
    </div>
  );
}
