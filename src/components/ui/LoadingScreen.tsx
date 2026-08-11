import loadingChar from "@/assets/character/loading_char.svg";

export default function LoadingScreen() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <div className="flex w-[143px] flex-col items-center gap-2">
        {/* 이미지 + 텍스트 */}
        <div className="flex w-full flex-col items-center gap-3">
          <img
            src={loadingChar}
            alt="loading"
            className="h-[89px] w-20 opacity-60"
          />

          <p className="text-caption text-center text-gray-50">
            로딩중... 잠시만 기다려주세요!
          </p>
        </div>

        {/* 점 애니메이션 */}
        <div className="flex h-6 items-end gap-[6px]">
          <span className="wave-dot" />
          <span className="wave-dot" />
          <span className="wave-dot" />
        </div>
      </div>
    </div>
  );
}
