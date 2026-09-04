import appIcon from "../../../assets/onboarding/appIcon.svg";
import appstoreIcon from "../../../assets/onboarding/appstoreIcon.svg";
import mailIcon from "../../../assets/onboarding/mailIcon.svg";
import phoneIcon from "../../../assets/onboarding/phoneIcon.svg";
import settingsIcon from "../../../assets/onboarding/settingsIcon.svg";

const ICONS = [settingsIcon, appstoreIcon, appIcon, mailIcon, phoneIcon];
const INFINITE_ICONS = [...ICONS, ...ICONS];

export default function InstallGuideBanner() {
  return (
    <div className="relative -mx-4 flex w-screen max-w-[450px] items-center justify-center overflow-hidden py-1">
      {/* 화면 좌측 끝 그라데이션 블러 */}
      <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-14 bg-gradient-to-r to-transparent" />

      {/* 글래스모피즘 컨테이너 */}
      <div
        className="w-full overflow-hidden"
        style={{
          borderRadius: "15.556px",
          padding: "11.667px 13.611px",
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.71) 100%), #E9EDF3",
          backdropFilter: "blur(39.1764px)",
          WebkitBackdropFilter: "blur(39.1764px)",
        }}
      >
        <div
          className="animate-roll-left flex"
          style={{ gap: "13.61px" }}
        >
          {INFINITE_ICONS.map((iconSrc, index) => (
            <img
              key={index}
              src={iconSrc}
              alt=""
              aria-hidden="true"
              className="h-19 w-19 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* 화면 우측 끝 그라데이션 블러 */}
      <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-14 bg-gradient-to-l to-transparent" />
    </div>
  );
}
