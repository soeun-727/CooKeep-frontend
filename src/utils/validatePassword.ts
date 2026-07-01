export const validatePassword = (pw: string) =>
  pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);
