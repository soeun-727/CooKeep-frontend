import { useCallback, useEffect, useState } from "react";

import {
  getIngredientDetail,
  updateIngredientDate,
  updateIngredientMemo,
  updateIngredientQuantity,
  updateIngredientStorage,
} from "@/api/ingredient";
import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import character from "@/assets/character/tip_char.svg";
import bubbleTail from "@/assets/fridge/bubble_tail_left.svg";
import memoIcon from "@/assets/fridge/edit_memo.svg";
import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import EditModal from "@/components/ui/EditModal";

import type { IconComponent } from "@/types/icon";

import { getKoreanUnit } from "@/utils/mapping";

import ExpiryEditor from "../addItems/components/edit/ExpiryEditor";
import QuantityEditor from "../addItems/components/edit/QuantityEditor";
import StorageEditor from "../addItems/components/edit/StorageEditor";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface IngredientDetailModalProps {
  ingredient: Ingredient;
  onClose: () => void;
  onUpdate: () => void;
}

export default function IngredientDetailModal({
  ingredient,
  onClose,
  onUpdate,
}: IngredientDetailModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState("");
  const [detailData, setDetailData] = useState<any>(null);
  const [openEditor, setOpenEditor] = useState<
    null | "storage" | "expiry" | "quantity"
  >(null);
  const [isDirty, setIsDirty] = useState(false);
  const displayData = detailData || ingredient;

  const { changeStorage, changeExpiryDate, changeQuantity, changeMemo } =
    useIngredientStore();

  const handleModalClose = useCallback(() => {
    if (isDirty) {
      onUpdate();
    }
    onClose();
  }, [isDirty, onClose, onUpdate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getIngredientDetail(Number(ingredient.id));
        if (response.data && response.data.data) {
          const data = response.data.data;
          setDetailData(data);
          setMemo(data.memo || "");
        }
      } catch (error) {
        console.error("상세 정보 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
    return () => {
      document.body.style.overflow = "";
    };
  }, [ingredient.id]);

  const storageIconMap: Record<string, IconComponent> = {
    냉장: FridgeIcon,
    냉동: FreezerIcon,
    상온: PantryIcon,
    FRIDGE: FridgeIcon,
    FREEZER: FreezerIcon,
    PANTRY: PantryIcon,
  };

  const handleSaveMemo = async () => {
    try {
      await updateIngredientMemo(Number(ingredient.id), memo);
      await changeMemo(ingredient.id, memo);
      setIsEditing(false);
      setIsDirty(true);
    } catch (error) {
      console.error("메모 저장 실패:", error);
    }
  };

  if (isLoading) return <LoadingScreen />;

  const displayTip = displayData.aiTip || ingredient.tip;

  const StorageIcon =
    storageIconMap[displayData.storage || displayData.category] || FridgeIcon;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="bg-gray-80 absolute inset-0" onClick={handleModalClose} />
      <div className="no-scrollbar animate-fadeIn shadow-plant relative z-10 max-h-[90vh] w-full max-w-[330px] overflow-y-auto rounded-[6px] bg-gradient-to-b from-[#F5F5F5] to-white px-5 py-6">
        <div className="mx-auto flex w-full max-w-[290px] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2 self-stretch">
            <span className="text-gray-80 text-center text-[16px] leading-6 font-semibold">
              상세정보
            </span>
            <div className="bg-gray-30 h-[0.5px] w-full" />
          </div>

          <div className="flex flex-col items-center gap-4 self-stretch">
            <div className="flex w-full items-center gap-[14px]">
              <div className="bg-green-light flex h-[86px] w-[86px] flex-shrink-0 items-center justify-center rounded-[10px]">
                <img
                  src={displayData.imageUrl || displayData.image}
                  alt={displayData.name}
                  className="aspect-square h-[60px] w-[60px] rounded-[6px] object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start gap-1">
                <span className="text-gray-80 w-full truncate text-[16px] leading-5 font-semibold">
                  {displayData.name}
                </span>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-gray-30 text-[12px] leading-4">
                    {displayData.leftDays < 0
                      ? `D+${Math.abs(displayData.leftDays)}`
                      : `D-${displayData.leftDays}`}
                  </span>
                  <span
                    className={`text-[12px] leading-4 font-semibold ${
                      displayData.leftDays < 0
                        ? "text-semantic-negative" // 지났을 때 빨간색
                        : displayData.leftDays > 3
                          ? "text-semantic-positive" // 넉넉할 때 초록색
                          : "text-semantic-negative" // 임박했을 때 빨간색
                    }`}
                  >
                    {displayData.leftDays < 0
                      ? "유통기한이 지났어요" // 0보다 작을 때 (D+)
                      : displayData.leftDays > 3
                        ? "유통기한이 넉넉해요" // 4일 이상 남았을 때
                        : "유통기한이 얼마 남지 않았어요"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[14px] self-stretch">
              <div className="bg-gray-0 shadow-search flex w-full items-center gap-2 rounded-[6px] px-3 py-3">
                {isEditing ? (
                  <input
                    type="text"
                    value={memo}
                    autoFocus
                    onChange={e => setMemo(e.target.value)}
                    onBlur={handleSaveMemo}
                    onKeyDown={e => e.key === "Enter" && handleSaveMemo()}
                    className="text-gray-80 border-gray-30 flex-1 border-b text-[14px] font-medium focus:outline-none"
                  />
                ) : (
                  <span
                    className={`flex-1 truncate text-[14px] leading-5 font-medium ${memo ? "text-gray-80" : "text-gray-30"}`}
                  >
                    {memo || "메모를 입력해주세요"}
                  </span>
                )}
                <button onClick={() => setIsEditing(true)}>
                  <img
                    src={memoIcon}
                    alt="수정"
                    className="aspect-square h-6 w-6"
                  />
                </button>
              </div>

              <div className="flex flex-col items-start gap-[6px] self-stretch">
                <div className="flex h-14 w-full items-center gap-[3px]">
                  <div
                    className="bg-gray-10 flex h-full flex-1 cursor-pointer flex-col items-center justify-center rounded-l-[6px] py-[5px]"
                    onClick={() => setOpenEditor("storage")}
                  >
                    <span className="text-gray-80 self-stretch truncate text-center text-[12px] leading-4 font-semibold">
                      보관장소
                    </span>
                    <StorageIcon className="text-gray-80 h-5 w-5" />
                  </div>
                  <div
                    className="bg-gray-10 flex h-full flex-1 cursor-pointer flex-col items-center justify-center py-[5px]"
                    onClick={() => setOpenEditor("expiry")}
                  >
                    <span className="text-gray-80 self-stretch truncate text-center text-[12px] leading-4 font-semibold">
                      유통기한
                    </span>
                    <span className="text-gray-80 text-[12px] leading-4">
                      {displayData.expirationDate || displayData.expiryDate}
                    </span>
                  </div>
                  <div
                    className="bg-gray-10 flex h-full flex-1 cursor-pointer flex-col items-center justify-center rounded-r-[6px] py-[5px]"
                    onClick={() => setOpenEditor("quantity")}
                  >
                    <span className="text-gray-80 self-stretch truncate text-center text-[12px] leading-4 font-semibold">
                      수량/단위
                    </span>
                    <span className="text-gray-80 text-[12px] leading-4">
                      {displayData.quantity}
                      {getKoreanUnit(displayData.unit)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 self-stretch">
                  <div className="flex items-end justify-end gap-1">
                    <span className="text-gray-30 text-[10px] leading-4 font-semibold">
                      등록일자{" "}
                      {displayData.createdAt
                        ? displayData.createdAt.replace(/-/g, ".")
                        : "정보 없음"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {displayTip && (
              <div className="mt-1 flex flex-col items-center gap-5 self-stretch">
                <div className="relative flex w-full items-end justify-center gap-5">
                  <img
                    src={character}
                    alt="tip character"
                    className="relative z-30 h-[56px] w-[64px] flex-shrink-0"
                  />
                  <div className="relative max-w-[178px] flex-1">
                    <img
                      src={bubbleTail}
                      alt=""
                      className="absolute bottom-[12px] left-[-14px] z-20 w-[27.2px]"
                    />
                    <div className="border-gray-10 bg-gray-0 relative z-10 flex min-h-[56px] w-full flex-col items-start gap-[3.2px] rounded-[4.8px] border-[0.8px] px-[17.6px] py-[10px]">
                      <span className="text-green self-stretch text-[8px] leading-[12px] font-semibold">
                        TIP
                      </span>
                      <p className="text-gray-80 self-stretch text-[10px] leading-[14px] font-medium break-words">
                        {displayTip}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 self-stretch">
                  <p className="text-gray-30 text-center text-[10px] leading-[14px] font-normal">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </p>
                </div>
              </div>
            )}

            <EditModal
              isOpen={openEditor === "storage"}
              onClose={() => setOpenEditor(null)}
              title="보관장소 수정"
            >
              <StorageEditor
                value={displayData.storage || displayData.category}
                onSave={async val => {
                  try {
                    await updateIngredientStorage(
                      Number(ingredient.id),
                      val as any,
                    );
                    await changeStorage(ingredient.id, val);
                    setDetailData((prev: any) => ({ ...prev, storage: val }));
                    setIsDirty(true);
                    setOpenEditor(null);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            </EditModal>

            <EditModal
              isOpen={openEditor === "expiry"}
              onClose={() => setOpenEditor(null)}
              title="유통기한 수정"
            >
              <ExpiryEditor
                value={displayData.expirationDate || displayData.expiryDate}
                onSave={async val => {
                  try {
                    await updateIngredientDate(Number(ingredient.id), val);
                    await changeExpiryDate(ingredient.id, val);
                    setDetailData((prev: any) => ({
                      ...prev,
                      expirationDate: val,
                    }));
                    setIsDirty(true);
                    setOpenEditor(null);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            </EditModal>

            <EditModal
              isOpen={openEditor === "quantity"}
              onClose={() => setOpenEditor(null)}
              title="수량 수정"
            >
              <QuantityEditor
                value={displayData.quantity}
                onSave={async val => {
                  try {
                    await updateIngredientQuantity(
                      Number(ingredient.id),
                      Number(val),
                    );
                    await changeQuantity(ingredient.id, Number(val));
                    setDetailData((prev: any) => ({
                      ...prev,
                      quantity: Number(val),
                    }));
                    setIsDirty(true);
                    setOpenEditor(null);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            </EditModal>
          </div>
        </div>
      </div>
    </div>
  );
}
