import { useCallback, useEffect, useState } from "react";

import { RankingResponse, getWeeklyRanking } from "@/api/cookeeps";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useLoadingStore } from "@/stores/useLoadingStore";

import { AppBar } from "@/components/ui/AppHeader";
import PlantBackground from "@/components/cookeeps/plant/PlantBackground";
import PlantGrowthCard from "@/components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "@/components/cookeeps/ranking/WeeklyTop3Section";
import WeeklyRecipeSection from "@/components/cookeeps/recipe/WeeklyRecipeSection";
import RecipeFilterButtons from "@/components/cookeeps/recipe/RecipeFilterButtons";

import { PLANT_DATA } from "@/constants/plantData";
import { preloadImage } from "@/utils/preloadImage";

import { useCookeepsModals } from "@/hooks/useCookeepsModals";
import BalloonTip from "@/assets/cookeeps/balloon_tip.svg?react";
import { CookeepsModalManager } from "@/components/cookeeps/modals/CookeepsModalManager";

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [ranking, setRanking] = useState<RankingResponse>({
    myWateringCount: 0,
    wateringRanking: [],
    recipeRanking: [],
  });

  const cookie = useCookeepsStore(s => s.cookie);
  const isFreeWaterMode = useCookeepsStore(s => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore(s => s.isPlantLoading);
  const setLoading = useLoadingStore(s => s.setLoading);

  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const modals = useCookeepsModals(currentPlant);

  const fetchRankingData = useCallback(async () => {
    try {
      const rankingData = await getWeeklyRanking();
      setRanking(rankingData);
    } catch (error) {
      console.error("랭킹 데이터 로드 실패:", error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    const { fetchGrowingPlant, fetchCookies, fetchMyPlants } =
      useCookeepsStore.getState();
    setLoading(true);
    try {
      const [, , , rankingData] = await Promise.all([
        fetchGrowingPlant(),
        fetchCookies(),
        fetchMyPlants(),
        getWeeklyRanking(),
      ]);

      setRanking(rankingData);

      const store = useCookeepsStore.getState();
      const plantName = store.currentPlant?.plantName;

      if (plantName) {
        const plantData = PLANT_DATA.find(p => p.text === plantName);
        if (plantData?.img) {
          await preloadImage(plantData.img);
        }
      }
    } catch (e) {
      console.error("데이터 로드 실패:", e);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const [showFreeWaterTooltip, setShowFreeWaterTooltip] = useState(false);

  useEffect(() => {
    if (!isFreeWaterMode) return;

    setShowFreeWaterTooltip(true);
    const timer = setTimeout(() => setShowFreeWaterTooltip(false), 5000);

    return () => clearTimeout(timer);
  }, [isFreeWaterMode]);

  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
    fetchRankingData();
  };

  const overridePlantStage = modals.showHarvestModal
    ? 4
    : modals.activeModal === "wilted"
      ? 1
      : undefined;

  return (
    <div className="relative flex flex-1 flex-col gap-3">
      <CookeepsModalManager {...modals} currentPlant={currentPlant} />

      <header className="px-4">
        <AppBar cookieCount={cookie} />
      </header>

      <main className="flex w-full flex-col gap-6">
        <div className="relative z-60 flex w-full flex-col items-center gap-2">
          {/* 식물 카드 (PlantBackground + PlantGrowthCard) */}
          <section className="bg-background flex w-full flex-col items-center self-stretch overflow-hidden rounded-2xl">
            <PlantBackground
              showToast={toastVisible}
              message="물 주기에 성공했어요!"
              plant={currentPlant?.plantName}
              isLoading={isPlantLoading}
              overridePlantStage={overridePlantStage}
            />
            <PlantGrowthCard
              plant={currentPlant?.plantName}
              onWaterSuccess={handleWaterSuccess}
              onRefresh={fetchRankingData}
              overridePlantStage={overridePlantStage}
            />
          </section>

          {/* 물주기 안내 툴팁 */}
          {isFreeWaterMode && showFreeWaterTooltip && (
            <div
              className="flex w-[232px] flex-col items-center backdrop-blur-[1px]"
              style={{ filter: "drop-shadow-container" }}
            >
              <BalloonTip className="block h-[9px] w-[11px] text-white/90" />
              <div className="flex items-center justify-center rounded-[8px] bg-white/90 px-3 py-2">
                <p className="typo-caption text-gray-80 text-center">
                  버튼을 클릭하여 식물에게 물을 줄 수 있어요!
                </p>
              </div>
            </div>
          )}
        </div>

        <section className="flex flex-col gap-6 px-4 pb-15">
          <WeeklyTop3Section
            users={ranking?.wateringRanking ?? []}
            myCount={ranking?.myWateringCount ?? 0}
          />
          {/* 중간 좋아요 / 북마크 필터 영역 */}
          <RecipeFilterButtons />

          {/* 주간 레시피 섹션 (내부에 전체보기 포함) */}
          <WeeklyRecipeSection topRecipes={ranking?.recipeRanking ?? []} />
        </section>
      </main>

      {isFreeWaterMode && (
        <div className="absolute inset-0 z-55">
          <div className="bg-gray-80/50 absolute inset-0" />
        </div>
      )}
    </div>
  );
}
