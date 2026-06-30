import { useCallback, useEffect, useState } from "react";
import {
  useIngredientStore,
  type Ingredient,
} from "@/stores/useIngredientStore";
import character from "@/assets/character/tip_char.svg";
import memoIcon from "@/assets/fridge/edit_memo.svg";
import fridgeIcon from "@/assets/fridge/fridge.svg";
import freezerIcon from "@/assets/fridge/freezer.svg";
import pantryIcon from "@/assets/fridge/pantry.svg";
import bubbleTail from "@/assets/fridge/bubble_tail_left.svg";
import EditModal from "@/components/ui/EditModal";
import StorageEditor from "../addItems/components/edit/StorageEditor";
import ExpiryEditor from "../addItems/components/edit/ExpiryEditor";
import QuantityEditor from "../addItems/components/edit/QuantityEditor";
import {
  getIngredientDetail,
  updateIngredientStorage,
  updateIngredientDate,
  updateIngredientQuantity,
  updateIngredientMemo,
} from "@/api/ingredient";
import { getKoreanUnit } from "@/utils/mapping";

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

  const storageIconMap: Record<string, string> = {
    냉장: fridgeIcon,
    냉동: freezerIcon,
    상온: pantryIcon,
    FRIDGE: fridgeIcon,
    FREEZER: freezerIcon,
    PANTRY: pantryIcon,
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

  if (isLoading)
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-80">
        <div className="bg-gray-0 p-6 rounded-lg text-sm">정보 로딩 중...</div>
      </div>
    );

  const displayTip = displayData.aiTip || ingredient.tip;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-80" onClick={handleModalClose} />
      <div className="relative z-10 w-full max-w-[330px] max-h-[90vh] overflow-y-auto no-scrollbar rounded-[6px] px-5 py-6 bg-gradient-to-b from-[#F5F5F5] to-white shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)] animate-fadeIn">
        <div className="flex w-full max-w-[290px] flex-col items-center gap-5 mx-auto">
          <div className="flex flex-col items-center gap-2 self-stretch">
            <span className="text-[16px] font-semibold leading-6 text-gray-80 text-center">
              상세정보
            </span>
            <div className="w-full h-[0.5px] bg-gray-30" />
          </div>

          <div className="flex flex-col items-center gap-4 self-stretch">
            <div className="flex w-full items-center gap-[14px]">
              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[10px] bg-green-light flex-shrink-0">
                <img
                  src={displayData.imageUrl || displayData.image}
                  alt={displayData.name}
                  className="aspect-square h-[60px] w-[60px] rounded-[6px] object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start gap-1">
                <span className="w-full truncate text-[16px] font-semibold leading-5 text-gray-80">
                  {displayData.name}
                </span>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[12px] text-gray-30 leading-4">
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
              <div className="flex w-full items-center rounded-[6px] bg-gray-0 px-3 py-3 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={memo}
                    autoFocus
                    onChange={(e) => setMemo(e.target.value)}
                    onBlur={handleSaveMemo}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveMemo()}
                    className="flex-1 text-[14px] font-medium text-gray-80 border-b border-gray-30 focus:outline-none"
                  />
                ) : (
                  <span
                    className={`flex-1 truncate text-[14px] font-medium leading-5 ${memo ? "text-gray-80" : "text-gray-30"}`}
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
                    className="flex-1 h-full flex flex-col justify-center items-center bg-gray-10 py-[5px] rounded-l-[6px] cursor-pointer"
                    onClick={() => setOpenEditor("storage")}
                  >
                    <span className="text-[12px] font-semibold text-gray-80 leading-4 truncate self-stretch text-center">
                      보관장소
                    </span>
                    <img
                      src={
                        storageIconMap[
                          displayData.storage || displayData.category
                        ]
                      }
                      className="h-5 w-5 brightness-0"
                      alt="icon"
                    />
                  </div>
                  <div
                    className="flex-1 h-full flex flex-col justify-center items-center bg-gray-10 py-[5px] cursor-pointer"
                    onClick={() => setOpenEditor("expiry")}
                  >
                    <span className="text-[12px] font-semibold text-gray-80 leading-4 truncate self-stretch text-center">
                      유통기한
                    </span>
                    <span className="text-[12px] leading-4 text-gray-80">
                      {displayData.expirationDate || displayData.expiryDate}
                    </span>
                  </div>
                  <div
                    className="flex-1 h-full flex flex-col justify-center items-center bg-gray-10 py-[5px] rounded-r-[6px] cursor-pointer"
                    onClick={() => setOpenEditor("quantity")}
                  >
                    <span className="text-[12px] font-semibold text-gray-80 leading-4 truncate self-stretch text-center">
                      수량/단위
                    </span>
                    <span className="text-[12px] leading-4 text-gray-80">
                      {displayData.quantity}
                      {getKoreanUnit(displayData.unit)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 self-stretch">
                  <div className="flex justify-end items-end gap-1">
                    <span className="text-[10px] font-semibold text-gray-30 leading-4">
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
                    <div className="relative z-10 flex w-full flex-col items-start gap-[3.2px] rounded-[4.8px] border-[0.8px] border-gray-10 bg-gray-0 px-[17.6px] py-[10px] min-h-[56px] shadow-sm">
                      <span className="text-[8px] font-semibold leading-[12px] text-green self-stretch">
                        TIP
                      </span>
                      <p className="text-[10px] font-medium leading-[14px] text-gray-80 self-stretch break-words">
                        {displayTip}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 self-stretch">
                  <p className="text-center text-[10px] font-normal leading-[14px] text-gray-30">
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
                onSave={async (val) => {
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
                onSave={async (val) => {
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
                onSave={async (val) => {
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
