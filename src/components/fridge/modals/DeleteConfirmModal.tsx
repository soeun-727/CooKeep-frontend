interface DeleteConfirmModalProps {
  ingredientName: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor?: "black" | "green"; // 추가
}

export default function DeleteConfirmModal({
  ingredientName,
  onConfirm,
  onCancel,
  confirmColor = "black",
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black-overlay" onClick={onCancel} />

      {/* Modal */}
      <div className="relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] bg-gray-0 px-[28px] py-[25px]">
        {/* 내용 + 버튼 wrapper */}
        <div className="flex w-full flex-col items-start gap-4">
          {/* 내용 */}
          <div className="flex w-full flex-col items-start gap-2">
            {/* 재료 이름 */}
            <p className="w-full text-center text-[16px] font-bold leading-[24px] text-gray-80">
              {ingredientName}
            </p>

            {/* 메시지 */}
            <p className="w-full text-center text-[14px] font-medium leading-[20px] text-gray-80">
              재료를 삭제하시겠어요?
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex h-[44px] w-full gap-2">
            {/* 네 */}
            <button
              onClick={onConfirm}
              className={`flex-1 h-[44px] rounded-[10px] flex items-center justify-center
    ${confirmColor === "green" ? "bg-green" : "bg-gray-80"}
  `}
            >
              <span className="text-gray-0 text-[14px] font-semibold leading-[24px]">
                네
              </span>
            </button>

            {/* 아니오 */}
            <button
              onClick={onCancel}
              className="flex-1 h-[44px] rounded-[10px] bg-gray-30 flex items-center justify-center"
            >
              <span className="text-gray-0 text-[14px] font-semibold leading-[24px]">
                아니오
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
