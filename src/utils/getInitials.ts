export const getInitials = (fullName?: string) => {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts[1]?.charAt(0) ?? "";
  return `${first}${last}`.toUpperCase();
};
