export const PermissionMap = {
  Owner: { create: true, edit: true, delete: true, list: true, audit: true },
  Admin: { create: true, edit: true, delete: false, list: true, audit: true },
  Viewer: { create: false, edit: false, delete: false, list: true, audit: false }
};
