export const validatePassword = (password: string) =>
  password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
