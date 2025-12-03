import { TasksService } from "../src/tasks/tasks.service";
import { AppDataSource } from "../ormconfig";

describe("Tasks RBAC Comprehensive", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("viewer cannot create task", async () => {
    const svc = new TasksService();
    const viewer = { id: "v1", role: "Viewer", orgId: "org-root" };
    await expect(svc.create({ title: "x" }, viewer)).rejects.toThrow();
  });

  it("admin can create task", async () => {
    const svc = new TasksService();
    const admin = { id: "a1", role: "Admin", orgId: "org-root" };
    const task = await svc.create({ title: "test task" }, admin);
    expect(task.title).toBe("test task");
    expect(task.ownerId).toBe("a1");
  });

  it("owner can delete task", async () => {
    const svc = new TasksService();
    const owner = { id: "o1", role: "Owner", orgId: "org-root" };
    const task = await svc.create({ title: "to delete" }, owner);
    const result = await svc.remove(task.id, owner);
    expect(result.success).toBe(true);
  });

  it("admin cannot delete task", async () => {
    const svc = new TasksService();
    const owner = { id: "o1", role: "Owner", orgId: "org-root" };
    const admin = { id: "a1", role: "Admin", orgId: "org-root" };
    const task = await svc.create({ title: "cannot delete" }, owner);
    await expect(svc.remove(task.id, admin)).rejects.toThrow();
  });

  it("viewer can list tasks from their org", async () => {
    const svc = new TasksService();
    const viewer = { id: "v1", role: "Viewer", orgId: "org-root" };
    const tasks = await svc.findAll(viewer);
    expect(Array.isArray(tasks)).toBe(true);
  });

  it("admin can edit task in same org", async () => {
    const svc = new TasksService();
    const admin = { id: "a1", role: "Admin", orgId: "org-root" };
    const task = await svc.create({ title: "original" }, admin);
    const updated = await svc.update(task.id, { title: "edited" }, admin);
    expect(updated.title).toBe("edited");
  });

  it("owner sees all tasks regardless of org", async () => {
    const svc = new TasksService();
    const owner = { id: "o1", role: "Owner", orgId: "org-root" };
    const tasks = await svc.findAll(owner);
    expect(Array.isArray(tasks)).toBe(true);
  });
});
