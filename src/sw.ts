import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

// 서비스 워커 타입 정의
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<any>;
};

// 1. 초기화 및 프리캐싱
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

console.log("서비스 워커 로드 완료: " + new Date().toLocaleTimeString());

// 2. 푸시 이벤트 리스너 (하나로 통합)
self.addEventListener("push", (event) => {
  console.log("[Service Worker] 푸시 이벤트 수신됨!");

  let data = { title: "CooKeep", body: "", url: "/" };

  if (event.data) {
    try {
      // 텍스트와 JSON 로그를 모두 찍어 서버에서 온 데이터 형태 확인
      const rawText = event.data.text();
      console.log("[Service Worker] 수신 데이터(Text):", rawText);
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("[Service Worker] 데이터 파싱 실패:", err);
    }
  }

  const options: NotificationOptions = {
    body: data.body,
    icon: "/appIcon.png",
    badge: "/appIcon.png",
    vibrate: [200, 100, 200],
    data: { url: data.url },
  } as any;

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 3. 알림 클릭 리스너
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return (client as WindowClient).focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});
