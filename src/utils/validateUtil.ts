export const validatePassword = (password: string) =>
  password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
