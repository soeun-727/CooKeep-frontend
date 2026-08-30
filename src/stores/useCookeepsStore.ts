import { getMyCookies } from "@/api/cookies";
import { claimPendingReward } from "@/api/cookies";
import {
  type RegisterResponseData,
  deleteMyPlant,
  getGrowingPlant,
  getMyPlants,
  registerMyPlant,
  reviveMyPlant,
  setProfileMyPlant,
  waterMyPlant,
} from "@/api/myPlants";
import type { ApiResponse } from "@/api/types";
import { create } from "zustand";

import { PLANT_ID_TO_NAME, PLANT_NAME_TO_TYPE } from "@/constants/plantTypeMap";

import type { MyPlant } from "@/types/myPlant";

export type PlantType =
  | "apple"
  | "beans"
  | "lettuce"
  | "tomato"
  | "potato"
  | "strawberry";

export type PlantStatus = "normal" | "wilting" | "wilted";

export type PlantStage = 1 | 2 | 3 | 4;

interface CookeepsState {
  //  서버 식물 목록
  myPlants: MyPlant[];
  harvestedPlantNames: string[];

  // 현재 키우는 식물 (서버 기준)
  currentPlant: MyPlant | null;
  // API 연동용
  justHarvestedPlant: MyPlant | null;
  setJustHarvestedPlant: (plant: MyPlant | null) => void;
  fetchMyPlants: () => Promise<void>;

  registerPlant: (
    plantId: number,
  ) => Promise<ApiResponse<RegisterResponseData>>;

  selectedPlant: PlantType | null;
  plantStage: PlantStage;
  lastRefreshedAt: Date | null;
  refreshGrowth: () => void;

  cookie: number;
  fetchCookies: () => Promise<void>;
  prevCookie: number | null;
  setPrevCookie: (value: number | null) => void;

  status: PlantStatus;
  lastWateredAt: Date | null;

  selectPlant: (plant: PlantType) => void;
  waterPlant: () => void;
  abandonPlant: () => Promise<void>;
  recoverPlant: () => void;

  // 물주는거 버튼 전달때문
  wantsToWater: boolean;
  setWantsToWater: (v: boolean) => void;

  freeWaterPlant: () => void; // 무료물주기
  isFreeWaterMode: boolean;
  setFreeWaterMode: (v: boolean) => void;

  // 프로필
  setProfilePlant: (userPlantId: number) => Promise<void>;
  isProfileAuto: boolean;
  setProfileAuto: (v: boolean) => void;

  // 수확
  hasShownHarvestModal: boolean;
  setHasShownHarvestModal: (v: boolean) => void;

  resetCurrentPlant: () => void;

  isPlantLoading: boolean;
  fetchGrowingPlant: () => Promise<void>;

  pendingRewardId: number | null; // 추가
  claimHarvestReward: () => Promise<void>; // 추가
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  myPlants: [],
  harvestedPlantNames: [],

  currentPlant: null,
  justHarvestedPlant: null,
  setJustHarvestedPlant: plant => set({ justHarvestedPlant: plant }),
  fetchMyPlants: async () => {
    try {
      const plants = await getMyPlants();
      const current = plants.find((p: MyPlant) => !p.isHarvested) ?? null;

      set({
        myPlants: plants,
        currentPlant: current,
        harvestedPlantNames: plants
          .filter((p: MyPlant) => p.isHarvested)
          .map((p: MyPlant) => p.plantName),
        plantStage: current?.level ?? 1,
        selectedPlant: current ? PLANT_NAME_TO_TYPE[current.plantName] : null,
      });
    } catch (e) {
      console.error(e);
      set({ isPlantLoading: false });
    }
  },

  registerPlant: async (plantId: number) => {
    try {
      console.log("식물 등록 API 호출:", plantId);

      const response = await registerMyPlant(plantId);
      console.log("등록 API 응답:", response);

      set({ hasShownHarvestModal: false, justHarvestedPlant: null });

      const expectedPlantName = PLANT_ID_TO_NAME[plantId];
      await get().fetchGrowingPlant();
      await get().fetchMyPlants(); // 도감용이면 유지

      const { myPlants, isProfileAuto } = get();

      const justRegistered = myPlants
        .filter(p => p.plantName === expectedPlantName && !p.isHarvested)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];

      if (!justRegistered) return response;

      console.log("🆕 [REGISTER 직후 새 식물]", {
        plantName: justRegistered.plantName,
        userPlantId: justRegistered.userPlantId,
        isProfileAuto,
      });

      // A 시나리오일 때만 프로필 자동 변경
      if (isProfileAuto) {
        await setProfileMyPlant(justRegistered.userPlantId);
      }

      // currentPlant는 항상 새 식물
      set({
        currentPlant: justRegistered,
        selectedPlant: PLANT_NAME_TO_TYPE[justRegistered.plantName],
        plantStage: justRegistered.level,
      });

      return response;
    } catch (e) {
      console.error("식물 등록 실패", e);
      throw e;
    }
  },

  selectedPlant: null,
  plantStage: 1,
  cookie: 0,

  fetchCookies: async () => {
    try {
      const cookie = await getMyCookies();
      set({ cookie });
    } catch (e) {
      console.error("쿠키 조회 실패:", e);
    }
  },

  prevCookie: null,
  setPrevCookie: value => set({ prevCookie: value }),

  status: "normal",
  lastWateredAt: null,
  lastRefreshedAt: null,

  refreshGrowth: () => {
    const { lastRefreshedAt } = get();

    const now = new Date();

    // 1초 이내면 갱신 안 함 (연속 호출 방지)
    if (lastRefreshedAt && now.getTime() - lastRefreshedAt.getTime() < 1000) {
      return;
    }

    set({ lastRefreshedAt: now });
  },

  wantsToWater: false,
  setWantsToWater: v => set({ wantsToWater: v }),

  selectPlant: async (plant: PlantType) => {
    const plantIdMap: Record<PlantType, number> = {
      apple: 1,
      beans: 2,
      lettuce: 3,
      tomato: 4,
      potato: 5,
      strawberry: 6,
    };

    await registerMyPlant(plantIdMap[plant]);

    // 서버 기준으로 다시 동기화
    await get().fetchMyPlants();
  },

  waterPlant: async () => {
    const { currentPlant, cookie } = get();
    if (!currentPlant) {
      console.log("물주기 실패: currentPlant 없음");
      return;
    }
    console.log("💧 [WATER 요청 직전]", {
      plantName: currentPlant.plantName,
      level: currentPlant.level,
      userPlantId: currentPlant.userPlantId,
      cookie,
    });

    if (cookie < 10) {
      console.log("쿠키 부족");
      return;
    }

    const beforeLevel = currentPlant.level;
    console.log("물주기 시작:", {
      plantName: currentPlant.plantName,
      level: beforeLevel,
      userPlantId: currentPlant.userPlantId,
      cookie,
    });

    if (beforeLevel === 3) {
      set({ prevCookie: cookie });
      console.log("  → prevCookie 저장:", cookie);
    }

    const snapshotPlant = currentPlant; // 스냅샷 저장

    try {
      const waterResult = await waterMyPlant(snapshotPlant.userPlantId);

      const hasHarvested =
        waterResult.justHarvested || waterResult.isJustHarvested;

      if (hasHarvested && waterResult.pendingRewardId !== null) {
        // pendingRewardId 저장만 해두고 claim은 아직 안 함
        set({
          pendingRewardId: waterResult.pendingRewardId,
          cookie: waterResult.cookieCnt, // -10 반영된 값
        });

        // 4단계 애니메이션 연출
        const temp4thStage = {
          ...snapshotPlant,
          level: 4 as const,
          isHarvested: false,
        };
        set({ currentPlant: temp4thStage, plantStage: 4 });

        // 수확 상태로 전환 → HarvestModal 표시됨
        set(state => ({
          justHarvestedPlant: { ...snapshotPlant, isHarvested: true },
          currentPlant: null,
          selectedPlant: null,
          harvestedPlantNames: Array.from(
            new Set([...state.harvestedPlantNames, snapshotPlant.plantName]),
          ),
        }));

        // 여기서 claim 안 함! 모달 확인 후에 호출
      } else {
        // 일반 물주기
        set({ cookie: waterResult.cookieCnt });
        await get().fetchMyPlants(); // snapshotPlant 제거
        await get().fetchGrowingPlant();
      }
    } catch (e) {
      console.error("물주기 실패:", e);
      throw e;
    }
  },

  freeWaterPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      // await waterMyPlant(currentPlant.userPlantId);
      // await get().fetchMyPlants();
      // await get().fetchCookies();
      const waterResult = await waterMyPlant(currentPlant.userPlantId);
      set({ cookie: waterResult.cookieCnt });
      await get().fetchMyPlants();
      // fetchCookies 제거
    } catch (e) {
      console.error("무료 물주기 실패", e);
    }
  },
  isFreeWaterMode: false,
  setFreeWaterMode: v => set({ isFreeWaterMode: v }),

  // 포기하기
  abandonPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await deleteMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      set({
        selectedPlant: null,
        hasShownHarvestModal: false,
        plantStage: 1,
        status: "normal",
        lastWateredAt: null,
      });
    } catch (e) {
      console.error("포기 실패", e);
      throw e;
    }
  },

  recoverPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await reviveMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      await get().fetchCookies();
      set({
        status: "normal",
        lastWateredAt: new Date(),
      });
    } catch (e) {
      console.error("회복 실패", e);
      throw e;
    }
  },

  setProfilePlant: async (userPlantId: number) => {
    // 1. UI 먼저 즉시 변경 (말풍선 바로 이동)
    set(state => ({
      myPlants: state.myPlants.map(p => ({
        ...p,
        isProfile: p.userPlantId === userPlantId,
      })),
    }));

    try {
      // 2. 그 다음 서버 통신 실행
      await setProfileMyPlant(userPlantId);
      // 3. 마지막으로 서버 데이터와 최종 동기화 (최신 정보 확정)
      await get().fetchMyPlants();
    } catch (e) {
      console.error("프로필 변경 실패", e);
      // (선택사항) 실패 시 다시 fetch해서 이전 상태로 롤백
      await get().fetchMyPlants();
    }
  },
  isProfileAuto: true,
  setProfileAuto: v => set({ isProfileAuto: v }),

  // 수확
  hasShownHarvestModal: false,
  setHasShownHarvestModal: v => set({ hasShownHarvestModal: v }),

  resetCurrentPlant: () => {
    set({
      currentPlant: null,
      selectedPlant: null,
      plantStage: 1,
      status: "normal",
      lastWateredAt: null,
    });
  },

  isPlantLoading: true,
  fetchGrowingPlant: async () => {
    set({ isPlantLoading: true });

    try {
      const plant = await getGrowingPlant();

      let mappedStatus: PlantStatus = "normal";

      if (plant?.plantStatus === "WILTING") {
        mappedStatus = "wilting";
      }

      if (plant?.plantStatus === "FROZEN") {
        mappedStatus = "wilted";
      }

      set({
        currentPlant: plant,
        plantStage: plant?.level ?? 1,
        selectedPlant: plant ? PLANT_NAME_TO_TYPE[plant.plantName] : null,
        status: mappedStatus, // 이게 핵심
        isPlantLoading: false,
      });
    } catch (e) {
      console.error("현재 식물 조회 실패", e);
      set({ isPlantLoading: false });
    }
  },

  // 초기값 추가
  pendingRewardId: null,
  // claim 함수 추가
  claimHarvestReward: async () => {
    const { pendingRewardId } = get();
    if (pendingRewardId === null) return;

    try {
      const finalCookieCnt = await claimPendingReward(pendingRewardId);
      set({ cookie: finalCookieCnt, pendingRewardId: null });
    } catch (e) {
      console.error("보상 수령 실패:", e);
      // 실패해도 pendingRewardId 유지 (재시도 가능하게)
    }
  },
}));
