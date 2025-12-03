import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { OrgsModule } from "./orgs/orgs.module";

@Module({
  imports: [AuthModule, UsersModule, TasksModule, OrgsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
