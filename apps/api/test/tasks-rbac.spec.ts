import { TasksService } from "../src/tasks/tasks.service";
import { AppDataSource } from "../ormconfig";
import { Task } from "../src/tasks/task.entity";

describe("Tasks RBAC", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("viewer cannot create task", async () => {
    const svc = new TasksService();
    const viewer = { id: "v1", role: "Viewer", orgId: "org-root" };
    await expect(svc.create({ title: "x" }, viewer)).rejects.toBeDefined();
  });

  it("admin can create task", async () => {
    const svc = new TasksService();
    const admin = { id: "a1", role: "Admin", orgId: "org-root" };
    const task = await svc.create({ title: "test task" }, admin);
    expect(task.title).toBe("test task");
  });

  it("owner can delete task", async () => {
    const svc = new TasksService();
    const owner = { id: "o1", role: "Owner", orgId: "org-root" };
    const task = await svc.create({ title: "to delete" }, owner);
    const result = await svc.remove(task.id, owner);
    expect(result.success).toBe(true);
  });
});
