import { useLocation } from "react-router-dom";
import { useIngredientStore } from "../../stores/useIngredientStore";

import MainHeader from "../../components/fixed/MainHeader";
import AddButton from "../../components/fridge/addItems/components/AddButton";
import FridgeTab from "../../components/fridge/main/FridgeTab";

export default function FridgePage() {
  const location = useLocation();
  const viewCategory = useIngredientStore((state) => state.viewCategory);

  const isAllViewMode = location.pathname.includes("fridge") && !!viewCategory;

  return (
    <div className="flex flex-col h-full">
      <MainHeader isAllView={isAllViewMode} />

      <div className="flex-1">
        <FridgeTab />
        <AddButton />
      </div>
    </div>
  );
}
