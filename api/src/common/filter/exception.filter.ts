import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class CommExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req = ctx.getResponse<Request>()
        const res = ctx.getResponse<Response>()
        console.log(exception)
        const status = exception.getStatus()
        res.status(status).send({
            code: status,
            path: req.url,
            msg: exception.message
        })
    }
}
