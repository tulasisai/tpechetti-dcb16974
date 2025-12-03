import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../rbac/roles.decorator";
import { RolesGuard } from "../rbac/roles.guard";
import { AuditLogger } from "./audit-logger";

@Controller("audit-log")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  @Get()
  @Roles("audit")
  getAuditLog(@Req() req: any) {
    return {
      total: AuditLogger.getAll().length,
      logs: AuditLogger.getAll()
    };
  }
}
