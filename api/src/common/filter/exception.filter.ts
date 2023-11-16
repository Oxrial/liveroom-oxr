import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class CommExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        // 进入异常拦截但是状态200，即为空数据或不符参数推送
        res.status(status).send({
            code: status === 200 ? 2 : status,
            path: req.url,
            msg: exception.message
        })
    }
}
