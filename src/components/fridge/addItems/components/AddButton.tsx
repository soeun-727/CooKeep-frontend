import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";

import PlusIcon from "@/assets/fridge/items/plus.svg?react";
import InactivePlusIcon from "@/assets/fridge/items/plusInactive.svg?react";

export default function AddButton() {
  const navigate = useNavigate();
  const { selectedIds } = useIngredientStore();
  const [isSelected, setIsSelected] = useState(false);

  if (selectedIds.length > 0) return null;

  return (
    <button
      onClick={() => navigate("/fridge/add")}
      onTouchStart={() => setIsSelected(true)}
      onTouchEnd={() => setIsSelected(false)}
      className="active:bg-gray-30 shadow-add-button absolute right-[31px] bottom-[calc(84px+env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black active:scale-95"
    >
      {isSelected ? (
        <InactivePlusIcon aria-label="add" role="img" className="h-6 w-6" />
      ) : (
        <PlusIcon aria-label="add" role="img" className="h-6 w-6" />
      )}
    </button>
  );
}
