// src/components/myCookeep/record/AddRecordButton.tsx
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import plusIcon from "../../../assets/fridge/items/plus.svg";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";

export default function AddRecordButton() {
  const navigate = useNavigate();
  //   const [pressed, setPressed] = useState(false);
  const resetRecord = useCookeepRecordStore((s) => s.resetRecord);

  return (
    <button
      onClick={() => {
        resetRecord();
        navigate("/mycookeep/record/select");
      }}
      //   onTouchStart={() => setPressed(true)}
      //   onTouchEnd={() => setPressed(false)}
      className="
        z-40
        w-12 h-12 bg-black
        rounded-full flex items-center justify-center
        active:scale-95 
        active:bg-stone-300
        transition-all
        shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
      "
    >
      <img
        src={plusIcon}
        alt="메뉴 추가"
        className="
          w-6 h-6
          stroke-[#33E389]
        "
      />
    </button>
  );
}
