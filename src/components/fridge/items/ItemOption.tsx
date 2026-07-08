import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";
import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { useRewardStore } from "@/stores/useRewardStore";

import EatenIcon from "@/assets/fridge/eaten.svg?react";
import ThrownIcon from "@/assets/fridge/thrown.svg?react";

import AlertModal from "@/components/ui/AlertModal";
import DoublecheckModal from "@/components/ui/DoublecheckModal";

export default function ItemOption() {
  const navigate = useNavigate();
  const { selectedIds, ingredients, deleteSelected } = useIngredientStore();
  const { setSelectedIngredients } = useRecipeFlowStore();
  const enqueue = useRewardStore(s => s.enqueue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [modalType, setModalType] = useState<"eaten" | "thrown">("eaten");
  const [rewardInfo, setRewardInfo] = useState<{
    points: number;
    granted: boolean;
  } | null>(null);

  if (selectedIds.length === 0 && !isModalOpen && !isAlertOpen) {
    return null;
  }
  const firstItemName =
    ingredients.find(item => item.id === selectedIds[0])?.name ?? "재료";

  const modalTitle =
    selectedIds.length === 1
      ? firstItemName
      : `${firstItemName} 외 ${selectedIds.length - 1}개`;

  const handleOpenModal = (type: "eaten" | "thrown") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleRecipeRecommend = () => {
    const selectedIngredients = ingredients.filter(item =>
      selectedIds.includes(item.id),
    );
    setSelectedIngredients(selectedIngredients);
    navigate("/recipe/confirm");
  };

  const handleConfirm = async () => {
    const type = modalType;
    const result = await deleteSelected(type);
    setIsModalOpen(false);
    if (type === "eaten") {
      // 주간 목표 달성 체크 추가
      if (result?.weeklyGoalAchieved) {
        enqueue("WEEKLY"); // ← showWeeklyGoalModal() 대신 이걸 씀
      }

      if (result && result.reward.granted) {
        setRewardInfo({
          points: result.reward.points,
          granted: result.reward.granted,
        });
      } else {
        setRewardInfo(null);
      }
      setTimeout(() => setIsAlertOpen(true), 100);
    }
  };

  const menuTitle = [
    {
      text: "다 먹었어요",
      icon: EatenIcon,
      action: () => handleOpenModal("eaten"),
    },
    {
      text: "버렸어요",
      icon: ThrownIcon,
      action: () => handleOpenModal("thrown"),
    },
    {
      text: "레시피 추천받기",
      icon: null,
      action: () => handleRecipeRecommend(),
    },
  ];

  return (
    <>
      {/* 하단 옵션 바 */}
      <div className="fixed bottom-[calc(62px+env(safe-area-inset-bottom))] left-1/2 z-40 w-full max-w-[450px] -translate-x-1/2 px-4 pt-8 pb-3">
        <div className="flex gap-1">
          {menuTitle.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={item.action}
                className="bg-gray-0 hover:bg-green-light group hover:border-green w-full rounded-full px-3 py-2 shadow-[0_4px_16px_0_rgba(17,17,17,0.1)] hover:border"
              >
                <div className="flex items-center justify-center gap-[2px]">
                  <span className="typo-label whitespace-nowrap">
                    {item.text}
                  </span>

                  {Icon && (
                    <Icon className="group-hover:text-green text-gray-30 h-5 w-5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 확인 모달 */}
      <DoublecheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
        variant="green"
        description={
          modalType === "eaten"
            ? "섭취완료로 변경하시겠습니까?"
            : "재료를 삭제하시겠습니까?"
        }
      />

      {/* 알림 */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => {
          setIsAlertOpen(false);
          setRewardInfo(null);
        }}
        rewardPoints={rewardInfo?.points}
      />
    </>
  );
}
