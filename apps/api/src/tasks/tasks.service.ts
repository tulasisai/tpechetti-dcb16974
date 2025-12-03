import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { AppDataSource } from "../../ormconfig";
import { Task } from "./task.entity";
import { PermissionMap } from "../rbac/permission-map";

@Injectable()
export class TasksService {
  private repo = AppDataSource.getRepository(Task);

  async create(dto: any, user: any) {
    const perms = PermissionMap[user.role] || {};
    if (!perms.create) throw new ForbiddenException();
    const task = this.repo.create({ ...dto, ownerId: user.id, orgId: user.orgId });
    return this.repo.save(task);
  }

  async findAll(user: any) {
    const perms = PermissionMap[user.role] || {};
    if (!perms.list) throw new ForbiddenException();
    if (user.role === "Owner") return this.repo.find();
    return this.repo.findBy({ orgId: user.orgId });
  }

  async update(id: string, dto: any, user: any) {
    const t = await this.repo.findOneBy({ id });
    if (!t) throw new NotFoundException();
    const perms = PermissionMap[user.role] || {};
    if (!perms.edit) throw new ForbiddenException();
    if (user.role !== "Owner" && t.orgId !== user.orgId) throw new ForbiddenException();
    Object.assign(t, dto, { updatedAt: new Date() });
    return this.repo.save(t);
  }

  async remove(id: string, user: any) {
    const t = await this.repo.findOneBy({ id });
    if (!t) throw new NotFoundException();
    const perms = PermissionMap[user.role] || {};
    if (!perms.delete) throw new ForbiddenException();
    if (user.role !== "Owner") throw new ForbiddenException();
    await this.repo.delete({ id });
    return { success: true };
  }
}
