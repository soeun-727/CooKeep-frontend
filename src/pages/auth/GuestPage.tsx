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

  const handleNext = () => {
    setIndex(prev => prev + 1);
  };

  const renderSlide = () => {
    switch (index) {
      case 0:
        return (
          <GuestFridge
            onNext={handleNext}
            mode="fridge"
            isDimmed={isDimmed}
            setIsDimmed={setIsDimmed}
          />
        );
      case 1:
        return <GuestAddItem onNext={handleNext} />;
      case 2:
        return <GuestDetails onNext={handleNext} />;
      case 3:
        return <GuestRecipeIntro onNext={handleNext} />;
      case 4:
        return (
          <GuestFridge
            onNext={handleNext}
            mode="recipe"
            isDimmed={isDimmed}
            setIsDimmed={setIsDimmed}
          />
        );
      case 5:
        return <GuestRecipeLevel onNext={handleNext} />;
      case 6:
        return <GuestRecipeLoading onNext={handleNext} />;
      case 7:
        return <GuestRecipe onNext={handleNext} />;
      case 8:
        return <GuestLast onNext={handleNext} />;
      default:
        navigate("/");
        return null;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
      {isDimmed && (
        <div className="bg-black-overlay absolute inset-0 left-1/2 z-90 h-screen w-full max-w-[450px] -translate-x-1/2" />
      )}
      <div className="mt-10 w-full shrink-0" />
      <div className="no-scrollbar w-full flex-1 overflow-y-auto">
        <div className="w-full">{renderSlide()}</div>
      </div>
      <TabBar selectedTab="냉장고" onSelect={() => {}} />

      <button
        onClick={e => {
          e.stopPropagation();
          navigate("/");
        }}
        className="bg-gray-10 typo-caption absolute top-[3px] right-4 z-[200] inline-flex items-center justify-center rounded-full px-4 py-2 text-gray-50"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
