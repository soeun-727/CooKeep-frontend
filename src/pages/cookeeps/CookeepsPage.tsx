import { useCallback, useEffect, useState } from "react";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantGrowthCard from "../../components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "../../components/cookeeps/ranking/WeeklyTop3Section";
import WeeklyRecipeSection from "../../components/cookeeps/recipe/WeeklyRecipeSection";
import OnboardingModal from "../../components/cookeeps/modals/OnboardingModal";
import PlantSelectModal from "../../components/cookeeps/modals/PlantSelectModal";
import { PLANT_DATA } from "../../constants/plantData";
import SelectedModal from "../../components/cookeeps/modals/SelectedModal";
import WiltingModal from "../../components/cookeeps/modals/WiltingModal";
import WiltedModal from "../../components/cookeeps/modals/WiltedModal";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import FreeWaterModal from "../../components/cookeeps/modals/FreeWaterModal";
import HarvestModal from "../../components/cookeeps/modals/HarvestModal";
import { useLoadingStore } from "../../stores/useLoadingStore";
import { preloadImage } from "../../utils/preloadImage";
import {
  getOnboardingStatus,
  getWeeklyRanking,
  RankingResponse,
  updateOnboardingStatus,
} from "../../api/cookeeps";

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
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [isCheckLoading, setIsCheckLoading] = useState(true);
  const [selectedPlantData, setSelectedPlantData] =
    useState<SelectedPlant | null>(null);
  const [ranking, setRanking] = useState<RankingResponse>({
    myWateringCount: 0,
    wateringRanking: [],
    recipeRanking: [],
  });

  const status = useCookeepsStore((s) => s.status);
  const abandonPlant = useCookeepsStore((s) => s.abandonPlant);
  const recoverPlant = useCookeepsStore((s) => s.recoverPlant);
  const setFreeWaterMode = useCookeepsStore((s) => s.setFreeWaterMode);
  const isFreeWaterMode = useCookeepsStore((s) => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore((s) => s.isPlantLoading);
  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const hasShownHarvestModal = useCookeepsStore((s) => s.hasShownHarvestModal);
  const harvestedPlantNames = useCookeepsStore((s) => s.harvestedPlantNames);
  const justHarvestedPlant = useCookeepsStore((s) => s.justHarvestedPlant);
  const registerPlant = useCookeepsStore((s) => s.registerPlant);
  const setLoading = useLoadingStore((s) => s.setLoading);

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
        const plantData = PLANT_DATA.find((p) => p.text === plantName);
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
          setIsOnboarded(res.data.data.isCookeepsOnboarded);
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

  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();
    store.setHasShownHarvestModal(true);
    store.setJustHarvestedPlant(null);
    store.resetCurrentPlant();
    await store.fetchMyPlants();
    setShowHarvestModal(false);
    setActiveModal("select");
  };

  const derivedModal = ((): ActiveModal => {
    if (showHarvestModal || isCheckLoading) return null;
    if (!isOnboarded && !currentPlant && !isPlantLoading) return "onboarding";
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
    const plant = PLANT_DATA.find((p) => p.id === id);
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

      const plantData = PLANT_DATA.find((p) => p.text === current.plantName);
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
    <div className="flex-1 flex flex-col min-h-0 relative no-scrollbar">
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
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setHideWiltingModal(true)}
      />

      <WiltedModal
        isOpen={status === "wilted"}
        plant={selectedPlantData?.text ?? ""}
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
      />

      <div className="relative shrink-0 -mt-[35px]">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
          plant={currentPlant?.plantName}
          isLoading={isPlantLoading}
          overridePlantStage={
            showHarvestModal ? 4 : activeModal === "wilted" ? 1 : undefined
          }
        />
        <CookeepsHeader />
      </div>

      <div className="px-4 shrink-0 relative z-50">
        <PlantGrowthCard
          plant={currentPlant?.plantName}
          onWaterSuccess={handleWaterSuccess}
          onRefresh={fetchRankingData}
          overridePlantStage={
            showHarvestModal ? 4 : activeModal === "wilted" ? 1 : undefined
          }
        />
      </div>

      {isFreeWaterMode && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pt-5 pb-12">
        <WeeklyTop3Section
          users={ranking?.wateringRanking ?? []}
          myCount={ranking?.myWateringCount ?? 0}
        />
        <WeeklyRecipeSection topRecipes={ranking?.recipeRanking ?? []} />
      </div>
    </div>
  );
}
