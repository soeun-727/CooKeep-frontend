import character from "@/assets/character/confused_char.svg";

export default function NoResultView() {
  return (
    <div className="animate-fadeIn flex w-full flex-col items-center py-20">
      {/* 캐릭터 이미지: 기존 위치값 반영 */}
      <img
        src={character}
        alt="no result character"
        className="mt-[100px] mb-4 w-[90px]"
      />
      <span className="typo-caption font-semibold text-[#7A8093]">
        검색 결과가 없어요
      </span>
    </div>
  );
}
