// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "../components/fixed/MainHeader";
import TabBar from "../components/fixed/TabBar";
import { useState, useEffect } from "react";
import { useIngredientStore } from "../stores/useIngredientStore";
import { useRecipeFlowStore } from "../stores/useRecipeFlowStore";

export default function Layout() {
  const location = useLocation();
  const { viewCategory } = useIngredientStore();
  const [activeTab, setActiveTab] = useState("냉장고");

  const isRecipe = location.pathname.startsWith("/recipe");
  const isCookeeps = location.pathname.startsWith("/cookeeps");
  const isMyCookeep = location.pathname.startsWith("/mycookeep");
  const showHeader = !isRecipe && !isCookeeps && !isMyCookeep;
  const isFridgeAdd = location.pathname.startsWith("/fridge/add");
  const hideTabBar =
    isFridgeAdd ||
    (isRecipe &&
      (location.pathname.startsWith("/recipe/select") ||
        location.pathname.startsWith("/recipe/confirm") ||
        location.pathname.startsWith("/recipe/loading")));

  const showTabBar = !hideTabBar;
  const isAllViewMode = location.pathname.includes("fridge") && !!viewCategory;
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
    <div className="flex flex-col h-[100dvh] w-full bg-[#FAFAFA] overflow-hidden">
      {showHeader && <MainHeader isAllView={isAllViewMode} />}
      <main
        className={` flex-1 flex flex-col overflow-y-auto no-scrollbar
          ${showTabBar ? "pb-[56px]" : ""}
          min-h-[100dvh]
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
