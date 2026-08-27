import { useCallback, useEffect, useState } from "react";

import {
  RankingResponse,
  getOnboardingStatus,
  getWeeklyRanking,
  updateOnboardingStatus,
} from "@/api/cookeeps";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { useLoadingStore } from "@/stores/useLoadingStore";

import { AppBar } from "@/components/ui/AppHeader";
import FreeWaterModal from "@/components/cookeeps/modals/FreeWaterModal";
import HarvestModal from "@/components/cookeeps/modals/HarvestModal";
import OnboardingModal from "@/components/cookeeps/modals/OnboardingModal";
import PlantSelectModal from "@/components/cookeeps/modals/PlantSelectModal";
import SelectedModal from "@/components/cookeeps/modals/SelectedModal";
import WiltedModal from "@/components/cookeeps/modals/WiltedModal";
import WiltingModal from "@/components/cookeeps/modals/WiltingModal";
import PlantBackground from "@/components/cookeeps/plant/PlantBackground";
import PlantGrowthCard from "@/components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "@/components/cookeeps/ranking/WeeklyTop3Section";
import WeeklyRecipeSection from "@/components/cookeeps/recipe/WeeklyRecipeSection";

import { PLANT_DATA } from "@/constants/plantData";

import { preloadImage } from "@/utils/preloadImage";
import RecipeFilterButtons from "@/components/cookeeps/recipe/RecipeFilterButtons";
import BalloonTip from "@/assets/cookeeps/balloon_tip.svg?react";

type ActiveModal =
  | "onboarding"
  | "select"
  | "selected"
  | "wilting"
  | "wilted"
  | "free"
  | "harvest"
  | null;

interface SelectedPlant {
  id: number;
  text: string;
  img: string;
  description: string;
  isHarvested?: boolean;
}

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isCheckLoading, setIsCheckLoading] = useState(true);
  const [selectedPlantData, setSelectedPlantData] =
    useState<SelectedPlant | null>(null);
  const [ranking, setRanking] = useState<RankingResponse>({
    myWateringCount: 0,
    wateringRanking: [],
    recipeRanking: [],
  });

  const cookie = useCookeepsStore(s => s.cookie);
  const status = useCookeepsStore(s => s.status);
  const abandonPlant = useCookeepsStore(s => s.abandonPlant);
  const recoverPlant = useCookeepsStore(s => s.recoverPlant);
  const setFreeWaterMode = useCookeepsStore(s => s.setFreeWaterMode);
  const isFreeWaterMode = useCookeepsStore(s => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore(s => s.isPlantLoading);
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const hasShownHarvestModal = useCookeepsStore(s => s.hasShownHarvestModal);
  const harvestedPlantNames = useCookeepsStore(s => s.harvestedPlantNames);
  const justHarvestedPlant = useCookeepsStore(s => s.justHarvestedPlant);
  const registerPlant = useCookeepsStore(s => s.registerPlant);
  const setLoading = useLoadingStore(s => s.setLoading);

  const [hideWiltingModal, setHideWiltingModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);

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
    const checkOnboardingStatus = async () => {
      try {
        const res = await getOnboardingStatus();
        if (res.data && res.data.data) {
          setIsOnboarded(res.data.data.cookeepsOnboarded);
        }
      } catch (error) {
        console.error("온보딩 상태 로드 실패:", error);
        setIsOnboarded(true);
      } finally {
        setIsCheckLoading(false);
      }
    };
    checkOnboardingStatus();
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (justHarvestedPlant && !hasShownHarvestModal) {
      setShowHarvestModal(true);
    }
  }, [justHarvestedPlant, hasShownHarvestModal]);

  const [showFreeWaterTooltip, setShowFreeWaterTooltip] = useState(false);

  useEffect(() => {
    if (!isFreeWaterMode) return;

    setShowFreeWaterTooltip(true);
    const timer = setTimeout(() => setShowFreeWaterTooltip(false), 5000);

    return () => clearTimeout(timer);
  }, [isFreeWaterMode]);

  const handleOnboardingConfirm = async () => {
    try {
      await updateOnboardingStatus();
      localStorage.setItem("hasSeenOnboarding", "true");
      setIsOnboarded(true);
      setActiveModal("select");
    } catch (error) {
      console.error("온보딩 상태 업데이트 실패:", error);
      setIsOnboarded(true);
      setActiveModal("select");
    }
  };

  const [rewardPoints, setRewardPoints] = useState<number | undefined>(
    undefined,
  );

  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();
    // 모달 닫히는 시점에 claim 호출 → 쿠키 +20
    const reward = await store.claimHarvestReward();
    if (reward) setRewardPoints(reward.points);
    store.setHasShownHarvestModal(true);
    store.setJustHarvestedPlant(null);
    store.resetCurrentPlant();
    await store.fetchMyPlants();
    setShowHarvestModal(false);
    setActiveModal("select");
  };

  const derivedModal = ((): ActiveModal => {
    if (showHarvestModal || isCheckLoading) return null;
    // 아직 API 안왔으면 아무것도 안띄움
    if (isOnboarded === null || isPlantLoading) return null;

    // 온보딩 안한 사람만
    if (!isOnboarded) return "onboarding";
    if (activeModal === "free") return "free";
    if (activeModal === "selected") return "selected";
    if (activeModal === "harvest") return "harvest";
    if (isPlantLoading) return null;
    if (!currentPlant) return "select";
    if (status === "wilting") return "wilting";
    if (status === "wilted") return "wilted";
    return null;
  })();

  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
    fetchRankingData();
  };

  const handleSelectConfirm = (id: number) => {
    const plant = PLANT_DATA.find(p => p.id === id);
    if (!plant) return;
    setHideWiltingModal(false);
    setSelectedPlantData(plant);
    setActiveModal("selected");
  };

  const handleFinalStart = async () => {
    if (!selectedPlantData) return;
    try {
      const res = await registerPlant(selectedPlantData.id);
      const store = useCookeepsStore.getState();
      const current = store.currentPlant;

      if (!current) {
        setActiveModal("select");
        return;
      }

      const plantData = PLANT_DATA.find(p => p.text === current.plantName);
      setSelectedPlantData({
        id: current.userPlantId,
        text: current.plantName,
        img: plantData?.img || "",
        description: plantData?.description || "",
        isHarvested: current.isHarvested,
      });

      if (res.data.message === "첫 식물 등록이 완료되었습니다.") {
        setActiveModal("free");
      } else {
        setActiveModal(null);
      }
    } catch (error) {
      console.error("식물 시작 실패:", error);
      setActiveModal("select");
    }
  };

  return (
    <div className="relative flex flex-1 flex-col gap-3">
      <OnboardingModal
        isOpen={derivedModal === "onboarding"}
        onClose={handleOnboardingConfirm}
      />

      <PlantSelectModal
        isOpen={derivedModal === "select"}
        onConfirm={handleSelectConfirm}
        harvestedPlantNames={harvestedPlantNames}
      />

      {selectedPlantData && (
        <SelectedModal
          isOpen={activeModal === "selected"}
          plant={selectedPlantData.text}
          image={selectedPlantData.img}
          description={selectedPlantData.description}
          onConfirm={handleFinalStart}
          onClose={() => setActiveModal("select")}
        />
      )}

      <FreeWaterModal
        isOpen={derivedModal === "free"}
        onConfirm={() => {
          setFreeWaterMode(true);
          setActiveModal(null);
        }}
        onClose={() => setActiveModal(null)}
      />

      <WiltingModal
        isOpen={status === "wilting" && !hideWiltingModal}
        plant={currentPlant?.plantName ?? ""}
        onClose={() => setHideWiltingModal(true)}
      />

      <WiltedModal
        isOpen={status === "wilted"}
        plant={currentPlant?.plantName ?? ""}
        onClose={() => setActiveModal(null)}
        onAbandon={async () => {
          try {
            await abandonPlant();
            setHideWiltingModal(false);
            setActiveModal("select");
          } catch {
            alert("식물 포기에 실패했습니다. 다시 시도해 주세요.");
          }
        }}
        onRecover={async () => {
          try {
            await recoverPlant();
            setHideWiltingModal(false);
            setActiveModal(null);
          } catch {
            alert("식물 회복에 실패했습니다. 다시 시도해 주세요.");
          }
        }}
      />

      <HarvestModal
        isOpen={showHarvestModal}
        onClose={handleHarvestModalClose}
        rewardPoints={rewardPoints}
      />

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
              overridePlantStage={
                showHarvestModal ? 4 : activeModal === "wilted" ? 1 : undefined
              }
            />
            <PlantGrowthCard
              plant={currentPlant?.plantName}
              onWaterSuccess={handleWaterSuccess}
              onRefresh={fetchRankingData}
              overridePlantStage={
                showHarvestModal ? 4 : activeModal === "wilted" ? 1 : undefined
              }
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
