import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  type IngredientDetailResponse,
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
import MemoIcon from "@/assets/fridge/memo.svg?react";
import EditIcon from "@/assets/icons/rename.svg?react";

import EditModal from "@/components/ui/EditModal";
import LoadingScreen from "@/components/ui/LoadingScreen";

import { getKoreanUnit } from "@/utils/mapping";

import ExpiryEditor from "../addItems/components/edit/ExpiryEditor";
import MemoEditor from "../addItems/components/edit/MemoEditor";
import QuantityEditor from "../addItems/components/edit/QuantityEditor";
import StorageEditor from "../addItems/components/edit/StorageEditor";

interface IngredientDetailModalProps {
  ingredient: Ingredient;
  onClose: () => void;
  onUpdate: () => void;
}

type EditorType = "storage" | "expiry" | "quantity" | "memo";
type EditorValue = string | number;
type DetailData = Partial<
  Omit<IngredientDetailResponse, "storage" | "unit" | "createdAt">
> & {
  storage?: string;
  unit?: string;
  createdAt?: string | number;
};

export default function IngredientDetailModal({
  ingredient,
  onClose,
  onUpdate,
}: IngredientDetailModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [openEditor, setOpenEditor] = useState<null | EditorType>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [memo, setMemo] = useState("");

  const displayData = { ...ingredient, ...detailData };

  const { changeStorage, changeExpiryDate, changeQuantity, changeMemo } =
    useIngredientStore();

  const handleModalClose = useCallback(() => {
    if (isDirty) onUpdate();
    onClose();
  }, [isDirty, onClose, onUpdate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getIngredientDetail(Number(ingredient.id));
        const data = response.data?.data || response.data;
        if (data) {
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

  const handleSaveMemo = async (value: string) => {
    try {
      await updateIngredientMemo(Number(ingredient.id), value);
      await changeMemo(ingredient.id, value);

      setMemo(value);
      setDetailData(prev => ({
        ...(prev ?? displayData),
        memo: value,
      }));

      setIsDirty(true);
    } catch (error) {
      console.error("메모 저장 실패:", error);
    }
  };

  const handleUpdateField = async (type: EditorType, value: EditorValue) => {
    try {
      const id = Number(ingredient.id);
      if (type === "storage") {
        await updateIngredientStorage(id, String(value));
        await changeStorage(ingredient.id, String(value));
        setDetailData(prev => ({
          ...(prev ?? displayData),
          storage: String(value),
        }));
      } else if (type === "expiry") {
        await updateIngredientDate(id, String(value));
        await changeExpiryDate(ingredient.id, String(value));
        setDetailData(prev => ({
          ...(prev ?? displayData),
          expirationDate: String(value),
        }));
      } else if (type === "quantity") {
        await updateIngredientQuantity(id, Number(value));
        await changeQuantity(ingredient.id, Number(value));
        setDetailData(prev => ({
          ...(prev ?? displayData),
          quantity: Number(value),
        }));
      }
      setIsDirty(true);
      setOpenEditor(null);
    } catch (e) {
      console.error(`${type} 수정 실패:`, e);
    }
  };

  const displayTip = displayData.aiTip || ingredient.tip;
  const rawDate = displayData.expirationDate || displayData.expiryDate;

  const expireDate = useMemo(() => {
    if (!rawDate) return "정보 없음";
    const dateString = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;
    return dateString.replace(/-/g, ".");
  }, [rawDate]);

  if (isLoading) return <LoadingScreen />;

  const leftDays = displayData.leftDays ?? ingredient.dDay;

  const infoRows: {
    label: string;
    value: string | number;
    type: EditorType;
  }[] = [
    {
      label: "보관장소",
      value: displayData.storage || "정보 없음",
      type: "storage",
    },
    {
      label: "수량",
      value: `${displayData.quantity}${getKoreanUnit(displayData.unit)}`,
      type: "quantity",
    },
    { label: "유통기한", value: expireDate || "정보 없음", type: "expiry" },
  ];

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="bg-gray-80/50 absolute inset-0 mx-auto max-w-[450px]"
        onClick={handleModalClose}
      />

      <div className="bg-gray-0 rounded-L z-50 w-[300px] p-6 shadow-xl">
        <div className="mx-auto flex w-full max-w-[290px] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2 self-stretch">
            <span className="text-gray-80 text-center text-[16px] leading-6 font-semibold">
              상세정보
            </span>
            <div className="bg-gray-30 h-[0.5px] w-full" />
          </div>

          <div className="flex w-full flex-col items-center gap-4 self-stretch">
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
                <div className="flex items-center gap-2">
                  <span className="text-gray-80 typo-h3">
                    {leftDays < 0
                      ? `D+${Math.abs(leftDays)}`
                      : `D-${leftDays}`}
                  </span>
                  <span
                    className={`typo-caption rounded-S px-3 py-[2px] ${
                      leftDays < 0
                        ? "text-semantic-negative bg-[#FFEAEA]"
                        : leftDays > 3
                          ? "text-semantic-positive bg-green-light"
                          : "text-semantic-negative bg-[#FFEAEA]"
                    }`}
                  >
                    {leftDays < 0
                      ? "유통기한 지남"
                      : leftDays > 3
                        ? "여유있음"
                        : "유통기한 임박"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col">
              {infoRows.map((row, index) => (
                <div key={row.type} className="w-full">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-gray-80 typo-caption">
                      {row.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="typo-caption-strong text-gray-80">
                        {row.value}
                      </span>
                      <button
                        className="cursor-pointer"
                        onClick={() => setOpenEditor(row.type)}
                      >
                        <EditIcon className="text-gray-30 h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {index < infoRows.length - 1 && (
                    <div className="bg-gray-10 h-[0.5px] w-full" />
                  )}
                </div>
              ))}

              {displayTip && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="rounded-S flex w-full items-end justify-center gap-6 bg-[#F4F9F4] px-3 py-4">
                    <div className="flex flex-1 flex-col gap-[2px]">
                      <p className="typo-caption-strong text-green-deep text-[11px]">
                        보관 TIP
                      </p>
                      <p className="typo-caption text-gray-80 text-[11px] leading-relaxed">
                        {displayTip}
                      </p>
                    </div>
                    <img
                      src={character}
                      alt="tip character"
                      className="h-[56px] w-[64px] flex-shrink-0"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-gray-30 text-center text-[10px] leading-[14px] font-normal">
                      AI가 제공하는 정보에는 실수가 있을 수 있습니다
                      <br />
                      관련 정보를 확인 후 활용해주세요
                    </p>
                  </div>
                </div>
              )}
              <div
                className="border-gray-10 mt-4 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[6px] border p-3"
                onClick={() => setOpenEditor("memo")}
              >
                <span
                  className={`typo-m flex-1 truncate ${
                    memo ? "text-gray-80" : "text-gray-30"
                  }`}
                >
                  {memo || "메모를 입력해주세요"}
                </span>

                <MemoIcon className="text-gray-30 h-6 w-6 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={openEditor !== null}
        onClose={() => setOpenEditor(null)}
        title={
          openEditor === "storage"
            ? "보관 장소를 선택해주세요"
            : openEditor === "expiry"
              ? "유통기한을 선택해주세요"
              : openEditor === "quantity"
                ? "수량을 선택해주세요"
                : "메모를 자유롭게 남겨보세요"
        }
      >
        {openEditor === "storage" && (
          <StorageEditor
            value={displayData.storage || displayData.category}
            onSave={val => handleUpdateField("storage", val)}
          />
        )}
        {openEditor === "expiry" && (
          <ExpiryEditor
            value={displayData.expirationDate || displayData.expiryDate}
            onSave={val => handleUpdateField("expiry", val)}
          />
        )}
        {openEditor === "quantity" && (
          <QuantityEditor
            value={displayData.quantity}
            onSave={val => handleUpdateField("quantity", val)}
          />
        )}
        {openEditor === "memo" && (
          <MemoEditor
            value={memo}
            onSave={async value => {
              setMemo(value);
              await handleSaveMemo(value);
              setOpenEditor(null);
            }}
          />
        )}
      </EditModal>
    </div>,
    document.body,
  );
}
