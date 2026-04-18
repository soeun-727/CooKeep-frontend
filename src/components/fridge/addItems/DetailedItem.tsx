import React, { useState } from "react";
import memoIcon from "../../../assets/fridge/memo.svg";
import renameIcon from "../../../assets/recipe/rename.svg";
import coldIcon from "../../../assets/fridge/fridge.svg";
import frozenIcon from "../../../assets/fridge/freezer.svg";
import roomIcon from "../../../assets/fridge/pantry.svg";
import deleteIcon from "../../../assets/fridge/delete.svg";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";
import type { MasterItem } from "../../../stores/useAddIngredientStore";
import EditModal from "../../ui/EditModal";
import QuantityEditor from "./components/edit/QuantityEditor";
import UnitEditor from "./components/edit/UnitEditor";
import StorageEditor from "./components/edit/StorageEditor";
import ExpiryEditor from "./components/edit/ExpiryEditor";
import MemoEditor from "./components/edit/MemoEditor";
import { calculateExpiryDate } from "../../../utils/expiryDate";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DetailedItemProps extends MasterItem {}

const STORAGE_ICONS: Record<string, string> = {
  FRIDGE: coldIcon,
  FREEZER: frozenIcon,
  PANTRY: roomIcon,
};

const STORAGE_NAMES: Record<string, string> = {
  FRIDGE: "냉장",
  FREEZER: "냉동",
  PANTRY: "상온",
};

const UNIT_NAMES: Record<string, string> = {
  PIECE: "개",
  PACK: "팩",
  BAG: "봉지",
  BOTTLE: "병",
  BUNDLE: "묶음",
  CAN: "캔",
  GRAM: "g",
  MILLILITER: "ml",
};

const DetailedItem: React.FC<DetailedItemProps> = (item) => {
  const { updateItemDetail, toggleItem } = useAddIngredientStore();
  const [modalType, setModalType] = useState<
    "storage" | "expiry" | "quantity" | "unit" | "memo" | null
  >(null);

  const currentIcon = STORAGE_ICONS[item.storageType] || coldIcon;
  const currentText = STORAGE_NAMES[item.storageType] || "냉장";

  const handleUpdate = (value: any) => {
    if (modalType) {
      updateItemDetail(item.id, modalType, value);
      setModalType(null);
    }
  };

  const renderEditor = () => {
    switch (modalType) {
      case "storage":
        return {
          title: "보관 장소를 선택해주세요",
          component: (
            <StorageEditor value={item.storageType} onSave={handleUpdate} />
          ),
        };
      case "expiry":
        return {
          title: "유통기한을 선택해주세요",
          component: (
            <ExpiryEditor
              value={item.expiration ? item.expiration.replace(/-/g, ".") : ""}
              onSave={handleUpdate}
            />
          ),
        };
      case "quantity":
        return {
          title: "수량을 선택해주세요",
          component: (
            <QuantityEditor value={item.quantity || 1} onSave={handleUpdate} />
          ),
        };
      case "unit":
        return {
          title: "보관 단위를 선택해주세요",
          component: <UnitEditor value={item.unit} onSave={handleUpdate} />,
        };
      case "memo":
        return {
          title: "메모를 자유롭게 남겨보세요",
          component: (
            <MemoEditor value={item.memo || ""} onSave={handleUpdate} />
          ),
        };
      default:
        return { title: "", component: null };
    }
  };

  const { title, component } = renderEditor();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteConfirm = () => {
    toggleItem(item);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative w-[345px] h-[198px] rounded-[6px] bg-[#FFFFFF] shadow-[0px_1px_8.2px_-2px_rgba(17,17,17,0.25)]">
      <div className="flex p-6 gap-6">
        <div className="flex flex-col items-start w-[99px] h-34">
          <div className="w-20 h-20 rounded-[6px] flex items-center justify-center border border-[#D1D1D1] p-[14px]">
            <img
              src={item.image}
              className="w-13 h-13 object-contain"
              alt={item.name}
            />
          </div>
          <span className="typo-caption w-[95px] pt-[10px] text-left truncate font-bold px-[2px]">
            {item.name}
          </span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setModalType("memo");
            }}
            className="w-full h-6 flex items-center justify-center pl-[2px] cursor-pointer relative z-[20] group"
          >
            <span className="text-[10px] truncate flex-1 text-stone-300">
              {item.memo || "메모를 남겨주세요"}
            </span>
            <img src={memoIcon} alt="edit memo" className="w-6 flex-shrink-0" />
          </div>
        </div>

        <div className="flex flex-col items-start w-44 h-38 gap-2 typo-caption">
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">보관장소</span>
            <div
              onClick={() => setModalType("storage")}
              className="flex min-w-[59px] h-8 px-2 gap-1 bg-black rounded-[6px] items-center cursor-pointer"
            >
              <img
                src={currentIcon}
                alt={item.storageType}
                className="h-[15px]"
              />
              <span className="text-[var(--color-green-deep)] whitespace-nowrap">
                {currentText}
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">유통기한</span>
            <div className="flex w-[122px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">
                {item.expiration
                  ? item.expiration.replace(/-/g, ".")
                  : calculateExpiryDate(0)}
              </span>
              <img
                onClick={() => setModalType("expiry")}
                src={renameIcon}
                className="w-3 cursor-pointer"
                alt="edit"
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">수량</span>
            <div className="flex w-[66px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">{item.quantity || 1}</span>
              <img
                onClick={() => setModalType("quantity")}
                src={renameIcon}
                className="w-3 cursor-pointer"
                alt="edit"
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">단위</span>
            <div className="flex w-[66px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">
                {UNIT_NAMES[item.unit] || item.unit || "개"}
              </span>
              <img
                onClick={() => setModalType("unit")}
                src={renameIcon}
                className="w-3 cursor-pointer"
                alt="edit"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        className="absolute bottom-1 right-1 z-30 p-1 transition-all active:scale-90"
      >
        <img alt="deleteButton" src={deleteIcon} className="w-10" />
      </button>

      <EditModal
        key={modalType}
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={title}
      >
        {component}
      </EditModal>
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          ingredientName={item.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DetailedItem;
