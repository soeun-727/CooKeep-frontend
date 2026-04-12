import { create } from "zustand";
import {
  updateRecipeVisibility,
  DailyRecipe,
  toggleRecipeLike,
  toggleRecipeBookmark,
} from "../api/myRecipe";
import { useRewardStore } from "./useRewardStore";

export interface RecordImage {
  url: string;
  file?: File;
}

interface RecordState {
  // 입력/수정용 임시 상태
  selectedRecipeId: number | null;
  editingRecordId: string | null;
  title: string;
  memo: string;
  isPublic: boolean | null;
  // images: RecordImage[];
  image: RecordImage | null;

  // 상태 변경 함수
  setSelectedRecipeId: (id: number) => void;
  setEditingRecordId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setMemo: (memo: string) => void;
  setIsPublic: (value: boolean) => void;
  // addImages: (newImages: RecordImage[]) => void;
  // removeImage: (index: number) => void;
  setImage: (image: RecordImage | null) => void;
  clearImage: () => void;
  resetRecord: () => void;

  records: DailyRecipe[];
  setRecords: (records: DailyRecipe[]) => void; // 전체 리스트 세팅
  updateRecordVisibility: (
    recordId: string,
    isPublic: boolean,
  ) => Promise<void>;
  updateRecordLike: (recordId: string) => Promise<{
    dailyRecipeId: number;
    likeCount: number;
    liked: boolean;
  } | void>;

  updateRecordBookmark: (recordId: string) => Promise<{
    bookmarked: boolean;
  } | void>;
}

export const useCookeepRecordStore = create<RecordState>((set, get) => ({
  selectedRecipeId: null,
  editingRecordId: null,
  title: "",
  memo: "",
  isPublic: null,
  // images: [],
  image: null,
  records: [],

  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
  setEditingRecordId: (id) => set({ editingRecordId: id }),
  setTitle: (title) => set({ title }),
  setMemo: (memo) => set({ memo }),
  setIsPublic: (value) => set({ isPublic: value }),

  // addImages: (newImages) =>
  //   set((state) => ({
  //     images: [...state.images, ...newImages].slice(0, 2),
  //   })),

  // removeImage: (index) =>
  //   set((state) => ({
  //     images: state.images.filter((_, i) => i !== index),
  //   })),
  setImage: (image) => set({ image }),
  clearImage: () => set({ image: null }),

  resetRecord: () =>
    set({
      selectedRecipeId: null,
      editingRecordId: null,
      title: "",
      memo: "",
      isPublic: null,
      image: null,
    }),

  // 서버 데이터를 스토어에 저장하는 함수
  setRecords: (records) => set({ records }),

  updateRecordLike: async (recordId: string) => {
    const previousRecords = get().records;
    const targetRecord = previousRecords.find(
      (r) => String(r.dailyRecipeId) === recordId,
    );

    // 1. [낙관적 업데이트] 배열에 데이터가 있을 때만 실행
    if (targetRecord) {
      set((state) => ({
        records: state.records.map((r) =>
          String(r.dailyRecipeId) === recordId
            ? {
                ...r,
                liked: !r.liked,
                likeCount: r.liked ? r.likeCount - 1 : r.likeCount + 1,
              }
            : r,
        ),
      }));
    }

    try {
      // 2. 서버 API 호출 (배열에 있든 없든 서버에는 알려야 함)
      const res = await toggleRecipeLike(Number(recordId));
      if (res.status !== "OK") throw new Error("좋아요 실패");

      // 3. 서버 응답으로 동기화
      if (targetRecord) {
        set((state) => ({
          records: state.records.map((r) =>
            String(r.dailyRecipeId) === recordId
              ? { ...r, liked: res.data.liked, likeCount: res.data.likeCount }
              : r,
          ),
        }));
      }

      // 4. 주간 목표 달성 체크
      if (res.data.weeklyGoalAchieved) {
        useRewardStore.getState().enqueue("WEEKLY");
      }

      // 중요: 상세 페이지에서 이 결과값을 쓸 수 있도록 반환값을 전달해주면 좋습니다.
      return res.data;
    } catch (error) {
      set({ records: previousRecords });
      throw error; // 부모 컴포넌트에서 에러 처리를 할 수 있게 던짐
    }
  },

  updateRecordVisibility: async (recordId: string, isPublic: boolean) => {
    // 1. 이전 상태를 백업 (실패 시 복구용)
    const previousRecords = get().records;

    // 2. [즉각 반영] 서버 응답 기다리지 않고 UI 상태부터 변경
    set((state) => ({
      records: state.records.map((r) =>
        String(r.dailyRecipeId) === recordId ? { ...r, isPublic } : r,
      ),
    }));

    try {
      // 3. 서버 API 호출
      const res = await updateRecipeVisibility(Number(recordId), isPublic);

      // 만약 서버 응답이 OK가 아니라면 에러를 던져 catch로 보냄
      if (res.status !== "OK") {
        throw new Error("서버 응답 오류");
      }

      console.log(`서버 연동 성공: ${isPublic ? "공개" : "비공개"}`);
    } catch (error) {
      console.error("공개 범위 수정 실패, 원래 상태로 복구합니다:", error);

      // 4. [복구] 서버 요청 실패 시 백업해둔 데이터로 롤백
      set({ records: previousRecords });
      alert("공개 상태 변경에 실패했습니다. 네트워크 연결을 확인해주세요.");
    }
  },
  updateRecordBookmark: async (recordId: string) => {
    const previousRecords = get().records;

    // 1. [낙관적 업데이트] 즉시 북마크 아이콘 변경
    set((state) => ({
      records: state.records.map((r) =>
        String(r.dailyRecipeId) === recordId
          ? { ...r, bookmarked: !r.bookmarked }
          : r,
      ),
    }));

    try {
      const res = await toggleRecipeBookmark(Number(recordId));
      if (res.status !== "OK") throw new Error();

      // 2. 서버 응답 결과로 데이터 확정
      set((state) => ({
        records: state.records.map((r) =>
          String(r.dailyRecipeId) === recordId
            ? { ...r, bookmarked: res.data.bookmarked }
            : r,
        ),
      }));
    } catch (error) {
      console.error("북마크 처리 실패:", error);
      set({ records: previousRecords }); // 실패 시 롤백
      alert("북마크 처리에 실패했습니다. (자신의 글은 북마크할 수 없습니다)");
    }
  },
}));
