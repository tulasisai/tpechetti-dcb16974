import { Module } from "@nestjs/common";
import { AuditController } from "./audit.controller";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../rbac/roles.guard";

@Module({
  controllers: [AuditController],
  providers: [JwtAuthGuard, RolesGuard],
  exports: []
})
export class AuditModule {}
