import api from "../api/axios";
import { urlBase64ToUint8Array } from "../utils/push";
export const usePush = () => {
  const subscribePush = async () => {
    try {
      // 1. 서비스워커 지원 확인 및 등록
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("이 브라우저는 푸시 알림을 지원하지 않습니다.");
        return;
      }

      const swReg = await navigator.serviceWorker.ready;

      // 2. VAPID 공개키 조회
      const { data } = await api.get("/api/users/me/web/push/public-key");
      const vapidPublicKey = data.data;

      // 3. 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      // 4. 구독 생성
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // 5. 백엔드 저장
      await api.post(
        "/api/users/me/web/push/subscription",
        subscription.toJSON(),
      );

      console.log("푸시 구독 성공!");
    } catch (error) {
      console.error("푸시 구독 실패:", error);
    }
  };

  return { subscribePush };
};
