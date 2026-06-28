import character from "../../../assets/character/confused_char.svg";

export default function NoResultView() {
  return (
    <div className="flex flex-col items-center animate-fadeIn">
      <img
        src={character}
        alt="no result character"
        className="w-[90px] mb-4"
      />
      <span className="typo-caption font-semibold text-gray-50">
        검색 결과가 없어요
      </span>
    </div>
  );
}
