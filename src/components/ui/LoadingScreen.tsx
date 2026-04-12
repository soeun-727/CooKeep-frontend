import loadingChar from "../../assets/character/char_loading.svg";

export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-2 w-[143px]">
        {/* 이미지 + 텍스트 */}
        <div className="flex flex-col items-center gap-3 w-full">
          <img
            src={loadingChar}
            alt="loading"
            className="w-[110.375px] h-[91px]"
          />

          <p className="text-[#7D7D7D] text-center text-[12px] leading-[16px] font-medium">
            로딩중... 잠시만 기다려주세요!
          </p>
        </div>

        {/* 점 애니메이션 */}
        {/* <div className="flex items-center gap-[6px] h-[36px]">
          <span className="dot dot1" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </div> */}
      </div>
    </div>
  );
}
