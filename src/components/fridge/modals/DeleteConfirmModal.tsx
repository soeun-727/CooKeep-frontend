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
      <div className="bg-black-overlay absolute inset-0" onClick={onCancel} />

      {/* Modal */}
      <div className="bg-gray-0 relative z-10 flex w-[254px] flex-col items-center gap-2 rounded-[10px] px-[28px] py-[25px]">
        {/* 내용 + 버튼 wrapper */}
        <div className="flex w-full flex-col items-start gap-4">
          {/* 내용 */}
          <div className="flex w-full flex-col items-start gap-2">
            {/* 재료 이름 */}
            <p className="text-gray-80 w-full text-center text-[16px] leading-[24px] font-bold">
              {ingredientName}
            </p>

            {/* 메시지 */}
            <p className="text-gray-80 w-full text-center text-[14px] leading-[20px] font-medium">
              재료를 삭제하시겠어요?
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex h-[44px] w-full gap-2">
            {/* 네 */}
            <button
              onClick={onConfirm}
              className={`flex h-[44px] flex-1 items-center justify-center rounded-[10px] ${confirmColor === "green" ? "bg-green" : "bg-gray-80"} `}
            >
              <span className="text-gray-0 text-[14px] leading-[24px] font-semibold">
                네
              </span>
            </button>

            {/* 아니오 */}
            <button
              onClick={onCancel}
              className="bg-gray-30 flex h-[44px] flex-1 items-center justify-center rounded-[10px]"
            >
              <span className="text-gray-0 text-[14px] leading-[24px] font-semibold">
                아니오
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
