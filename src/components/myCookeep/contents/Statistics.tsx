import { useEffect, useState } from "react";

import { ConsumptionReport, getConsumptionReport } from "@/api/stats";

import { carIcon, elecIcon, treeIcon, triButton } from "@/assets/index";

import CircleGraph from "./CircleGraph";

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
      <div className="flex h-[354px] items-center justify-center">
        데이터 로딩 중...
      </div>
    );

  return (
    <div className="relative flex h-[354px] w-full flex-col items-center overflow-hidden bg-white py-6">
      <div
        className={`flex w-full flex-col items-center transition-transform duration-500 ease-in-out ${
          isExpanded ? "-translate-y-[230px]" : "translate-y-0"
        }`}
      >
        <div className="flex h-[307px] w-full shrink-0 flex-col items-center">
          <div className="typo-caption mt-5 flex h-[26px] w-[157px] flex-col justify-center rounded-[6px] bg-black text-center text-white">
            나의 식재료 소비 달성 현황
          </div>

          <div className="mt-6 flex w-77 justify-between pt-[6.5px]">
            <div className="flex w-1/2 flex-col items-center justify-center gap-[6.5px]">
              <CircleGraph percentage={stats.totalRate} />
              <span className="typo-caption text-center !text-[10px] leading-tight text-zinc-500">
                (실제 소비 음식/전체 음식) %
              </span>
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center gap-[6.5px]">
              <CircleGraph percentage={stats.nearExpiryRate} />
              <span className="typo-caption text-center !text-[10px] leading-tight text-zinc-500">
                (실제 소비 음식/폐기 임박 음식) %
              </span>
            </div>
          </div>

          <div className="typo-body2 mt-[31px] text-center">
            유통기한 임박 식재료 3개를 요리하면
            <br />
            <span className="font-bold text-(--color-green)">0.8kg</span>의 CO₂
            배출을 줄일 수 있어요
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex h-[29px] w-[62px] flex-col items-center justify-start focus:outline-none"
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
        <div className="flex w-full shrink-0 flex-col items-center px-4 pt-5">
          <div className="mb-6 flex justify-center gap-2">
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={treeIcon}
                alt="tree"
                className="h-20 w-20 object-contain"
              />
              <div className="rounded-[100px] bg-[#E6FBEB] px-3 py-1 text-[10px] font-medium whitespace-nowrap text-[#1DAD64]">
                나무 0.03그루 심기
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={carIcon}
                alt="car"
                className="h-20 w-20 object-contain"
              />
              <div className="rounded-[100px] bg-[#E6FBEB] px-3 py-1 text-[10px] font-medium whitespace-nowrap text-[#1DAD64]">
                자동차 4km 미주행
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={elecIcon}
                alt="elec"
                className="h-20 w-20 object-contain"
              />
              <div className="rounded-[100px] bg-[#E6FBEB] px-3 py-1 text-[10px] font-medium whitespace-nowrap text-[#1DAD64]">
                자동차 4km 미주행
              </div>
            </div>
          </div>

          <span className="typo-caption text-center text-[10px] text-zinc-400">
            국제 평균 식품 폐기물 탄소 배출 계수 기준 추정치
          </span>
        </div>
      </div>
    </div>
  );
}
