import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { Result } from 'src/liveroom-common-oxr/types/result'
import { instanceToPlain } from 'class-transformer'
interface Res<T> {
    data: T
}

const checkData = (data: Result) => {
    // 检查数据
    if (!data.data || (Array.isArray(data.data) && !data.data.length)) {
        data.code = 0
        data.msg = '数据为空'
    }
    data.data = instanceToPlain(data.data)
    return data
}
@Injectable()
export class AssembleInterceptor<T> implements NestInterceptor<T, Res<T>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<Res<T>> {
        return next.handle().pipe(map(data => checkData(data)))
    }
}
