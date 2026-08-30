import { useNavigate } from "react-router-dom";

import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

import PlusIcon from "@/assets/fridge/items/plus.svg?react";

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
      className="active:bg-gray-30 shadow-plant z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black active:scale-95"
    >
      <PlusIcon
        aria-label="메뉴 추가"
        role="img"
        className="stroke-green-gradient h-6 w-6"
      />
    </button>
  );
}
