import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { PermissionMap } from "./permission-map";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass()
    ]);
    if (!required) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) return false;
    const perms = PermissionMap[user.role] || {};
    if (required.includes("create") && perms.create) return true;
    if (required.includes("edit") && perms.edit) return true;
    if (required.includes("delete") && perms.delete) return true;
    if (required.includes("list") && perms.list) return true;
    if (required.includes("audit") && perms.audit) return true;
    return false;
  }
}
