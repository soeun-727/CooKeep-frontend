import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GuestAddItem from "@/components/auth/guest/GuestAddItem";
import GuestDetails from "@/components/auth/guest/GuestDetails";
import GuestFridge from "@/components/auth/guest/GuestFridge";
import GuestLast from "@/components/auth/guest/GuestLast";
import GuestRecipe from "@/components/auth/guest/GuestRecipe";
import GuestRecipeIntro from "@/components/auth/guest/GuestRecipeIntro";
import GuestRecipeLevel from "@/components/auth/guest/GuestRecipeLevel";
import GuestRecipeLoading from "@/components/auth/guest/GuestRecipeLoading";
import TabBar from "@/components/fixed/TabBar";

export default function GuestPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isDimmed, setIsDimmed] = useState(false);

  const SHOW_TABBAR_INDICES = [0, 3];
  const TITLE_MAP: Record<number, string> = {
    1: "재료 등록",
    2: "재료 등록",
    5: "재료 선택",
    7: "오늘의 레시피",
  };

  const handleNext = () => {
    setIsDimmed(false);
    setIndex(prev => prev + 1);
  };

  const dimmedProps = {
    isDimmed,
    setIsDimmed,
  };

  const renderSlide = () => {
    switch (index) {
      case 0:
        return (
          <GuestFridge onNext={handleNext} mode="fridge" {...dimmedProps} />
        );
      case 1:
        return <GuestAddItem onNext={handleNext} {...dimmedProps} />;
      case 2:
        return <GuestDetails onNext={handleNext} {...dimmedProps} />;
      case 3:
        return <GuestRecipeIntro onNext={handleNext} {...dimmedProps} />;
      case 4:
        return (
          <GuestFridge onNext={handleNext} mode="recipe" {...dimmedProps} />
        );
      case 5:
        return <GuestRecipeLevel onNext={handleNext} {...dimmedProps} />;
      case 6:
        return <GuestRecipeLoading onNext={handleNext} {...dimmedProps} />;
      case 7:
        return <GuestRecipe onNext={handleNext} {...dimmedProps} />;
      case 8:
        return <GuestLast onNext={handleNext} {...dimmedProps} />;
      default:
        navigate("/");
        return null;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
      {isDimmed && (
        <div className="bg-black-overlay absolute inset-0 left-1/2 z-60 h-screen w-full max-w-[450px] -translate-x-1/2" />
      )}
      <div className="mt-10 w-full shrink-0" />
      <div className="no-scrollbar w-full flex-1 overflow-y-auto">
        <div className="w-full">{renderSlide()}</div>
      </div>
      {SHOW_TABBAR_INDICES.includes(index) && (
        <TabBar
          selectedTab={index >= 3 ? "레시피" : "냉장고"}
          onSelect={() => {}}
        />
      )}
      <button
        onClick={e => {
          e.stopPropagation();
          navigate("/");
        }}
        className="bg-gray-10 typo-caption absolute top-[3px] right-4 z-70 inline-flex items-center justify-center rounded-full px-4 py-2 text-gray-50"
      >
        메인으로 돌아가기
      </button>
      {TITLE_MAP[index] && (
        <div className="absolute top-0 left-1/2 z-50 flex h-10 -translate-x-1/2 items-center">
          <span className="text-gray-80 typo-l-strong whitespace-nowrap">
            {TITLE_MAP[index]}
          </span>
        </div>
      )}
    </div>
  );
}
