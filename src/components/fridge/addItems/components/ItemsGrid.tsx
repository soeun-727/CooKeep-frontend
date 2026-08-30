import { useState } from "react";

import { deleteCustomIngredient } from "@/api/ingredient";
import {
  AddSourceItem,
  useAddIngredientStore,
} from "@/stores/useAddIngredientStore";
import { AxiosError } from "axios";

import character from "@/assets/character/confused_char.svg";
import PlusIcon from "@/assets/fridge/plus.svg?react";

import ConfirmModal from "../../modals/ConfirmModal";
import Item from "./Item";

interface ItemsGridProps {
  items: AddSourceItem[];
  onDeleteLocal: (id: number | string) => void;
}

export default function ItemsGrid({ items, onDeleteLocal }: ItemsGridProps) {
  const {
    selectedItems,
    toggleItem,
    setModalOpen,
    searchTerm,
    deleteMasterItem,
  } = useAddIngredientStore();
  const isSearchEmpty =
    searchTerm && searchTerm.trim().length > 0 && items.length === 0;

  const [deleteTarget, setDeleteTarget] = useState<{
    id: number | string;
    name: string;
  } | null>(null);

  const handleItemDeleteClick = (id: number | string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const numericId =
        typeof deleteTarget.id === "string"
          ? parseInt(deleteTarget.id.replace(/[^0-9]/g, ""), 10)
          : deleteTarget.id;

      if (isNaN(numericId)) {
        console.error("잘못된 ID 형식:", deleteTarget.id);
        return;
      }

      console.log("삭제 요청 ID:", numericId);

      const response = await deleteCustomIngredient(numericId);

      console.log("삭제 성공 응답:", response.data);

      deleteMasterItem(deleteTarget.id);
      onDeleteLocal(deleteTarget.id);

      setDeleteTarget(null);
    } catch (error: unknown) {
      console.error("삭제 실패:", error);

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) alert("로그인이 필요합니다.");
        else if (status === 404) alert("이미 삭제된 재료입니다.");
        else if (status === 500) alert("서버 오류가 발생했습니다.");
        else alert(message || "재료 삭제 실패");
      } else {
        alert("알 수 없는 오류");
      }
    }
  };

  return (
    <>
      {isSearchEmpty ? (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
          <img src={character} className="w-23" alt="no result" />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="animate-fadeIn items-center justify-center"
          >
            <div className="bg-gray-80 rounded-M flex items-center justify-center gap-2 px-4 py-2">
              <p className="typo-label text-gray-0 text-center">
                직접 재료 추가하기
              </p>
              <PlusIcon className="text-gray-0 h-5 w-5" />
            </div>
          </button>
        </div>
      ) : (
        <div className="mb-6 flex w-full flex-col items-center justify-center pt-[10px]">
          <div className="grid grid-cols-3 justify-items-center gap-3">
            {items.map(item => (
              <Item
                key={item.id}
                name={item.name}
                image={item.image}
                isCustom={item.type === "CUSTOM"}
                isSelected={selectedItems.some(
                  i => String(i.id) === String(item.id),
                )}
                onSelect={() => toggleItem(item)}
                onDelete={() => handleItemDeleteClick(item.id, item.name)}
              />
            ))}
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="재료를 삭제하시겠어요?"
          subtitle={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
