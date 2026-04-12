// src/stores/useCookeepsStore.ts
import { create } from "zustand";
import {
  deleteMyPlant,
  getGrowingPlant,
  getMyPlants,
  registerMyPlant,
  reviveMyPlant,
  setProfileMyPlant,
  waterMyPlant,
  type RegisterResponseData,
} from "../api/myPlants";
import type { MyPlant } from "../types/myPlant";
import {
  PLANT_ID_TO_NAME,
  PLANT_NAME_TO_TYPE,
} from "../constants/plantTypeMap";
import { getMyCookies } from "../api/cookies";
import type { ApiResponse } from "../api/types";

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
  // 추가
  justHarvestedPlant: MyPlant | null;
  setJustHarvestedPlant: (plant: MyPlant | null) => void;
  // fetchMyPlants: () => Promise<void>;
  fetchMyPlants: (snapshotPlant?: MyPlant) => Promise<void>;

  registerPlant: (
    plantId: number,
  ) => Promise<ApiResponse<RegisterResponseData>>;

  selectedPlant: PlantType | null;
  plantStage: PlantStage;
  // grownPlants: PlantType[]; // 다 키운 식물 목록
  lastRefreshedAt: Date | null;
  refreshGrowth: () => void;

  cookie: number;
  fetchCookies: () => Promise<void>;
  prevCookie: number | null;
  setPrevCookie: (value: number | null) => void;

  status: PlantStatus;
  lastWateredAt: Date | null;

  selectPlant: (plant: PlantType) => void;
  // growPlant: () => void;
  waterPlant: () => void;
  abandonPlant: () => Promise<void>;
  recoverPlant: () => void;

  // 물주는거 버튼 전달때문
  wantsToWater: boolean;
  setWantsToWater: (v: boolean) => void;

  freeWaterPlant: () => void; // 무료물주기
  isFreeWaterMode: boolean;
  setFreeWaterMode: (v: boolean) => void;

  // addCookie: () => void;

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
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  myPlants: [],
  harvestedPlantNames: [],

  currentPlant: null,
  justHarvestedPlant: null,
  setJustHarvestedPlant: (plant) => set({ justHarvestedPlant: plant }),
  fetchMyPlants: async (snapshotPlant?: MyPlant) => {
    try {
      // const plants = await getMyPlants();
      // const prevPlant = get().currentPlant;
      const plants = await getMyPlants();
      const prevPlant = snapshotPlant ?? get().currentPlant;

      if (prevPlant && !prevPlant.isHarvested) {
        const harvestedVersion = plants.find(
          (p: MyPlant) =>
            p.userPlantId === prevPlant.userPlantId && p.isHarvested,
        );

        if (harvestedVersion) {
          console.log("🌾 수확 감지!", harvestedVersion.plantName);

          // 1. 잠깐 4단계 유지
          const temp4thStage = {
            ...harvestedVersion,
            level: 4,
            isHarvested: false,
          };
          set({ currentPlant: temp4thStage, plantStage: 4 });

          // 2. await로 2초 대기
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // 3. 수확 상태 업데이트
          // 수확 이벤트 발생 시점에 currentPlant를 null로 초기화
          set((state) => ({
            justHarvestedPlant: harvestedVersion,
            currentPlant: null, // 이제 식물이 없음을 명시
            selectedPlant: null,
            harvestedPlantNames: Array.from(
              new Set([
                ...state.harvestedPlantNames,
                harvestedVersion.plantName,
              ]),
            ),
            // 수확된 식물은 더이상 프로필(현재 키우는 중)이 아니도록 초기화
            // myPlants: get().myPlants.map((p) =>
            //   p.userPlantId === harvestedVersion.userPlantId
            //     ? { ...p, isProfile: false, isHarvested: true }
            //     : p,
            // ),
            myPlants: plants,
          }));
          return; // 아래 로직 타지 않게
        }
      }

      // 평소 로직
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
        .filter((p) => p.plantName === expectedPlantName && !p.isHarvested)
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
  // grownPlants: [],
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
  setPrevCookie: (value) => set({ prevCookie: value }),

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
  setWantsToWater: (v) => set({ wantsToWater: v }),

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

    const snapshotPlant = currentPlant; // 👈 스냅샷 저장

    if (cookie < 10) {
      console.log("쿠키 부족");
      return;
    }

    try {
      //       const response = await waterMyPlant(currentPlant.userPlantId);
      //       console.log("물주기 API 응답:", response);

      //       // 최종 상태 갱신
      //       await get().fetchMyPlants();      // 먼저
      // await get().fetchGrowingPlant();  // 나중

      // ✅ 물주기 API는 딱 한 번만 호출
      await waterMyPlant(snapshotPlant.userPlantId);

      // ✅ 수확 감지 먼저
      await get().fetchMyPlants(snapshotPlant);

      // ✅ 그 다음 현재 성장 식물 동기화
      await get().fetchGrowingPlant();

      await get().fetchCookies();

      const newPlant = get().currentPlant;
      console.log("물주기 완료:", {
        이전레벨: beforeLevel,
        현재레벨: newPlant?.level,
        식물: newPlant?.plantName,
        userPlantId: newPlant?.userPlantId,
      });
    } catch (e) {
      console.error("물주기 실패:", e);
      throw e;
    }
  },

  freeWaterPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await waterMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      await get().fetchCookies();
    } catch (e) {
      console.error("무료 물주기 실패", e);
    }
  },
  isFreeWaterMode: false,
  setFreeWaterMode: (v) => set({ isFreeWaterMode: v }),

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

  // addCookie: () => set((state) => ({ cookie: state.cookie + 1 })), // 쿠키 +1 함수 추가

  // useCookeepsStore.ts 내부
  setProfilePlant: async (userPlantId: number) => {
    // 1. UI 먼저 즉시 변경 (말풍선 바로 이동)
    set((state) => ({
      myPlants: state.myPlants.map((p) => ({
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
  setProfileAuto: (v) => set({ isProfileAuto: v }),

  // 수확
  hasShownHarvestModal: false,
  setHasShownHarvestModal: (v) => set({ hasShownHarvestModal: v }),

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
}));
