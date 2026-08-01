// TODO: 마이쿠킵 머지 되면 ui/Appheader 쓸거라 지울 예정
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import cookieIcon from "@/assets/cookeeps/main/cookeeps_cookie.svg";
import settings from "@/assets/cookeeps/main/settings_cookeeps.svg";

import { TOOLTIP_KEY } from "@/constants/cookeeps";

export default function CookeepsHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = useCookeepsStore(s => s.cookie);

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
    <div className="flex h-10 items-center justify-end py-2">
      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        {/* 쿠키 */}
        <button className="bg-gray-80 text-gray-0 flex h-[28px] items-center gap-1 rounded-full px-3 py-[2px] shadow">
          <img src={cookieIcon} alt="cookie" className="h-4 w-4" />
          <span className="text-[12px] leading-4 font-medium">{cookie} </span>
        </button>

        {/* 설정 */}
        <button
          onClick={() =>
            navigate("/settings", {
              state: { from: location.pathname },
            })
          }
          className="bg-gray-80 mr-3 flex h-[28px] w-[28px] items-center justify-center rounded-full"
        >
          <img
            src={settings}
            alt="settings"
            className="h-[16px] w-[16px] brightness-0 invert-[92%]"
          />
        </button>
      </div>
    </div>
  );
}
