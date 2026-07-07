import { useState } from "react";

import { deleteCustomIngredient } from "@/api/ingredient";
import {
  AddSourceItem,
  useAddIngredientStore,
} from "@/stores/useAddIngredientStore";
import { AxiosError } from "axios";

import character from "@/assets/character/confused_char.svg";

import DeleteConfirmModal from "../../modals/DeleteConfirmModal";
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
      <div className="flex w-full flex-col items-center justify-center pt-[10px] pb-25">
        <div className="flex flex-col">
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

          {isSearchEmpty && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="animate-fadeIn mt-30 mb-50 flex flex-col items-center justify-center gap-3"
            >
              <img src={character} className="w-23" alt="no result" />
              <div className="flex h-6 items-center justify-center rounded-[100px] bg-black px-[18px] py-1">
                <span className="typo-caption text-gray-0 py-1 text-center">
                  직접 재료 추가하기
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteConfirmModal
          ingredientName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          confirmColor="green"
        />
      )}
    </>
  );
}
