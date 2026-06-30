// src/components/myCookeep/record/AddRecordButton.tsx
import { useNavigate } from "react-router-dom";

import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

// import { useState } from "react";
import plusIcon from "@/assets/fridge/items/plus.svg";

export default function AddRecordButton() {
  const navigate = useNavigate();
  //   const [pressed, setPressed] = useState(false);
  const resetRecord = useCookeepRecordStore(s => s.resetRecord);

  return (
    <button
      onClick={() => {
        resetRecord();
        navigate("/mycookeep/record/select");
      }}
      //   onTouchStart={() => setPressed(true)}
      //   onTouchEnd={() => setPressed(false)}
      className="z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)] transition-all active:scale-95 active:bg-stone-300"
    >
      <img
        src={plusIcon}
        alt="메뉴 추가"
        className="h-6 w-6 stroke-[#33E389]"
      />
    </button>
  );
}
