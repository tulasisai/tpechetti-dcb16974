import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../rbac/roles.guard";
import { OrgGuard } from "../rbac/org.guard";

@Module({
  controllers: [TasksController],
  providers: [TasksService, JwtAuthGuard, RolesGuard, OrgGuard],
  exports: [TasksService]
})
export class TasksModule {}
