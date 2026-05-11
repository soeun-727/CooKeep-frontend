import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import settings from "../../../assets/cookeeps/main/settings_cookeeps.svg";
import { myLogo, cookieIcon } from "../../../assets";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";

export default function MyCookeepHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = useCookeepsStore((s) => s.cookie);

  const TOOLTIP_KEY = "cookeepsPlantShortcutSeen";

  const [showTooltip, setShowTooltip] = useState(() => {
    return !localStorage.getItem(TOOLTIP_KEY);
  });

  useEffect(() => {
    if (!showTooltip) return;

    const timer = setTimeout(() => {
      setShowTooltip(false);
      localStorage.setItem(TOOLTIP_KEY, "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, [showTooltip]);

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex h-12 items-center justify-between pr-4">
      {/* 왼쪽 */}
      <div className="flex-1 px-[31px]">
        <img
          src={myLogo}
          alt="CooKeep logo"
          className="w-24 object-contain pb-1"
        />
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        {/* 쿠키 */}
        <button className="flex h-[28px] items-center gap-1 rounded-full bg-white px-3 py-[2px] text-black">
          <img src={cookieIcon} alt="cookie" className="h-4 w-4" />
          <span className="text-[12px] font-medium leading-4">{cookie} 개</span>
        </button>

        {/* 설정 */}
        <button
          onClick={() =>
            navigate("/settings", {
              state: { from: location.pathname },
            })
          }
          className="flex h-9 w-9 items-center justify-center"
        >
          <img
            src={settings}
            alt="settings"
            className="h-6 w-6 brightness-0 invert-[100%]"
          />
        </button>
      </div>
    </header>
  );
}
