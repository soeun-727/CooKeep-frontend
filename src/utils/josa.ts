// utils/josa.ts
/**
 * 마지막 글자의 받침 유무에 따라 "이" 또는 "가" 조사를 반환
 * @param word 대상 단어 (예: "강낭콩", "토마토")
 */
export function getSubjectJosa(word: string): "이" | "가" {
  if (!word) return "가";

  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  // 한글 완성형 범위(가~힣)가 아니면 기본값 "가" 반환
  if (code < 0xac00 || code > 0xd7a3) return "가";

  const hasBatchim = (code - 0xac00) % 28 !== 0;
  return hasBatchim ? "이" : "가";
}
