export const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain) return email;

  if (local.length <= 4) {
    return `${"*".repeat(local.length)}@${domain}`;
  }

  return `${local.slice(0, local.length - 4)}****@${domain}`;
};
