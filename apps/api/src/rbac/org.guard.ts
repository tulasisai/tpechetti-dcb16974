import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class OrgGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const params = req.params;
    const body = req.body;
    const targetOrg = params.orgId || body.orgId || req.query.orgId;
    if (!targetOrg) return true;
    if (user.role === "Owner") return true;
    return user.orgId === targetOrg;
  }
}
