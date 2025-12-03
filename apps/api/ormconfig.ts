import { DataSource } from "typeorm";
import { User } from "./src/users/user.entity";
import { Org } from "./src/orgs/org.entity";
import { Task } from "./src/tasks/task.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Org, Task]
});
