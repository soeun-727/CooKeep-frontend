import { useLocation } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";

import MainHeader from "@/components/fixed/MainHeader";
import AddButton from "@/components/fridge/addItems/components/AddButton";
import FridgeTab from "@/components/fridge/main/FridgeTab";

export default function FridgePage() {
  const location = useLocation();
  const viewCategory = useIngredientStore(state => state.viewCategory);

  const isAllViewMode = location.pathname.includes("fridge") && !!viewCategory;

  return (
    <div className="flex h-full flex-col">
      <MainHeader isAllView={isAllViewMode} />

      <div className="flex flex-1 flex-col">
        <FridgeTab />
        <AddButton />
      </div>
    </div>
  );
}
