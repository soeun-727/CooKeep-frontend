import { useCookeepsModals } from "@/hooks/useCookeepsModals";

import type { MyPlant } from "@/types/myPlant";

import FreeWaterModal from "./FreeWaterModal";
import HarvestModal from "./HarvestModal";
import OnboardingModal from "./OnboardingModal";
import PlantSelectModal from "./PlantSelectModal";
import SelectedModal from "./SelectedModal";
import WiltedModal from "./WiltedModal";
import WiltedNoCookieModal from "./WiltedNoCookieModal";
import WiltingModal from "./WiltingModal";

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
          onClose={() => setActiveModal(null)}
          onAbandon={handleAbandon}
          onRecover={handleRecover}
        />
      )}

      {status === "wilted" && !canRecover && (
        <WiltedNoCookieModal
          isOpen={true}
          plant={currentPlant?.plantName ?? ""}
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
