import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user || { id: "anonymous" };
    const info = {
      time: new Date().toISOString(),
      user: user.id,
      method: req.method,
      url: req.originalUrl
    };
    return next.handle().pipe(
      tap(() => {
        console.log("AUDIT:", JSON.stringify(info));
      })
    );
  }
}
