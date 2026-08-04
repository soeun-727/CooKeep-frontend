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

export default function GuestPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(prev => prev + 1);
  };

  const renderSlide = () => {
    switch (index) {
      case 0:
        return <GuestFridge onNext={handleNext} mode="fridge" />;
      case 1:
        return <GuestAddItem onNext={handleNext} />;
      case 2:
        return <GuestDetails onNext={handleNext} />;
      case 3:
        return <GuestRecipeIntro onNext={handleNext} />;
      case 4:
        return <GuestFridge onNext={handleNext} mode="recipe" />;
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
      <div className="mt-[62px] w-full shrink-0" />
      <div className="no-scrollbar w-full flex-1 overflow-y-auto">
        <div className="flex w-full justify-center">{renderSlide()}</div>
      </div>

      <button
        onClick={e => {
          e.stopPropagation();
          navigate("/");
        }}
        className="bg-gray-10/80 absolute top-5 right-4 z-[200] inline-flex items-center justify-center gap-[8px] rounded-full px-[22px] py-2 text-[14px] font-medium text-gray-50"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
