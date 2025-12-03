export const RoleInheritance = {
  Owner: ["Admin", "Viewer"],
  Admin: ["Viewer"],
  Viewer: []
};

export function hasPermission(userRole: string, requiredRole: string): boolean {
  if (userRole === requiredRole) return true;
  const inherited = RoleInheritance[userRole] || [];
  return inherited.includes(requiredRole);
}
