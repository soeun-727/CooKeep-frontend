import OnboardingModal from "./OnboardingModal";
import PlantSelectModal from "./PlantSelectModal";
import SelectedModal from "./SelectedModal";
import FreeWaterModal from "./FreeWaterModal";
import WiltingModal from "./WiltingModal";
import WiltedModal from "./WiltedModal";
import HarvestModal from "./HarvestModal";
import { useCookeepsModals } from "@/hooks/useCookeepsModals";
import type { MyPlant } from "@/types/myPlant";
import WiltedNoCookieModal from "./WiltedNoCookieModal";

type CookeepsModalManagerProps = ReturnType<typeof useCookeepsModals> & {
  currentPlant: MyPlant | null; // 페이지에서 내려받는 값
};

export function CookeepsModalManager(props: CookeepsModalManagerProps) {
  const {
    derivedModal,
    activeModal,
    setActiveModal,
    selectedPlantData,
    showHarvestModal,
    rewardPoints,
    hideWiltingModal,
    setHideWiltingModal,
    status,
    currentPlant,
    harvestedPlantNames,
    handleOnboardingConfirm,
    handleSelectConfirm,
    handleFinalStart,
    handleHarvestModalClose,
    handleAbandon,
    handleRecover,
    canRecover,
    isActionLoading,
    setFreeWaterMode,
  } = props;

  return (
    <>
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

      {status === "wilted" && canRecover && (
        <WiltedModal
          isOpen={status === "wilted"}
          plant={currentPlant?.plantName ?? ""}
          isLoading={isActionLoading}
          onClose={() => setActiveModal(null)}
          onRecover={handleRecover}
          onAbandon={handleAbandon}
        />
      )}

      {status === "wilted" && !canRecover && (
        <WiltedNoCookieModal
          isOpen={true}
          plant={currentPlant?.plantName ?? ""}
          isLoading={isActionLoading}
          onClose={() => setActiveModal(null)}
          onAbandon={handleAbandon}
        />
      )}

      <HarvestModal
        isOpen={showHarvestModal}
        onClose={handleHarvestModalClose}
        rewardPoints={rewardPoints}
      />
    </>
  );
}
