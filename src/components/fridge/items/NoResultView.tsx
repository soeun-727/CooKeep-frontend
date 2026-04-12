import character from "../../../assets/character/confused_char.svg";

export default function NoResultView() {
  return (
    <div className="flex flex-col items-center w-full py-20 animate-fadeIn">
      {/* 캐릭터 이미지: 기존 위치값 반영 */}
      <img
        src={character}
        alt="no result character"
        className="w-[90px] mt-[100px] mb-4"
      />

      {/* 안내 텍스트 */}
      <div className="flex flex-col items-center gap-1">
        <span className="typo-caption font-semibold text-[#7A8093]">
          검색 결과가 없어요
        </span>
      </div>
    </div>
  );
}
