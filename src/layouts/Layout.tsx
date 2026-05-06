// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import TabBar from "../components/fixed/TabBar";
import { useState, useEffect } from "react";
import { useIngredientStore } from "../stores/useIngredientStore";
import { useRecipeFlowStore } from "../stores/useRecipeFlowStore";

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("냉장고");

  const isRecipe = location.pathname.startsWith("/recipe");
  const isFridgeAdd = location.pathname.startsWith("/fridge/add");
  const hideTabBar =
    isFridgeAdd ||
    (isRecipe &&
      (location.pathname.startsWith("/recipe/select") ||
        location.pathname.startsWith("/recipe/confirm") ||
        location.pathname.startsWith("/recipe/loading")));

  const showTabBar = !hideTabBar;
  useEffect(() => {
    if (!location.pathname.startsWith("/recipe")) {
      useIngredientStore.getState().clearSelection();
      useRecipeFlowStore.getState().reset();
    }
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("fridge")) setActiveTab("냉장고");
    else if (path.includes("recipe")) setActiveTab("레시피");
    else if (path.includes("cookeeps")) setActiveTab("쿠킵스");
    else if (path.includes("mycookeep")) setActiveTab("MY쿠킵");
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA] overflow-hidden">
      <main
        className={` flex-1 flex flex-col overflow-y-auto no-scrollbar
          ${showTabBar ? "pb-[56px]" : ""}
        `}
      >
        <Outlet />
      </main>

      {showTabBar && (
        <TabBar
          selectedTab={activeTab}
          onSelect={(name) => setActiveTab(name)}
        />
      )}
    </div>
  );
}
