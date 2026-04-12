import { useEffect, useState } from "react";
import { carIcon, elecIcon, treeIcon, triButton } from "../../../assets";
import CircleGraph from "./CircleGraph";
import { ConsumptionReport, getConsumptionReport } from "../../../api/stats";

export default function Statistics() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [report, setReport] = useState<ConsumptionReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getConsumptionReport();
        setReport(data);
      } catch (error) {
        console.error("리포트 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, []);

  const stats = {
    totalRate: report?.consumptionRate || 0,
    nearExpiryRate: report?.nearExpiryConsumptionRate || 0,
    totalCount: report?.totalIngredientCount || 0,
    consumedCount: report?.consumedIngredientCount || 0,
    nearExpiryCount: report?.nearExpiryIngredientCount || 0,
    consumedNearExpiry: report?.consumedNearExpiryCount || 0,
  };

  if (isLoading)
    return (
      <div className="h-[354px] flex items-center justify-center">
        데이터 로딩 중...
      </div>
    );

  return (
    <div className="h-[354px] py-6 w-full flex flex-col items-center bg-white overflow-hidden relative">
      <div
        className={`flex flex-col items-center w-full transition-transform duration-500 ease-in-out ${
          isExpanded ? "-translate-y-[230px]" : "translate-y-0"
        }`}
      >
        <div className="flex flex-col items-center w-full h-[307px] shrink-0">
          <div className="flex flex-col typo-caption text-white bg-black rounded-[6px] w-[157px] h-[26px] text-center justify-center mt-5">
            나의 식재료 소비 달성 현황
          </div>

          <div className="flex w-77 mt-6 justify-between pt-[6.5px]">
            <div className="flex flex-col gap-[6.5px] w-1/2 items-center justify-center">
              <CircleGraph percentage={stats.totalRate} />
              <span className="typo-caption !text-[10px] text-zinc-500 text-center leading-tight">
                (실제 소비 음식/전체 음식) %
              </span>
            </div>
            <div className="flex flex-col gap-[6.5px] w-1/2 items-center justify-center">
              <CircleGraph percentage={stats.nearExpiryRate} />
              <span className="typo-caption !text-[10px] text-zinc-500 text-center leading-tight">
                (실제 소비 음식/폐기 임박 음식) %
              </span>
            </div>
          </div>

          <div className="mt-[31px] typo-body2 text-center">
            유통기한 임박 식재료 3개를 요리하면
            <br />
            <span className="text-(--color-green) font-bold">0.8kg</span>의 CO₂
            배출을 줄일 수 있어요
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col mt-2 w-[62px] h-[29px] items-center justify-start focus:outline-none"
          >
            <img
              src={triButton}
              className={`p-2 transition-transform duration-500 ease-in-out ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
              alt="expand button"
            />
          </button>
        </div>

        {/* [영역 2]: 올라오면서 보여질 상세 화면 (애니메이션 컨테이너 '내부'로 이동) */}
        <div className="flex flex-col items-center w-full px-4 pt-5 shrink-0">
          <div className="flex gap-2 justify-center mb-6">
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={treeIcon}
                alt="tree"
                className="w-20 h-20 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                나무 0.03그루 심기
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={carIcon}
                alt="car"
                className="w-20 h-20 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                자동차 4km 미주행
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={elecIcon}
                alt="elec"
                className="w-20 h-20 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                자동차 4km 미주행
              </div>
            </div>
          </div>

          <span className="typo-caption text-zinc-400 text-[10px] text-center">
            국제 평균 식품 폐기물 탄소 배출 계수 기준 추정치
          </span>
        </div>
      </div>
    </div>
  );
}
