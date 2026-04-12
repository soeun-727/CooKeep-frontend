import api from "./axios";

export interface ConsumptionReport {
  totalIngredientCount: number;
  consumedIngredientCount: number;
  consumptionRate: number; // 전체 식재료 소비율 (%)
  nearExpiryIngredientCount: number;
  consumedNearExpiryCount: number;
  nearExpiryConsumptionRate: number; // 임박 식재료 소비율 (%)
}

/** [GET] 이번 주 식재료 소비 리포트 조회 */
export const getConsumptionReport = async () => {
  const res = await api.get<{ data: ConsumptionReport }>(
    "/api/my-cookeep/consumption-report",
  );
  return res.data.data;
};
