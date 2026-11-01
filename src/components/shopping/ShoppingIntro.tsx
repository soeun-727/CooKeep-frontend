import partnerCharacter from "@/assets/shopping/partner-character.svg";

export default function ShoppingIntro() {
  return (
    <aside className="bg-background text-gray-80 relative flex min-h-[68px] items-center p-4">
      <p className="typo-caption">
        해당 페이지는 쿠팡 파트너스 활동의 일환으로,
        <br />
        이에 따른 일정액의 수수료를 제공받습니다
      </p>
      <img
        src={partnerCharacter}
        alt=""
        className="pointer-events-none absolute right-0 bottom-0 h-[74px] w-[144px]"
      />
    </aside>
  );
}
