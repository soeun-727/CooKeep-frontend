import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getIngredientPreview } from "@/api/ingredient";
import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

import Button from "@/components/ui/Button";

import RecentlyAdded from "./components/RecentlyAdded";
import Selected from "./components/Selected";

export default function AddItemFooter() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedItems, resetSelected, setDetailedItemsFromPreview } =
    useAddIngredientStore();

  const handleSubmit = async () => {
    if (selectedItems.length === 0 || isLoading) return;

    try {
      setIsLoading(true);

      const ingredientsPayload = selectedItems.map(item => ({
        type: item.type,
        referenceId: Number(item.id),
      }));

      const response = await getIngredientPreview(ingredientsPayload);

      if (response.data && response.data.data) {
        const previewIngredients = response.data.data.ingredients;

        const detailedItems = previewIngredients.map(ing => {
          const originalItem = selectedItems.find(
            s => Number(s.id) === ing.referenceId,
          );

          return {
            id: ing.referenceId,
            referenceId: ing.referenceId,
            name: ing.name,
            image: ing.imageUrl,
            type: ing.type,
            quantity: ing.defaultQuantity,
            unit: ing.defaultUnit,
            storageType: ing.defaultStorage,
            expiration: ing.defaultExpirationDate,
            memo: "",
            categoryId: originalItem?.categoryId ?? 13,
          };
        });

        setDetailedItemsFromPreview(detailedItems);
        navigate("/fridge/add-detail");
      }
    } catch (error) {
      console.error("재료 프리뷰 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-4">
      <section>
        <div className="-mb-1">
          <RecentlyAdded />
        </div>
        <div className="relative z-20">
          <Selected />
        </div>
      </section>

      <section className="flex w-full gap-2">
        <div className="flex-1">
          <Button
            size="S"
            variant="black"
            onClick={resetSelected}
            className="!w-full"
            disabled={isLoading}
          >
            선택 초기화
          </Button>
        </div>
        <div className="flex-1">
          <Button
            size="S"
            variant="green"
            onClick={handleSubmit}
            disabled={selectedItems.length === 0 || isLoading}
            className="!w-full"
          >
            재료 추가하기
          </Button>
        </div>
      </section>
    </div>
  );
}
