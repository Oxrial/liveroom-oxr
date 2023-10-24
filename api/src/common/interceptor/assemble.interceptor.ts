import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
interface Res<T> {
    data: T
}

@Injectable()
export class AssembleInterceptor<T> implements NestInterceptor<T, Res<T>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<Res<T>> {
        return next.handle().pipe(map(data => ({ data, code: 0, extra: {}, msg: 'success', success: true })))
    }
}
