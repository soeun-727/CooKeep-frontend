import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
// sw.ts 최상단
console.log("서비스 워커 로드됨: " + new Date().toLocaleTimeString());

self.addEventListener("push", (event) => {
  // 여기에 중단점을 걸거나 무조건 alert 대신 로그를 찍어야 합니다.
  console.log("푸시 수신 성공!!", event.data?.text());
});
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<any>;
};

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const options = {
    body: data.body ?? "",
    icon: "/appIcon.png",
    badge: "/appIcon.png",
    vibrate: [200, 100, 200],
    data: { url: data.url ?? "/" },
  };

  event.waitUntil(
    self.registration.showNotification(data.title ?? "CooKeep", options),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client)
          return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});
