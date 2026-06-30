import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addIngredients } from "@/api/ingredient";
import { useAddIngredientStore } from "@/stores/useAddIngredientStore";
import { useRewardStore } from "@/stores/useRewardStore";

import Button from "@/components/ui/Button";

import DetailedItem from "./DetailedItem";

export default function Details() {
  const navigate = useNavigate();
  const { selectedItems, resetSelected } = useAddIngredientStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (selectedItems.length === 0 || isLoading) return;
    setIsLoading(true);

    try {
      // 1. 서버 명세(Request Body)에 맞춰 전체 배열 가공
      const payload = {
        ingredients: selectedItems.map(item => ({
          type: item.type,
          referenceId: Number(item.id),
          quantity: item.quantity,
          unit: item.unit,
          storage: item.storageType,
          // UI용 포맷(YYYY.MM.DD)을 서버용(YYYY-MM-DD)으로 변환
          expirationDate: item.expiration.replace(/\./g, "-"),
          memo: item.memo || "",
        })),
      };

      // 2. 단일 POST 요청으로 일괄 등록
      // (인터페이스에 따라 addIngredients({ ingredients: payload }) 또는 addIngredients(payload)로 호출)
      // 1. response 받기
      const response = await addIngredients(payload);

      // 2. 여기 추가
      if (response.data?.data?.ingredientRewardGranted) {
        useRewardStore.getState().enqueue("ONBOARDING_INGREDIENT");
      }

      // 3. 성공 시 처리
      resetSelected();
      // 성공 피드백을 주며 이동 (선택사항)
      navigate("/fridge", { state: { registered: true } });
    } catch (error: any) {
      console.error("등록 실패 상세 로그:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "재료 등록 중 오류가 발생했습니다.";
      alert(`등록 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-background pt-1">
      <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 w-full px-4">
        <div className="flex flex-col items-center gap-[10px] pb-15">
          {selectedItems.length > 0 ? (
            selectedItems.map(item => <DetailedItem key={item.id} {...item} />)
          ) : (
            <div className="mt-20 flex flex-col items-center gap-4">
              <p className="text-gray-50 typo-caption text-center">
                선택된 재료가 없습니다.
              </p>
              <Button size="S" variant="black" onClick={() => navigate(-1)}>
                재료 선택하러 가기
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="z-50 flex w-full shrink-0 flex-col items-center px-4 pt-2 pb-[23px]">
          <div className="w-full max-w-[345px] pb-[11px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <Button
              size="L"
              variant="black"
              onClick={handleComplete}
              disabled={isLoading}
              className="!w-full"
            >
              등록 완료
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
