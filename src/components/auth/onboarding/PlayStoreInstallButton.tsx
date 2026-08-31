import playstoreButton from "../../../assets/onboarding/playstoreButton.svg";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kr.cookeep.app";

export default function PlayStoreInstallButton() {
  const handlePlayStoreClick = () => {
    window.open(PLAY_STORE_URL, "_blank");
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <button
        type="button"
        onClick={handlePlayStoreClick}
        className="flex h-10 w-30 cursor-pointer items-center justify-center transition-transform active:scale-95"
        style={{
          borderRadius: "6px",
          background: "#FFF",
          boxShadow: "0 4px 16px 0 rgba(17, 17, 17, 0.10)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
        aria-label="Google Play에서 CooKeep 앱 설치하기"
      >
        <img
          src={playstoreButton}
          alt="Google Play"
          className="h-[72px] w-[152px] shrink-0"
        />
      </button>
      <p className="typo-m text-center text-gray-50">
        클릭 시 앱 설치 화면으로 이동해요
      </p>
    </div>
  );
}
