import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../../ormconfig";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private repo = AppDataSource.getRepository(User);

  async createInitial() {
    const count = await this.repo.count();
    if (count === 0) {
      const h1 = await bcrypt.hash("ownerpass", 10);
      const h2 = await bcrypt.hash("adminpass", 10);
      const h3 = await bcrypt.hash("viewerpass", 10);
      await this.repo.save([
        { name: "Owner User", email: "owner@example.com", passwordHash: h1, role: "Owner", orgId: "org-root" },
        { name: "Admin User", email: "admin@example.com", passwordHash: h2, role: "Admin", orgId: "org-root" },
        { name: "Viewer User", email: "viewer@example.com", passwordHash: h3, role: "Viewer", orgId: "org-root" }
      ]);
    }
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findById(id: string) {
    return this.repo.findOneBy({ id });
  }
}
