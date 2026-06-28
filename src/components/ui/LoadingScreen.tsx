import loadingChar from "@/assets/character/char_loading.svg";

export default function LoadingScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAFAFA]">
      <div className="flex w-[143px] flex-col items-center gap-2">
        {/* 이미지 + 텍스트 */}
        <div className="flex w-full flex-col items-center gap-3">
          <img
            src={loadingChar}
            alt="loading"
            className="h-[91px] w-[110.375px]"
          />

          <p className="text-center text-[12px] leading-[16px] font-medium text-[#7D7D7D]">
            로딩중... 잠시만 기다려주세요!
          </p>
        </div>

        {/* 점 애니메이션 */}
        <div className="flex items-end gap-[6px] h-[24px]">
          <span className="wave-dot" />
          <span className="wave-dot" />
          <span className="wave-dot" />
        </div>
      </div>
    </div>
  );
}
