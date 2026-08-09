import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react";
import { registerSW } from "virtual:pwa-register";

// HashRouter 제거
import "@/styles/index.css";

import App from "./App.tsx";

const PWA_UPDATE_STARTED_AT_KEY = "pwa_update_started_at";
const PWA_UPDATE_COOLDOWN_MS = 60_000;
let isUpdatePromptOpen = false;

// registerSW({ immediate: true });
const updateSW = registerSW({
  onNeedRefresh() {
    const updateStartedAt = Number(
      sessionStorage.getItem(PWA_UPDATE_STARTED_AT_KEY) ?? 0,
    );
    const isInUpdateCooldown =
      Date.now() - updateStartedAt < PWA_UPDATE_COOLDOWN_MS;

    // sessionStorage survives a reload, preventing the same update from
    // entering a confirm -> reload loop in this tab.
    if (isUpdatePromptOpen || isInUpdateCooldown) return;

    isUpdatePromptOpen = true;
    const isMajorUpdate = import.meta.env.VITE_MAJOR_UPDATE === "true";

    if (isMajorUpdate) {
      // 대규모 업데이트: 나중에 커스텀 팝업으로 교체할 부분 (디자인 나오면 여기서 Zustand store에 상태 올리거나 이벤트 발생시키면 됨)
      const ok = window.confirm(
        "[대규모 업데이트] 최신 버전으로 업데이트하시겠습니까?",
      );
      if (ok) {
        sessionStorage.setItem(PWA_UPDATE_STARTED_AT_KEY, String(Date.now()));
        void updateSW(true).catch(error => {
          sessionStorage.removeItem(PWA_UPDATE_STARTED_AT_KEY);
          isUpdatePromptOpen = false;
          console.error("서비스 워커 업데이트에 실패했습니다.", error);
        });
      } else {
        isUpdatePromptOpen = false;
      }
    } else {
      // 일반 업데이트: 모바일 기기 네이티브 alert
      const ok = window.confirm("최신 버전으로 업데이트하시겠습니까?");
      if (ok) {
        sessionStorage.setItem(PWA_UPDATE_STARTED_AT_KEY, String(Date.now()));
        void updateSW(true).catch(error => {
          sessionStorage.removeItem(PWA_UPDATE_STARTED_AT_KEY);
          isUpdatePromptOpen = false;
          console.error("서비스 워커 업데이트에 실패했습니다.", error);
        });
      } else {
        isUpdatePromptOpen = false;
      }
    }
  },
  onOfflineReady() {
    console.log("오프라인 준비 완료");
  },
});

// 새 SW가 제어권 잡는 순간 reload — window 객체와 프로덕션 환경 체크로 무한 새로고침 방지
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
);
