import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import bookIcon from "@/assets/cookeeps/main/cookeeps_book.svg";
import cookieIcon from "@/assets/cookeeps/main/cookeeps_cookie.svg";
import Logo from "@/assets/cookeeps/main/logo_cookeeps_black.svg";
import settings from "@/assets/cookeeps/main/settings_cookeeps.svg";

import PlantShortcutTooltip from "./PlantShortcutTooltip";

export default function CookeepsHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = useCookeepsStore(s => s.cookie);

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

  // CookeepsHeader.tsx
  const handleMyPlantClick = () => {
    setShowTooltip(false);
    localStorage.setItem(TOOLTIP_KEY, "true");
    navigate("/cookeeps/my-plant");
  };

  return (
    <header className="absolute top-[35px] left-1/2 z-50 flex h-12 w-full max-w-[450px] -translate-x-1/2 items-center">
      {/* 왼쪽 */}
      <div className="flex-1">
        <img
          src={Logo}
          alt="CooKeep logo"
          className="ml-[31px] w-24 object-contain pb-1"
        />
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        {/* 쿠키 */}
        <button className="flex h-[28px] items-center gap-1 rounded-full bg-gray-80 px-3 py-[2px] text-gray-0 shadow">
          <img src={cookieIcon} alt="cookie" className="h-4 w-4" />
          <span className="text-[12px] leading-4 font-medium">{cookie} </span>
        </button>

        {/* 내 식물 + 툴팁 */}
        <div className="relative">
          <button
            onClick={handleMyPlantClick}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-gray-80"
          >
            <img src={bookIcon} alt="my plant" className="h-4 w-4" />
          </button>

          <PlantShortcutTooltip visible={showTooltip} />
        </div>

        {/* 설정 */}
        <button
          onClick={() =>
            navigate("/settings", {
              state: { from: location.pathname },
            })
          }
          className="flex mr-3 h-[28px] w-[28px] items-center justify-center rounded-full bg-gray-80"
        >
          <img
            src={settings}
            alt="settings"
            className="h-[16px] w-[16px] brightness-0 invert-[92%]"
          />
        </button>
      </div>
    </header>
  );
}
