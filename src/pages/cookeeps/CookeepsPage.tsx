// CookeepsPage.tsx
import { useEffect, useState } from "react";
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
// import { startLoading, stopLoading } from "../../utils/loading";
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
  isHarvested?: boolean; // optional로 두면 TS 오류 없음
}

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isOnboarded, setIsOnboarded] = useState(true); // 기본값 true (방어적 설정)
  const [isCheckLoading, setIsCheckLoading] = useState(true); // 서버 확인 전까지 로딩 상태

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const res = await getOnboardingStatus();
        if (res.data && res.data.data) {
          // 서버 응답이 false이면 모달을 띄우게 됨
          setIsOnboarded(res.data.data.isCookeepsOnboarded);
        }
      } catch (error) {
        console.error("온보딩 상태 로드 실패:", error);
        setIsOnboarded(true); // 에러 시 사용자 방해 방지
      } finally {
        setIsCheckLoading(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  const handleOnboardingConfirm = async () => {
    try {
      await updateOnboardingStatus(); // PATCH 호출
      localStorage.setItem("hasSeenOnboarding", "true"); // 로컬 백업
      setIsOnboarded(true); // 상태 변경하여 모달 닫기
      setActiveModal("select"); // 다음 단계로
    } catch (error) {
      console.error("온보딩 상태 업데이트 실패:", error);
      setIsOnboarded(true);
      setActiveModal("select");
    }
  };

  const status = useCookeepsStore((s) => s.status);
  const abandonPlant = useCookeepsStore((s) => s.abandonPlant);
  const recoverPlant = useCookeepsStore((s) => s.recoverPlant);
  const [hideWiltingModal, setHideWiltingModal] = useState(false); // 시드는중

  // const freeWaterPlant = useCookeepsStore((s) => s.freeWaterPlant);
  const setFreeWaterMode = useCookeepsStore((s) => s.setFreeWaterMode);
  const isFreeWaterMode = useCookeepsStore((s) => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore((s) => s.isPlantLoading);

  /* =========================
    수확 감지
  ========================= */

  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const hasShownHarvestModal = useCookeepsStore((s) => s.hasShownHarvestModal);
  const harvestedPlantNames = useCookeepsStore((s) => s.harvestedPlantNames);

  const [showHarvestModal, setShowHarvestModal] = useState(false);

  const justHarvestedPlant = useCookeepsStore((s) => s.justHarvestedPlant);

  useEffect(() => {
    if (justHarvestedPlant && !hasShownHarvestModal) {
      setShowHarvestModal(true);
    }
  }, [justHarvestedPlant, hasShownHarvestModal]);
  // 수확 모달 닫을 때 로직 수정
  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();

    store.setHasShownHarvestModal(true);
    store.setJustHarvestedPlant(null);

    store.resetCurrentPlant();
    await store.fetchMyPlants();
    setShowHarvestModal(false);
    setActiveModal("select");
  };

  // 모달 순서 자동 계산
  const derivedModal = ((): ActiveModal => {
    if (showHarvestModal || isCheckLoading) return null;
    if (!isOnboarded && !currentPlant && !isPlantLoading) return "onboarding";
    if (activeModal === "free") return "free";
    if (activeModal === "selected") return "selected";
    if (activeModal === "harvest") return "harvest"; // 명세에 있다면 추가
    if (isPlantLoading) return null;
    if (!currentPlant) return "select";
    if (status === "wilting") return "wilting";
    if (status === "wilted") return "wilted";

    return null;
  })();

  /* =========================
     물 주기 성공
  ========================= */
  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  /* =========================
     식물 선택 → 확인 모달
  ========================= */
  const handleSelectConfirm = (id: number) => {
    const plant = PLANT_DATA.find((p) => p.id === id);
    if (!plant) return;

    console.log("사용자가 선택한 식물:", plant.text, "id:", id);

    setHideWiltingModal(false); // 새 식물 → 알림 리셋
    setSelectedPlantData(plant);
    setActiveModal("selected");
  };

  /* =========================
     최종 시작 (store 확정)
  ========================= */
  const registerPlant = useCookeepsStore((s) => s.registerPlant);

  const [selectedPlantData, setSelectedPlantData] =
    useState<SelectedPlant | null>(null);

  const handleFinalStart = async () => {
    if (!selectedPlantData) return;

    try {
      const res = await registerPlant(selectedPlantData.id);
      console.log("전체 응답 확인:", res);

      const store = useCookeepsStore.getState();
      const current = store.currentPlant;

      if (!current) {
        setActiveModal("select");
        return;
      }

      // 1. UI 데이터 업데이트 로직 (기존 유지)
      const plantData = PLANT_DATA.find((p) => p.text === current.plantName);
      setSelectedPlantData({
        id: current.userPlantId,
        text: current.plantName,
        img: plantData?.img || "",
        description: plantData?.description || "",
        isHarvested: current.isHarvested,
      });

      // 2. 조건문 수정 (가장 중요)
      const responseMsg = res.data.message;

      if (responseMsg === "첫 식물 등록이 완료되었습니다.") {
        console.log("✅ 첫 등록 보너스 감지!");
        setActiveModal("free");
      } else {
        console.log("ℹ️ 일반 등록 완료 (메시지 불일치):", responseMsg);
        setActiveModal(null);
      }
    } catch (error) {
      console.error("식물 시작 실패:", error);
      setActiveModal("select");
    }
  };

  const [ranking, setRanking] = useState<RankingResponse>({
    myWateringCount: 0,
    wateringRanking: [],
    recipeRanking: [],
  });
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    const { fetchGrowingPlant, fetchCookies, fetchMyPlants } =
      useCookeepsStore.getState();

    const fetchAllData = async () => {
      console.log("🔥 start");
      setLoading(true);

      try {
        const [, , , rankingData] = await Promise.all([
          fetchGrowingPlant(),
          fetchCookies(),
          fetchMyPlants(),
          getWeeklyRanking(),
        ]);

        setRanking(rankingData);

        // 여기 핵심 추가
        const store = useCookeepsStore.getState();
        const plantName = store.currentPlant?.plantName;

        if (plantName) {
          const plantData = PLANT_DATA.find((p) => p.text === plantName);

          if (plantData?.img) {
            await preloadImage(plantData.img); // 이미지 로딩 기다림
          }
        }
      } catch (e) {
        console.error("❌ 에러:", e);
      } finally {
        console.log("🔥 end (로딩 끝)");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative no-scrollbar">
      {/* 1. 온보딩 */}
      <OnboardingModal
        isOpen={derivedModal === "onboarding"}
        onClose={handleOnboardingConfirm}
      />

      {/* 2. 식물 선택 */}
      <PlantSelectModal
        // key={derivedModal === "select" ? "open" : "closed"}
        isOpen={derivedModal === "select"}
        onConfirm={handleSelectConfirm}
        harvestedPlantNames={harvestedPlantNames}
      />

      {/* 3. 선택 확인 */}
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
      {/* 무료 물주기 모달 */}
      <FreeWaterModal
        isOpen={derivedModal === "free"}
        onConfirm={() => {
          setFreeWaterMode(true); // 무료 물주기 모드 ON
          setActiveModal(null);
        }}
        onClose={() => {
          setActiveModal(null);
        }}
      />

      {/* 4. 시들고 있어요 */}
      <WiltingModal
        isOpen={status === "wilting" && !hideWiltingModal}
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setHideWiltingModal(true)}
      />

      {/* 5. 시들었어요 */}
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

      {/* 수확 모달 */}
      <HarvestModal
        isOpen={showHarvestModal}
        onClose={handleHarvestModalClose}
      />

      {/* ===== 상단 영역 ===== */}
      <div className="relative shrink-0 -mt-[35px]">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
          plant={currentPlant?.plantName}
          isLoading={isPlantLoading}
          overridePlantStage={
            showHarvestModal
              ? 4 // 수확 모달 떠있을 때 4단계 유지
              : activeModal === "wilted"
                ? 1
                : undefined
          }
        />

        <CookeepsHeader />
      </div>

      <div className="px-4 shrink-0 relative z-50">
        <PlantGrowthCard
          plant={currentPlant?.plantName}
          onWaterSuccess={handleWaterSuccess}
          overridePlantStage={
            showHarvestModal
              ? 4 // 수확 모달 떠있을 때 4단계 유지
              : activeModal === "wilted"
                ? 1
                : undefined
          }
        />
      </div>
      {isFreeWaterMode && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      {/* ===== 스크롤 영역 ===== */}

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
