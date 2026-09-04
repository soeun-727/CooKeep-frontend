import { useEffect, useState } from "react";
import { getOnboardingStatus, updateOnboardingStatus } from "@/api/cookeeps";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { PLANT_DATA } from "@/constants/plantData";
import { ActiveModal, SelectedPlant } from "@/types/cookeeps";
import type { MyPlant } from "@/types/myPlant";

export function useCookeepsModals(currentPlant: MyPlant | null) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isCheckLoading, setIsCheckLoading] = useState(true);
  const [selectedPlantData, setSelectedPlantData] =
    useState<SelectedPlant | null>(null);
  const [hideWiltingModal, setHideWiltingModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState<number | undefined>(
    undefined,
  );

  const status = useCookeepsStore(s => s.status);
  const isPlantLoading = useCookeepsStore(s => s.isPlantLoading);
  const hasShownHarvestModal = useCookeepsStore(s => s.hasShownHarvestModal);
  const justHarvestedPlant = useCookeepsStore(s => s.justHarvestedPlant);
  const harvestedPlantNames = useCookeepsStore(s => s.harvestedPlantNames);
  const registerPlant = useCookeepsStore(s => s.registerPlant);
  const abandonPlant = useCookeepsStore(s => s.abandonPlant);
  const recoverPlant = useCookeepsStore(s => s.recoverPlant);
  const setFreeWaterMode = useCookeepsStore(s => s.setFreeWaterMode);

  const cookie = useCookeepsStore(s => s.cookie);
  const RECOVER_COST = 5;

  const canRecover = cookie >= RECOVER_COST;

  // 온보딩 여부 체크 (기존 로직 그대로)
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
  }, []);

  // 수확 모달 트리거 (기존 로직 그대로)
  useEffect(() => {
    if (justHarvestedPlant && !hasShownHarvestModal) {
      setShowHarvestModal(true);
    }
  }, [justHarvestedPlant, hasShownHarvestModal]);

  const derivedModal: ActiveModal = (() => {
    if (showHarvestModal || isCheckLoading) return null;
    if (isOnboarded === null || isPlantLoading) return null;
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

  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();
    const reward = await store.claimHarvestReward();
    if (reward) setRewardPoints(reward.points);
    store.setHasShownHarvestModal(true);
    store.setJustHarvestedPlant(null);
    store.resetCurrentPlant();
    await store.fetchMyPlants();
    setShowHarvestModal(false);
    setActiveModal("select");
  };

  const handleAbandon = async () => {
    try {
      await abandonPlant();
      setHideWiltingModal(false);
      setActiveModal("select");
    } catch {
      alert("식물 포기에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleRecover = async () => {
    try {
      await recoverPlant();
      setHideWiltingModal(false);
      setActiveModal(null);
    } catch {
      alert("식물 회복에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    activeModal,
    setActiveModal,
    derivedModal,
    selectedPlantData,
    showHarvestModal,
    rewardPoints,
    hideWiltingModal,
    setHideWiltingModal,
    status,
    harvestedPlantNames,
    handleOnboardingConfirm,
    handleSelectConfirm,
    handleFinalStart,
    handleHarvestModalClose,
    handleAbandon,
    handleRecover,
    canRecover,
    setFreeWaterMode,
  };
}
