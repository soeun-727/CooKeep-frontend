export function parseNoticeLines(content: string) {
  return content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}

export function removeBullet(line: string) {
  return line.replace(/^-+\s*/, "");
}
