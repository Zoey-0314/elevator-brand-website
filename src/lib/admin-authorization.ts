export function isAdminEmail(email: string | null | undefined, allowlist = process.env.ADMIN_EMAIL_ALLOWLIST ?? "") {
  if (!email) return false;
  const allowed = allowlist.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
