/**
 * PWA/TWA/웹뷰 등 앱(Standalone) 환경인지 판별합니다.
 */
export const checkIsApp = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as unknown as { standalone?: boolean }).standalone) ||
    document.referrer.includes("android-app://")
  );
};

/**
 * Android 기기인지 판별합니다.
 */
export const checkIsAndroid = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
};

/**
 * iOS 기기인지 판별합니다.
 */
export const checkIsIOS = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

/**
 * 모바일(Android 또는 iOS) 환경인지 판별합니다.
 */
export const checkIsMobile = (): boolean => {
  return checkIsAndroid() || checkIsIOS();
};
