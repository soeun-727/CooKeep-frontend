import Item from "./Item";
import character from "../../../../assets/character/confused_char.svg";
import {
  AddSourceItem,
  useAddIngredientStore,
} from "../../../../stores/useAddIngredientStore";
import { deleteCustomIngredient } from "../../../../api/ingredient";

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

  const handleItemDelete = async (id: number | string, name: string) => {
    if (!window.confirm(`'${name}' 재료를 삭제하시겠습니까?`)) return;

    // 1. 디버깅용 로그 (브라우저 콘솔에서 확인 가능)
    console.log("원본 ID:", id);

    try {
      // 2. ID가 문자열인 경우 숫자만 추출 (예: "custom_12" -> 12)
      // 만약 이미 숫자라면 그대로 사용합니다.
      const numericId =
        typeof id === "string" ? parseInt(id.replace(/[^0-9]/g, ""), 10) : id;

      // 3. 변환된 값이 유효한 숫자인지 최종 체크
      if (isNaN(numericId as number)) {
        console.error("유효하지 않은 ID 형식입니다.");
        return;
      }

      // 4. API 호출
      await deleteCustomIngredient(numericId as number);

      // 5. 성공 시 UI 업데이트
      deleteMasterItem(id);
      onDeleteLocal(id);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("재료 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[10px] pb-25">
      <div className="flex flex-col w-[294px]">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isCustom={item.type === "CUSTOM"}
              isSelected={selectedItems.some(
                (i) => String(i.id) === String(item.id),
              )}
              onSelect={() => toggleItem(item)}
              onDelete={() => handleItemDelete(item.id, item.name)}
            />
          ))}
        </div>

        {isSearchEmpty && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center justify-center gap-3 mt-30 mb-50 animate-fadeIn"
          >
            <img src={character} className="w-23" alt="no result" />
            <div className="bg-black rounded-[100px] h-6 py-1 px-[18px] flex justify-center items-center">
              <span className="typo-caption text-white text-center py-1">
                직접 재료 추가하기
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
