import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import CookeepsIcon from "@/assets/fixed/cookeepsTab.svg?react";
import FridgeIcon from "@/assets/fixed/fridgeTab.svg?react";
import MycookeepIcon from "@/assets/fixed/mycookeepTab.svg?react";
import RecipeIcon from "@/assets/fixed/recipeTab.svg?react";

import Tab from "./Tab";

interface TabBarProps {
  selectedTab: string;
  onSelect: (tabName: string) => void;
}

const TABS = [
  { title: "냉장고", Icon: FridgeIcon },
  { title: "레시피", Icon: RecipeIcon },
  { title: "쿠킵스", Icon: CookeepsIcon },
  { title: "MY쿠킵", Icon: MycookeepIcon },
] as const;

const ROUTE_MAP: Record<string, string> = {
  냉장고: "/fridge",
  레시피: "/recipe",
  쿠킵스: "/cookeeps",
};

export default function TabBar({ selectedTab, onSelect }: TabBarProps) {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (name: string) => {
      onSelect(name);
      if (name === "MY쿠킵") {
        navigate("/mycookeep", { state: { fromTab: true } });
      } else {
        navigate(ROUTE_MAP[name]);
      }
    },
    [navigate, onSelect],
  );

  return (
    <nav className="bg-gray-0 border-gray-0 pb-sab fixed right-0 bottom-0 left-0 z-[50] mx-auto w-full max-w-[450px] border-t">
      <div className="flex h-14 items-center justify-around">
        {TABS.map(tab => {
          const isSelected = selectedTab === tab.title;
          const iconColor = isSelected
            ? "var(--color-green)"
            : "var(--color-gray-30)";

          return (
            <Tab
              key={tab.title}
              title={tab.title}
              isSelected={isSelected}
              onClick={handleSelect}
              Icon={tab.Icon}
              iconColor={iconColor}
            />
          );
        })}
      </div>
    </nav>
  );
}
