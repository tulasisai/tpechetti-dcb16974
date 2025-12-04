import { Module, OnModuleInit } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { OrgsModule } from "./orgs/orgs.module";
import { AuditModule } from "./audit/audit.module";
import { AuditInterceptor } from "./audit/audit.interceptor";
import { AppDataSource } from "../ormconfig";
import { UsersService } from "./users/users.service";
import { AppController } from "./app.controller";

@Module({
  imports: [AuthModule, UsersModule, TasksModule, OrgsModule, AuditModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor
    }
  ]
})
export class AppModule implements OnModuleInit {
  constructor(private usersService: UsersService) {}

  async onModuleInit() {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database initialized");
    }
    await this.usersService.createInitial();
    console.log("Initial users created");
  }
}
