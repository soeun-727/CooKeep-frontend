import { useCallback, useEffect, useState } from "react";

import {
  RecipeRankItem,
  WateringRankItem,
  getRecipeRanking,
  getWateringRanking,
} from "@/api/cookeeps";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useLoadingStore } from "@/stores/useLoadingStore";

import { CookeepsModalManager } from "@/components/cookeeps/modals/CookeepsModalManager";
import PlantBackground from "@/components/cookeeps/plant/PlantBackground";
import PlantGrowthCard from "@/components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "@/components/cookeeps/ranking/WeeklyTop3Section";
import RecipeFilterButtons from "@/components/cookeeps/recipe/RecipeFilterButtons";
import WeeklyRecipeSection from "@/components/cookeeps/recipe/WeeklyRecipeSection";
import { AppBar } from "@/components/ui/AppHeader";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

import { PLANT_DATA } from "@/constants/plantData";

import { useCookeepsModals } from "@/hooks/useCookeepsModals";

import { preloadImage } from "@/utils/preloadImage";

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [wateringRanking, setWateringRanking] = useState<WateringRankItem[]>(
    [],
  );
  const [myWateringCount, setMyWateringCount] = useState(0);
  const [recipeRanking, setRecipeRanking] = useState<RecipeRankItem[]>([]);

  const cookie = useCookeepsStore(s => s.cookie);
  const isFreeWaterMode = useCookeepsStore(s => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore(s => s.isPlantLoading);
  const setLoading = useLoadingStore(s => s.setLoading);

  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const modals = useCookeepsModals(currentPlant);

  const fetchWateringRanking = useCallback(async () => {
    try {
      const data = await getWateringRanking();
      setWateringRanking(data.wateringRanking);
      setMyWateringCount(data.myWateringCount);
    } catch (error) {
      console.error("물주기 랭킹 로드 실패:", error);
    }
  }, []);

  const fetchRecipeRanking = useCallback(async () => {
    try {
      const data = await getRecipeRanking();
      setRecipeRanking(data.recipeRanking);
    } catch (error) {
      console.error("레시피 랭킹 로드 실패:", error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    const { fetchGrowingPlant, fetchCookies, fetchMyPlants } =
      useCookeepsStore.getState();
    setLoading(true);
    try {
      await Promise.all([
        fetchGrowingPlant(),
        fetchCookies(),
        fetchMyPlants(),
        fetchWateringRanking(),
        fetchRecipeRanking(),
      ]);

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
  }, [setLoading, fetchWateringRanking, fetchRecipeRanking]);

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
    fetchWateringRanking();
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
          <section className="bg-background flex w-full flex-col items-center overflow-hidden rounded-2xl">
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
              onRefresh={fetchWateringRanking}
              overridePlantStage={overridePlantStage}
            />
          </section>

          {/* 물주기 안내 툴팁 */}
          {isFreeWaterMode && showFreeWaterTooltip && (
            <div className="backdrop-blur-[1px]">
              <SpeechBubble
                text="버튼을 클릭하여 식물에게 물을 줄 수 있어요!"
                textStyle="typo-caption text-gray-80 text-center"
                trianglePosition="top"
                bgClassName="bg-white/90"
                paddingClassName="px-3 py-2"
              />
            </div>
          )}
        </div>

        <section className="flex flex-col gap-6 px-4 pb-15">
          <WeeklyTop3Section
            users={wateringRanking}
            myCount={myWateringCount}
          />
          {/* 중간 좋아요 / 북마크 필터 영역 */}
          <RecipeFilterButtons />

          {/* 주간 레시피 섹션 (내부에 전체보기 포함) */}
          <WeeklyRecipeSection topRecipes={recipeRanking} />
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
