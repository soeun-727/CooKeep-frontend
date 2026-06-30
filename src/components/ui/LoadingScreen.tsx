import loadingChar from "@/assets/character/char_loading.svg";

export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2 w-[143px]">
        {/* 이미지 + 텍스트 */}
        <div className="flex w-full flex-col items-center gap-3">
          <img
            src={loadingChar}
            alt="loading"
            className="h-[91px] w-[110.375px]"
          />

          <p className="text-gray-50 text-center text-[12px] leading-[16px] font-medium">
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
