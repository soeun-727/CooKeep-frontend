// src/api/push.ts
import api from "./axios"; // 기존에 사용 중인 axios 인스턴스 경로
import { urlBase64ToUint8Array } from "../utils/push";

/**
 * 1. VAPID 공개키 조회 (GET)
 */
export const getVapidPublicKey = async () => {
  const { data } = await api.get("/api/users/me/web/push/public-key");
  return data.data; // 백엔드 응답 형식에 맞춰 조정
};

/**
 * 2. 구독 정보 서버 저장 (POST)
 */
export const saveSubscription = async (subscription: PushSubscription) => {
  return await api.post(
    "/api/users/me/web/push/subscription",
    subscription.toJSON(),
  );
};

/**
 * [통합 로직] 브라우저 권한 요청부터 서버 저장까지 한 번에 실행
 */
export const registerPushNotification = async () => {
  try {
    // 서비스워커 지원 여부 체크
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push notifications are not supported.");
      return false;
    }

    const registration = await navigator.serviceWorker.ready;

    // Step 1: VAPID 키 가져오기
    const publicKey = await getVapidPublicKey();

    // Step 2: 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return false;

    // Step 3: 브라우저 구독 생성
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    // Step 4: 서버에 저장
    await saveSubscription(subscription);

    return true;
  } catch (error) {
    console.error("Failed to register push notification:", error);
    return false;
  }
};

/**
 * 3. 푸시 구독 해제 (DELETE)
 */
export const unsubscribePush = async () => {
  try {
    // 서비스 워커 등록 정보 확인
    const swReg = await navigator.serviceWorker.getRegistration();
    const subscription = await swReg?.pushManager.getSubscription();

    // 만약 브라우저에 구독 정보가 없다면 서버에 요청할 필요 없음
    if (!subscription) return true;

    const subscriptionData = subscription.toJSON();

    // 1. 백엔드 서버에 구독 정보 삭제 요청
    // axios.delete는 두 번째 인자로 data 객체를 넘겨야 바디에 포함됩니다.
    await api.delete("/api/users/me/web/push/subscription", {
      data: {
        endpoint: subscriptionData.endpoint,
        keys: subscriptionData.keys,
      },
    });

    // 2. 브라우저 자체 구독 해제 (성공 시)
    await subscription.unsubscribe();

    console.log("푸시 구독 해제 및 서버 삭제 완료 🔕");
    return true;
  } catch (error) {
    console.error("푸시 구독 해제 중 오류 발생:", error);
    return false;
  }
};
