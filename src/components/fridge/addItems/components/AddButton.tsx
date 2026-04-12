// src/components/fridge/FloatingAddButton.tsx
import { useNavigate } from "react-router-dom";
import { useIngredientStore } from "../../../../stores/useIngredientStore";
import plusIcon from "../../../../assets/fridge/items/plus.svg";
import inactivePlusIcon from "../../../../assets/fridge/items/plusInactive.svg";
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
      className="
        absolute
        bottom-[calc(84px+env(safe-area-inset-bottom))] 
        right-[31px]
        z-40
        w-12 h-12 bg-black
        rounded-full flex items-center justify-center
        active:scale-95 
        active:bg-stone-300
        transition-all
        shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
      "
    >
      <img
        src={isSelected ? inactivePlusIcon : plusIcon}
        alt="add"
        className="w-6 h-6"
      />
    </button>
  );
}
