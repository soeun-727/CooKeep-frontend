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

export default function TabBar({ selectedTab, onSelect }: TabBarProps) {
  const navigate = useNavigate();

  const handleSelect = (name: string) => {
    onSelect(name);

    if (name === "냉장고") navigate("/fridge");
    else if (name === "레시피") navigate("/recipe");
    else if (name === "쿠킵스") navigate("/cookeeps");
    else if (name === "MY쿠킵") {
      navigate("/mycookeep", {
        state: { fromTab: true },
      });
    }
  };

  const tabs = [
    { title: "냉장고", Icon: FridgeIcon },
    { title: "레시피", Icon: RecipeIcon },
    { title: "쿠킵스", Icon: CookeepsIcon },
    { title: "MY쿠킵", Icon: MycookeepIcon },
  ];

  return (
    <nav className="bg-gray-0 border-gray-0 pb-sab fixed right-0 bottom-0 left-0 z-[150] mx-auto w-full max-w-[450px] border-t">
      <div className="flex h-14 items-center justify-around">
        {tabs.map(tab => {
          const isSelected = selectedTab === tab.title;

          // 약속된 헥사코드를 조건에 따라 주입합니다.
          const iconColor = isSelected
            ? "var(--color-green)"
            : "var(--color-gray-30)";

          return (
            <Tab
              key={tab.title}
              title={tab.title}
              isSelected={isSelected}
              onClick={() => handleSelect(tab.title)}
              Icon={tab.Icon}
              iconColor={iconColor}
            />
          );
        })}
      </div>
    </nav>
  );
}
