// utils/splitAgreementSections.ts
export function splitAgreementSections(markdown: string): string[] {
  return markdown
    .trim()
    .split(/\n(?=##\s)/) // "## "로 시작하는 줄 앞에서 자르기
    .map(section => section.trim())
    .filter(Boolean);
}
