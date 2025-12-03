import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (match) {
      const { passwordHash, ...rest } = user as any;
      return rest;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedException();
    const payload = { sub: user.id, role: user.role, orgId: user.orgId, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
