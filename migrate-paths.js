import { replaceInFileSync } from "replace-in-file";

// 🌟 치환 대상 폴더 목록
const folders = [
  "api",
  "assets",
  "components",
  "constants",
  "hooks",
  "layouts",
  "pages",
  "stores",
  "styles",
  "types",
  "utils",
];

folders.forEach((folder) => {
  // 1. 기존의 @folder 패턴을 @/folder로 치환
  const aliasOptions = {
    files: "src/**/*.{ts,tsx,css}",
    from: new RegExp(`from (['"])@${folder}\\b`, "g"),
    to: `from $1@/${folder}`,
  };

  // 2. ../../folder 같은 상대 경로 패턴을 @/folder로 치환 (핵심 추가!)
  const relativeOptions = {
    files: "src/**/*.{ts,tsx,css}",
    from: new RegExp(`from (['"])(?:\\.\\./)+${folder}\\b`, "g"),
    to: `from $1@/${folder}`,
  };

  try {
    // 두 가지 규칙 모두 실행
    replaceInFileSync(aliasOptions);
    const relativeResults = replaceInFileSync(relativeOptions);

    const changedFiles = relativeResults
      .filter((item) => item.hasChanged)
      .map((item) => item.file);
    if (changedFiles.length > 0) {
      console.log(
        `✨ 상대 경로 ➡️ @/${folder} 변환 완료 (${changedFiles.length}개 파일)`,
      );
    }
  } catch (error) {
    console.error(`❌ ${folder} 폴더 처리 중 에러 발생:`, error);
  }
});

console.log(
  "🎉 [완료] @폴더명 및 ../../ 상대 경로가 모두 @/ 구조로 일괄 전환되었습니다!",
);
