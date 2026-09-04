interface InstallGuideDescriptionProps {
  isAndroid: boolean;
}

export default function InstallGuideDescription({
  isAndroid,
}: InstallGuideDescriptionProps) {
  if (isAndroid) {
    return (
      <div className="flex w-full flex-col items-center self-stretch text-center text-[#7D7D7D]">
        <p className="typo-m-strong">설치 없이 바로 시작하고 싶다면?</p>
        <p className="typo-m">Google Chrome 우측 상단 메뉴 [홈 화면에 추가]</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 self-stretch text-center text-[#7D7D7D]">
      <p className="typo-l-strong">
        iOS 사용자는 Safari에서 열어주세요
        <br />
        Safari 공유 버튼 [홈 화면에 추가]
      </p>
      <p className="typo-l">
        iOS용 앱은 열심히 준비 중이에요!
        <br />
        조금만 기다려 주세요...
      </p>
    </div>
  );
}
