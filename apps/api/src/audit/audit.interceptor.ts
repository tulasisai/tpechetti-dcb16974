import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuditLogger } from "./audit-logger";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user || { id: "anonymous" };
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const duration = Date.now() - startTime;
          AuditLogger.add({
            timestamp: new Date().toISOString(),
            userId: user.id,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration
          });
          console.log("AUDIT:", JSON.stringify({
            time: new Date().toISOString(),
            user: user.id,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: duration + "ms"
          }));
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          AuditLogger.add({
            timestamp: new Date().toISOString(),
            userId: user.id,
            method: req.method,
            url: req.originalUrl,
            statusCode: error.status || 500,
            duration
          });
        }
      })
    );
  }
}
