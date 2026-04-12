// src/pages/auth/GuestPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestFridge from "../../components/auth/guest/GuestFridge";
import GuestAddItem from "../../components/auth/guest/GuestAddItem";
import GuestDetails from "../../components/auth/guest/GuestDetails";
import GuestRecipeIntro from "../../components/auth/guest/GuestRecipeIntro";
import GuestRecipeLevel from "../../components/auth/guest/GuestRecipeLevel";
import GuestRecipeLoading from "../../components/auth/guest/GuestRecipeLoading";
import GuestRecipe from "../../components/auth/guest/GuestRecipe";

export default function GuestPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // 다음 단계로 넘기는 공통 함수
  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  // 0: 냉장고 가이드, 1: 재료 추가 가이드, 2: ... 순서대로 배치
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
      default:
        navigate("/");
        return null;
    }
  };

  return (
    <div className="relative w-full h-dvh bg-[#FAFAFA] overflow-hidden">
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full flex justify-center mt-[62px]">
          {renderSlide()}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className="absolute top-5 right-4 z-50
                   inline-flex py-2 px-[22px]
                   items-center justify-center gap-[8px]
                   rounded-full bg-[rgba(235,235,235,0.8)]
                   text-[#7D7D7D] text-[14px] font-medium"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
