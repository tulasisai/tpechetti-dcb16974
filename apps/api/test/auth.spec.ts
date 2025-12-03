import { AuthService } from "../src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../src/users/users.service";

describe("Auth", () => {
  it("should return access_token on valid login", async () => {
    const usersSvc = new UsersService();
    const jwtSvc = new JwtService({ secret: "test" });
    const authSvc = new AuthService(usersSvc, jwtSvc);
    const result = await authSvc.login("owner@example.com", "ownerpass");
    expect(result.access_token).toBeDefined();
  });
});
