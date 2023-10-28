import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
interface Res<T> {
    data: T
}

const checkData = (data: any) => {
    // 检查数据
    if (data) {
        return { data, code: 1, msg: 'success' }
    } else {
        return { data, code: 0, msg: '数据为空' }
    }
}
@Injectable()
export class AssembleInterceptor<T> implements NestInterceptor<T, Res<T>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<Res<T>> {
        return next.handle().pipe(map(data => checkData(data)))
    }
}
