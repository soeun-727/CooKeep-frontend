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
    <div className="relative flex w-full flex-col items-center gap-2">
      <h1 className="text-gray-80 typo-l-strong w-full px-1 text-left">
        나의 식재료 소비 달성 현황
      </h1>

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
            <span className="text-green typo-m-strong">0.8kg</span>의 CO₂ 배출을
            줄일 수 있어요
          </p>
        </div>

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
              <p className="text-green">0.03그루</p>
              <p className="text-gray-50">나무 심기</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <figure className="bg-green-light flex h-[70px] w-[70px] items-center justify-center rounded-full">
              <CarIcon className="h-[50px] w-[50px]" />
            </figure>

            <div className="typo-label flex flex-col items-center">
              <p className="text-green">4km</p>
              <p className="text-gray-50">자동차 미주행</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <figure className="bg-green-light flex h-[70px] w-[70px] items-center justify-center rounded-full">
              <ElecIcon className="h-[50px] w-[50px]" />
            </figure>

            <div className="typo-label flex flex-col items-center">
              <p className="text-green">약 2시간</p>
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
