import { OrgsService } from "../src/orgs/orgs.service";
import { AppDataSource } from "../ormconfig";

describe("Organization Hierarchy", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("can create root organization", async () => {
    const svc = new OrgsService();
    const org = await svc.create({ name: "Root Org" });
    expect(org.name).toBe("Root Org");
    expect(org.parentId).toBeNull();
  });

  it("can create child organization", async () => {
    const svc = new OrgsService();
    const parent = await svc.create({ name: "Parent" });
    const child = await svc.create({ name: "Child", parentId: parent.id });
    expect(child.name).toBe("Child");
    expect(child.parentId).toBe(parent.id);
  });

  it("can list all organizations", async () => {
    const svc = new OrgsService();
    const orgs = await svc.findAll();
    expect(Array.isArray(orgs)).toBe(true);
    expect(orgs.length).toBeGreaterThan(0);
  });

  it("maintains 2-level hierarchy", async () => {
    const svc = new OrgsService();
    const root = await svc.create({ name: "Level 1" });
    const level2 = await svc.create({ name: "Level 2", parentId: root.id });
    expect(level2.parentId).toBe(root.id);
  });
});
