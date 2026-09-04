import { useEffect, useState } from "react";

import { ConsumptionReport, getConsumptionReport } from "@/api/stats";

import CarIcon from "@/assets/mycookeep/car.svg?react";
import CloudIcon from "@/assets/mycookeep/cloud.svg?react";
import ElecIcon from "@/assets/mycookeep/elec.svg?react";
import TreeIcon from "@/assets/mycookeep/tree.svg?react";

export default function Statistics() {
  const [report, setReport] = useState<ConsumptionReport | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getConsumptionReport();
        setReport(data);
      } catch (error) {
        console.error("리포트 데이터 로드 실패:", error);
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

  return (
<<<<<<< HEAD
    <div className="bg-gray-0 relative flex h-[354px] w-full flex-col items-center overflow-hidden py-6">
      <div
        className={`flex w-full flex-col items-center transition-transform duration-500 ease-in-out ${
          isExpanded ? "-translate-y-[230px]" : "translate-y-0"
        }`}
      >
        <div className="flex h-[307px] w-full shrink-0 flex-col items-center">
          <div className="typo-caption text-gray-0 rounded-L mt-5 flex h-[26px] w-[157px] flex-col justify-center bg-black text-center">
            나의 식재료 소비 달성 현황
          </div>
=======
    <div className="relative flex w-full flex-col items-center gap-2">
      <h1 className="text-gray-80 typo-l-strong w-full px-1 text-left">
        이번 달 식재료 소비 현황
      </h1>
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b

      <section className="bg-gray-0 rounded-L border-gray-10 flex w-full gap-3 border px-3 py-4">
        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="typo-h1 text-green">{stats.totalRate.toFixed(0)}%</p>
          <span className="typo-caption text-gray-50">전체 식재료 소비율</span>
        </div>

        <div className="bg-gray-10 h-[62px] w-[1px]" />

        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="typo-h1 text-green">
            {stats.nearExpiryRate.toFixed(0)}%
          </p>
          <span className="typo-caption text-gray-50">임박 식재료 소비율</span>
        </div>
      </section>

      <section className="bg-gray-0 rounded-L border-gray-10 flex w-full flex-col gap-3 border px-3 py-4">
        <div className="flex gap-3">
          <CloudIcon className="h-10 w-10" />
          <p className="typo-m text-gray-80">
            유통기한 임박 식재료 3개를 요리하면
            <br />
            <span className="text-green-deep typo-m-strong">0.8kg</span>의 CO₂
            배출을 줄일 수 있어요
          </p>
        </div>

<<<<<<< HEAD
        {/* [영역 2]: 올라오면서 보여질 상세 화면 (애니메이션 컨테이너 '내부'로 이동) */}
        <div className="flex w-full shrink-0 flex-col items-center px-4 pt-5">
          <div className="mb-6 flex justify-center gap-2">
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={treeIcon}
                alt="tree"
                className="h-20 w-20 object-contain"
              />
              <div className="bg-green-light text-green-deep rounded-full px-3 py-1 text-[10px] font-medium whitespace-nowrap">
                나무 0.03그루 심기
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={carIcon}
                alt="car"
                className="h-20 w-20 object-contain"
              />
              <div className="bg-green-light text-green-deep rounded-full px-3 py-1 text-[10px] font-medium whitespace-nowrap">
                자동차 4km 미주행
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={elecIcon}
                alt="elec"
                className="h-20 w-20 object-contain"
              />
              <div className="bg-green-light text-green-deep rounded-full px-3 py-1 text-[10px] font-medium whitespace-nowrap">
                자동차 4km 미주행
              </div>
=======
        <div className="bg-gray-10 h-[1px] w-full" />

        <h2 className="typo-m-strong text-gray-80 w-full px-1 text-left">
          생활 속 효과로 알아보기
        </h2>

        <div className="flex w-full items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <figure className="bg-green-light flex h-[70px] w-[70px] items-center justify-center rounded-full">
              <TreeIcon className="h-[50px] w-[50px]" />
            </figure>

            <div className="typo-label flex flex-col items-center">
              <p className="text-green-deep">0.03그루</p>
              <p className="text-gray-50">나무 심기</p>
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <figure className="bg-green-light flex h-[70px] w-[70px] items-center justify-center rounded-full">
              <CarIcon className="h-[50px] w-[50px]" />
            </figure>

            <div className="typo-label flex flex-col items-center">
              <p className="text-green-deep">4km</p>
              <p className="text-gray-50">자동차 미주행</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <figure className="bg-green-light flex h-[70px] w-[70px] items-center justify-center rounded-full">
              <ElecIcon className="h-[50px] w-[50px]" />
            </figure>

            <div className="typo-label flex flex-col items-center">
              <p className="text-green-deep">약 2시간</p>
              <p className="text-gray-50">전기 절약</p>
            </div>
          </div>
        </div>

        <span className="typo-caption text-center text-gray-50">
          국제 평균 식품 폐기물 탄소 배출 계수 기준 추정치
        </span>
      </section>
    </div>
  );
}
