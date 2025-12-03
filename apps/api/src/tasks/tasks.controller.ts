import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../rbac/roles.decorator";
import { RolesGuard } from "../rbac/roles.guard";
import { OrgGuard } from "../rbac/org.guard";

@Controller("tasks")
@UseGuards(JwtAuthGuard, RolesGuard, OrgGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Roles("create")
  create(@Body() dto: any, @Req() req: any) {
    return this.tasksService.create(dto, req.user);
  }

  @Get()
  @Roles("list")
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.user);
  }

  @Put(":id")
  @Roles("edit")
  update(@Param("id") id: string, @Body() dto: any, @Req() req: any) {
    return this.tasksService.update(id, dto, req.user);
  }

  @Delete(":id")
  @Roles("delete")
  remove(@Param("id") id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user);
  }
}
