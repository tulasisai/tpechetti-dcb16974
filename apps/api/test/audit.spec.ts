import { Test } from "@nestjs/testing";
import { AuditController } from "../src/audit/audit.controller";
import { AuditLogger } from "../src/audit/audit-logger";

describe("Audit Endpoint", () => {
  let controller: AuditController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuditController],
    }).compile();
    controller = module.get<AuditController>(AuditController);
    AuditLogger.clear();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("owner can access audit logs", () => {
    AuditLogger.add({
      timestamp: new Date().toISOString(),
      userId: "u1",
      method: "GET",
      url: "/tasks",
      statusCode: 200,
      duration: 45,
    });
    const logs = controller.getAuditLog();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[0].url).toBe("/tasks");
  });

  it("audit logs contain required fields", () => {
    AuditLogger.add({
      timestamp: new Date().toISOString(),
      userId: "u1",
      method: "POST",
      url: "/tasks",
      statusCode: 201,
      duration: 78,
    });
    const logs = controller.getAuditLog();
    expect(logs[0]).toHaveProperty("timestamp");
    expect(logs[0]).toHaveProperty("userId");
    expect(logs[0]).toHaveProperty("method");
    expect(logs[0]).toHaveProperty("url");
    expect(logs[0]).toHaveProperty("statusCode");
    expect(logs[0]).toHaveProperty("duration");
  });

  it("audit logs are stored in memory", () => {
    for (let i = 0; i < 5; i++) {
      AuditLogger.add({
        timestamp: new Date().toISOString(),
        userId: `u${i}`,
        method: "GET",
        url: `/test${i}`,
        statusCode: 200,
        duration: 10 + i,
      });
    }
    const logs = controller.getAuditLog();
    expect(logs.length).toBe(5);
  });
});
