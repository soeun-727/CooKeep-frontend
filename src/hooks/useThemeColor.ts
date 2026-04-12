import { useEffect } from "react";

export const useThemeColor = (color: string) => {
  useEffect(() => {
    if (!color) return;

    // 1. 기존의 모든 theme-color 태그를 찾아서 제거 (중복 방지)
    const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
    existingMetas.forEach((meta) => meta.remove());

    // 2. 새로운 태그 생성 및 설정
    const newMeta = document.createElement("meta");
    newMeta.name = "theme-color";
    newMeta.content = color;
    document.head.appendChild(newMeta);

    // 3. 디버깅용 (개발자 도구에서 확인 가능)
    // console.log(`Theme color changed to: ${color}`);
  }, [color]);
};
