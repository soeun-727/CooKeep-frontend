import { create } from "zustand";
import type { IngredientType, StorageType, UnitType } from "../api/ingredient";

export interface MasterItem {
  id: number | string;
  referenceId?: number | string;
  name: string;
  image: string;
  categoryId: number;
  type: IngredientType;
  storageType: StorageType;
  unit: UnitType;
  expiration: string;
  quantity: number;
  memo?: string;
}

type EditorType = "storage" | "expiry" | "quantity" | "unit" | "memo";

export interface AddSourceItem {
  id: number | string;
  name: string;
  image: string;
  categoryId: number;
  type?: IngredientType;
  unit?: UnitType;
  storage?: StorageType;
  expirationDays?: number;
}

interface AddIngredientState {
  searchTerm: string;
  selectedCategoryId: number;
  selectedItems: MasterItem[];
  historyItems: MasterItem[];
  isModalOpen: boolean;
  deleteMasterItem: (id: string | number) => void;
  setModalOpen: (open: boolean) => void;
  setSearchTerm: (term: string) => void;
  setCategoryId: (id: number) => void;
  toggleItem: (item: AddSourceItem) => void;
  resetSelected: () => void;
  setHistoryItems: (items: MasterItem[]) => void;
  updateItemDetail: (id: string | number, type: EditorType, value: any) => void;
  setDetailedItemsFromPreview: (items: MasterItem[]) => void;
}

const REVERSE_STORAGE_MAP: Record<string, StorageType> = {
  냉장: "FRIDGE",
  냉동: "FREEZER",
  상온: "PANTRY",
  FRIDGE: "FRIDGE",
  FREEZER: "FREEZER",
  PANTRY: "PANTRY",
};

const REVERSE_UNIT_MAP: Record<string, UnitType> = {
  개: "PIECE",
  팩: "PACK",
  봉지: "BAG",
  병: "BOTTLE",
  묶음: "BUNDLE",
  캔: "CAN",
  g: "GRAM",
  ml: "MILLILITER",
  PIECE: "PIECE",
  PACK: "PACK",
  BAG: "BAG",
  BOTTLE: "BOTTLE",
  BUNDLE: "BUNDLE",
  CAN: "CAN",
  GRAM: "GRAM",
  MILLILITER: "MILLILITER",
};

export const useAddIngredientStore = create<AddIngredientState>((set) => ({
  searchTerm: "",
  selectedCategoryId: 1,
  selectedItems: [],
  historyItems: [],
  isModalOpen: false,
  deleteMasterItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((i) => i.id !== id),
      historyItems: state.historyItems.filter((i) => i.id !== id),
    })),
  setModalOpen: (open) => set({ isModalOpen: open }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategoryId: (id) => set({ selectedCategoryId: id, searchTerm: "" }),

  toggleItem: (item) =>
    set((state) => {
      const isExist = state.selectedItems.find((i) => i.id === item.id);
      if (isExist) {
        return {
          selectedItems: state.selectedItems.filter((i) => i.id !== item.id),
        };
      }
      const today = new Date();
      const daysToAdd = item.expirationDays || 7;
      today.setDate(today.getDate() + daysToAdd);
      const calculatedDate = today.toISOString().split("T")[0];

      const newItem: MasterItem = {
        id: item.id,
        referenceId: item.id,
        name: item.name,
        image: item.image,
        categoryId: item.categoryId,
        type: item.type || "DEFAULT",
        storageType: (item.storage || "FRIDGE") as StorageType,
        unit: (item.unit || "PIECE") as UnitType,
        expiration: calculatedDate,
        quantity: 1,
        memo: "",
      };

      return { selectedItems: [...state.selectedItems, newItem] };
    }),

  resetSelected: () => set({ selectedItems: [] }),
  setHistoryItems: (items) => set({ historyItems: items }),
  setDetailedItemsFromPreview: (items) => set({ selectedItems: items }),

  updateItemDetail: (id, type, value) =>
    set((state) => {
      const fieldMap: Record<EditorType, keyof MasterItem> = {
        storage: "storageType",
        expiry: "expiration",
        quantity: "quantity",
        unit: "unit",
        memo: "memo",
      };

      let finalValue = value;
      if (type === "storage") finalValue = REVERSE_STORAGE_MAP[value] || value;
      if (type === "unit") finalValue = REVERSE_UNIT_MAP[value] || value;
      if (type === "expiry" && typeof value === "string")
        finalValue = value.replace(/\./g, "-");

      const fieldName = fieldMap[type];

      return {
        selectedItems: state.selectedItems.map((item) =>
          item.id === id ? { ...item, [fieldName]: finalValue } : item,
        ),
      };
    }),
}));
