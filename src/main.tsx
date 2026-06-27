import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // HashRouter 제거
import "@styles/index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";
import { Analytics } from "@vercel/analytics/react";

// registerSW({ immediate: true });
const updateSW = registerSW({
  onNeedRefresh() {
    const isMajorUpdate = import.meta.env.VITE_MAJOR_UPDATE === "true";

    if (isMajorUpdate) {
      // 대규모 업데이트: 나중에 커스텀 팝업으로 교체할 부분 (디자인 나오면 여기서 Zustand store에 상태 올리거나 이벤트 발생시키면 됨)
      const ok = window.confirm(
        "[대규모 업데이트] 최신 버전으로 업데이트하시겠습니까?",
      );
      if (ok) updateSW(true);
    } else {
      // 일반 업데이트: 모바일 기기 네이티브 alert
      const ok = window.confirm("최신 버전으로 업데이트하시겠습니까?");
      if (ok) updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("오프라인 준비 완료");
  },
});

// 새 SW가 제어권 잡는 순간 reload — 이게 없으면 확인 눌러도 구버전 유지될 수 있음
let refreshing = false;
navigator.serviceWorker?.addEventListener("controllerchange", () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
);
