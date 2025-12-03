import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppDataSource } from "../ormconfig";
import { AuditInterceptor } from "./audit/audit.interceptor";

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new AuditInterceptor());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
