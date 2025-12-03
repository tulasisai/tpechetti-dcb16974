export function canUserAccessOrg(userRole: string, userOrgId: string, targetOrgId: string): boolean {
  if (userRole === "Owner") return true;
  return userOrgId === targetOrgId;
}

export function canCreate(role: string): boolean {
  return role === "Owner" || role === "Admin";
}

export function canEdit(role: string): boolean {
  return role === "Owner" || role === "Admin";
}

export function canDelete(role: string): boolean {
  return role === "Owner";
}

export function canViewAudit(role: string): boolean {
  return role === "Owner" || role === "Admin";
}
