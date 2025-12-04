import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    console.log("1. Creating NestJS app...");
    const app = await NestFactory.create(AppModule);
    console.log("2. Enabling CORS...");
    app.enableCors();
    console.log("3. Starting to listen on port 3333...");
    
    const server = await app.listen(3333, '127.0.0.1');
    console.log("4. Server object created");
    console.log("5. Backend running on http://127.0.0.1:3333");
    console.log("6. Server address:", server.address());
    
    process.on('uncaughtException', (err) => {
      console.error("UNCAUGHT EXCEPTION:", err);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      console.error("UNHANDLED REJECTION at:", promise, "reason:", reason);
    });
    
  } catch (err) {
    console.error("Bootstrap error:", err);
    process.exit(1);
  }
}

bootstrap();
