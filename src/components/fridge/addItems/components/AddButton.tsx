// src/components/fridge/FloatingAddButton.tsx
import { useNavigate } from "react-router-dom";
import { useIngredientStore } from "@stores/useIngredientStore";
import plusIcon from "@assets/fridge/items/plus.svg";
import inactivePlusIcon from "@assets/fridge/items/plusInactive.svg";
import { useState } from "react";

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
      className="absolute right-[31px] bottom-[calc(84px+env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)] transition-all active:scale-95 active:bg-stone-300"
    >
      <img
        src={isSelected ? inactivePlusIcon : plusIcon}
        alt="add"
        className="h-6 w-6"
      />
    </button>
  );
}
